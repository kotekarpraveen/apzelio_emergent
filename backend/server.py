from fastapi import FastAPI, APIRouter, HTTPException, Depends, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
from emergentintegrations.llm.chat import LlmChat, UserMessage
import json
import re
import jwt
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Security Configuration
SECRET_KEY = os.environ.get('SECRET_KEY', 'apzelio-super-secret-key-2024')
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Use auto_error=False to allow optional authentication
security = HTTPBearer(auto_error=False)

# Database connection
DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        logger.error(f"❌ DATABASE CONNECTION ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

# LLM Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# --- AUTH UTILS ---
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# --- MODELS ---
class UserRegister(BaseModel):
    username: str
    email: str
    password: str
    role: Optional[str] = 'author'

class UserLogin(BaseModel):
    username: str
    password: str

class BlogCreate(BaseModel):
    title: str
    content: str
    summary: str
    category: str = "Development"
    status: str = "draft"
    image_url: Optional[str] = None

class BlogUpdateStatus(BaseModel):
    status: str

# --- AUTH ROUTES ---
@api_router.post("/auth/register")
async def register(user: UserRegister):
    hashed_pwd = pwd_context.hash(user.password)
    user_id = str(uuid.uuid4())
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO users (id, username, email, password_hash, role) VALUES (%s, %s, %s, %s, %s)",
            (user_id, user.username, user.email, hashed_pwd, user.role)
        )
        conn.commit()
        return {"message": "User created successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Username or Email already exists")
    finally:
        cur.close()
        conn.close()

@api_router.post("/auth/login")
async def login(user: UserLogin):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s", (user.username,))
    db_user = cur.fetchone()
    cur.close()
    conn.close()

    if not db_user or not pwd_context.verify(user.password, db_user['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"id": db_user['id'], "username": db_user['username'], "role": db_user['role']})
    return {"token": token, "username": db_user['username'], "role": db_user['role']}

# --- USER MANAGEMENT ---
@api_router.get("/users")
async def list_users(current_user: dict = Depends(get_current_user)):
    if current_user.get('role') != 'admin':
        raise HTTPException(status_code=403, detail="Admin access required")
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC")
    users = cur.fetchall()
    cur.close()
    conn.close()
    return users

# --- BLOG ROUTES ---
@api_router.post("/blogs/generate")
async def generate_blog(request: dict):
    try:
        chat = LlmChat(api_key=EMERGENT_LLM_KEY, system_message="You are a professional technical writer and architect at ApZelio. Your writing is authoritative, clear, and uses modern Markdown formatting.")
        chat.with_model("openai", "gpt-4o-mini")
        
        prompt = f"""Generate a high-quality, long-form technical blog post about: {request.get('topic')}
        
        The article should include:
        1. An engaging title.
        2. A concise 2-sentence summary.
        3. Comprehensive content with:
           - Multiple H2 and H3 headings.
           - Bulleted or numbered lists for key takeaways.
           - At least one technical code block if applicable.
           - Professional, clean Markdown structure.
        4. A relevant keyword for Unsplash imagery.

        IMPORTANT: Return ONLY a raw JSON object with keys: title, summary, content, image_keyword.
        """
        
        response_text = await chat.send_message(UserMessage(text=prompt))
        clean_json = re.sub(r'```json\n|\n```', '', response_text).strip()
        blog_data = json.loads(clean_json)
        
        kw = blog_data.get('image_keyword', 'technology')
        blog_data['image_url'] = f"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&keywords={kw}"
        
        return blog_data
    except Exception as e:
        logger.error(f"Blog generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/blogs")
async def get_blogs(status: str = "published", credentials: Optional[HTTPAuthorizationCredentials] = Security(security)):
    current_user = None
    if credentials:
        try:
            payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
            current_user = payload
        except: pass

    conn = get_db_connection()
    cur = conn.cursor()
    
    if status == "draft":
        if not current_user:
            raise HTTPException(status_code=401, detail="Authentication required for drafts")
        
        if current_user.get('role') == 'admin':
            cur.execute("SELECT * FROM blogs WHERE status = 'draft' ORDER BY created_at DESC")
        else:
            cur.execute("SELECT * FROM blogs WHERE status = 'draft' AND author_id = %s ORDER BY created_at DESC", (current_user['id'],))
    else:
        # Published is always public
        cur.execute("SELECT * FROM blogs WHERE status = 'published' ORDER BY created_at DESC")
    
    results = cur.fetchall()
    cur.close()
    conn.close()
    return results

@api_router.post("/blogs")
async def create_blog(input: BlogCreate, user: dict = Depends(get_current_user)):
    base_slug = re.sub(r'[^a-z0-9]+', '-', input.title.lower()).strip('-')
    slug = base_slug
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Unique slug check
    cur.execute("SELECT id FROM blogs WHERE slug = %s", (slug,))
    if cur.fetchone():
        slug = f"{base_slug}-{str(uuid.uuid4())[:8]}"
        
    blog_id = str(uuid.uuid4())
    ts = datetime.utcnow().isoformat()
    
    try:
        cur.execute(
            "INSERT INTO blogs (id, title, slug, content, summary, category, author_name, author_id, status, image_url, is_ai_generated, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (blog_id, input.title, slug, input.content, input.summary, input.category, user['username'], user['id'], input.status, input.image_url, True, ts, ts)
        )
        conn.commit()
        return {"message": "Blog created", "id": blog_id, "slug": slug}
    except Exception as e:
        conn.rollback()
        logger.error(f"DATABASE INSERT ERROR: {e}")
        # Return a clearer error to the frontend
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        cur.close()
        conn.close()

@api_router.get("/blogs/{slug}")
async def get_blog_by_slug(slug: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM blogs WHERE slug = %s", (slug,))
    blog = cur.fetchone()
    cur.close()
    conn.close()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@api_router.patch("/blogs/{blog_id}/status")
async def update_blog_status(blog_id: str, body: BlogUpdateStatus, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cur = conn.cursor()
    if current_user['role'] != 'admin':
        cur.execute("SELECT author_id FROM blogs WHERE id = %s", (blog_id,))
        blog = cur.fetchone()
        if not blog or blog['author_id'] != current_user['id']:
            raise HTTPException(status_code=403, detail="Not authorized")
            
    cur.execute("UPDATE blogs SET status = %s WHERE id = %s", (body.status, blog_id))
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Status updated"}

@api_router.post("/contact")
async def create_contact(input: dict):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO contacts (id, name, email, message, status, created_at) VALUES (%s, %s, %s, %s, %s, %s)",
                (str(uuid.uuid4()), input['name'], input['email'], input['message'], 'new', datetime.utcnow().isoformat()))
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Success"}

@api_router.get("/contacts")
async def get_contacts(user: dict = Depends(get_current_user)):
    if user['role'] != 'admin': raise HTTPException(status_code=403)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM contacts ORDER BY created_at DESC")
    res = cur.fetchall(); cur.close(); conn.close()
    return res

@api_router.get("/")
async def root(): return {"message": "ApZelio CMS API is running"}

app.include_router(api_router)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
