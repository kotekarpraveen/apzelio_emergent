import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Services from "./pages/Services";
import TechStack from "./pages/TechStack";
import Methodology from "./pages/Methodology";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
axios.defaults.baseURL = BACKEND_URL;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Component to handle layout logic (hiding navbar/footer on admin pages)
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/login';
  
  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatBot />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen">
        <BrowserRouter>
          <ScrollToTop />
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/tech-stack" element={<TechStack />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
