# ApZelio CMS & Corporate Platform

ApZelio is a modern, full-stack Web Application that acts as both a corporate landing page (showcasing services, portfolios, and methodologies) and a fully functional AI-powered Content Management System (CMS).

## Architectural Overview & Tech Stack

The application is built using a modern, decoupled client-server architecture:

*   **Frontend**: Built with **React** utilizing **Tailwind CSS** for styling, **Framer Motion** for smooth animations, and **Radix UI** for accessible, unstyled interactive components (modals, dropdowns, tooltips). Client-side routing is handled via React Router.
*   **Backend**: Powered by **FastAPI** (Python), providing a high-performance, asynchronous REST API.
*   **Database**: Uses **PostgreSQL** (via `psycopg2`) to store users, blog posts, and contact inquiries.

## Core Features & Implementation

### 1. AI-Powered Blog Generation & CMS
One of the most prominent features of the platform is the AI-driven blog engine.
*   **Feature**: Authorized users can input a topic, and the system will automatically generate a comprehensive, long-form technical blog post formatted in Markdown, complete with a title, summary, and a contextual image.
*   **Implementation**: 
    *   The frontend sends a topic to the `/api/blogs/generate` endpoint.
    *   The backend uses a specialized LLM integration (`gpt-4o-mini`) configured with a system prompt instructing it to act as a professional technical writer.
    *   The LLM returns a structured JSON object containing the blog content and an `image_keyword`, which is dynamically linked to an Unsplash image.
    *   Blogs are saved into the database with a unique URL `slug`, an author ID, and a `draft` or `published` status.
    *   The frontend uses `react-markdown` to safely render the generated Markdown content.

### 2. Robust Authentication & Role-Based Access Control (RBAC)
*   **Feature**: Secure login and registration system with distinct user roles (e.g., Admin, Author).
*   **Implementation**: 
    *   Passwords are pre-hashed using SHA-256 on the backend to avoid length limits, then securely hashed and salted using **bcrypt**.
    *   Upon successful login, the backend issues a **JSON Web Token (JWT)**.
    *   Protected API routes use FastAPI's dependency injection to intercept requests, validate the JWT signature, and enforce role-based permissions.

### 3. Dedicated Admin Dashboard
*   **Feature**: A private area of the site where administrators can manage content and view leads.
*   **Implementation**: 
    *   The React router checks paths starting with `/admin`.
    *   The layout intelligently hides the public-facing `Navbar`, `Footer`, and `ChatBot` when a user is navigating the admin panel.
    *   The dashboard communicates with authenticated endpoints to pull drafts, publish posts, and review submissions from the Contact form.

### 4. Premium UI/UX & Interactive Presentation
*   **Feature**: A highly polished, responsive, and cinematic frontend experience that details the company's Services, Tech Stack, Methodology, and Portfolio.
*   **Implementation**: 
    *   Uses a **Dark Mode** design language managed by a global `ThemeProvider` context.
    *   Employs **Lucide React** for crisp, scalable icons.
    *   Implements `ScrollToTop` logic to ensure a smooth transition between pages.
    *   A floating `ChatBot` component is injected globally (outside of the admin panel) to capture visitor engagement.
