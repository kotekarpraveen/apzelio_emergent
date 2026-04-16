from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# System message for the AI chatbot
SYSTEM_MESSAGE = """You are ApZelio's AI assistant — a knowledgeable, professional, and friendly representative of ApZelio, a US-based digital consulting firm specializing in AI-driven software development, cloud-native architecture, and enterprise-grade solutions.

About ApZelio:
- US-Based Digital Excellence — 100% US-based engineering squads
- Core Services: AI Integration & LLM Ops, Cloud Native Architecture, Custom SaaS Development, Security Audits
- Tech Stack: Go (Golang), Python/AI (PyTorch, LangChain), Node.js & React, AWS, Redis, TypeScript, Rust
- Service Tiers: Rapid MVP & Growth (6-week launch), Scale-Up Infrastructure (most popular), Enterprise Digital Excellence
- Support: Maintenance Retainer, Innovation Partnership, Self-Managed Handoff
- Methodology: Discovery & Audit → Iterative Sprints → Hardened QA → Launch & Support
- Key Metrics: 98.5% Client Satisfaction, 99.8% On-Time Deployment, <14ms avg latency, 1,402+ active nodes
- Notable Projects: Project AetherMind (AI platform), Titan Ledger (fintech), Omni-Edge CDN, Neural Infrastructure Layer

Your role:
1. Answer questions about ApZelio's services, technology, methodology, and capabilities
2. Help potential clients understand which service tier fits their needs
3. Collect enquiry information (name, email, project details) when someone expresses interest
4. Be concise, technical when needed, and always professional
5. If asked about pricing, explain that ApZelio offers custom quotes based on project scope and suggest scheduling a consultation
6. Always encourage users to fill out the contact form or schedule a consultation for detailed discussions

Keep responses concise (2-4 sentences for simple queries, more for complex ones). Use a confident, knowledgeable tone."""


# Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ChatRequest(BaseModel):
    message: str
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))

class ChatResponse(BaseModel):
    response: str
    session_id: str

class ContactFormCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = ""
    phone: Optional[str] = ""
    service_interest: Optional[str] = ""
    message: str

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str = ""
    phone: str = ""
    service_interest: str = ""
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)


# Routes
@api_router.get("/")
async def root():
    return {"message": "ApZelio API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**sc) for sc in status_checks]

# Chat endpoint
@api_router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Load chat history from DB for this session
        history = await db.chat_history.find(
            {"session_id": request.session_id}
        ).sort("timestamp", 1).to_list(50)

        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=request.session_id,
            system_message=SYSTEM_MESSAGE
        )
        chat.with_model("openai", "gpt-4o-mini")

        # Replay history into the chat
        for msg in history:
            if msg["role"] == "user":
                user_msg = UserMessage(text=msg["content"])
                # We add to chat's internal history without sending
                chat.messages.append({"role": "user", "content": msg["content"]})
            elif msg["role"] == "assistant":
                chat.messages.append({"role": "assistant", "content": msg["content"]})

        # Send user message
        user_message = UserMessage(text=request.message)
        response = await chat.send_message(user_message)

        # Store user message in DB
        await db.chat_history.insert_one({
            "session_id": request.session_id,
            "role": "user",
            "content": request.message,
            "timestamp": datetime.utcnow()
        })

        # Store assistant response in DB
        await db.chat_history.insert_one({
            "session_id": request.session_id,
            "role": "assistant",
            "content": response,
            "timestamp": datetime.utcnow()
        })

        return ChatResponse(response=response, session_id=request.session_id)

    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        return ChatResponse(
            response="I'm having trouble connecting right now. Please try again in a moment, or feel free to use our contact form to reach our team directly.",
            session_id=request.session_id
        )

# Contact form endpoints
@api_router.post("/contact", response_model=ContactForm)
async def create_contact(input: ContactFormCreate):
    contact_dict = input.dict()
    contact_obj = ContactForm(**contact_dict)
    await db.contacts.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactForm])
async def get_contacts():
    contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
    return [ContactForm(**c) for c in contacts]

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
