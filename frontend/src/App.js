import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import TechStack from "./pages/TechStack";
import Methodology from "./pages/Methodology";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="App bg-ap-surface min-h-screen">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
