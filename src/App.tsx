// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* -------------------------
   Loader: Lottie Yeti animation
   Uses the uploaded JSON at: /mnt/data/Loading Yeti.json
   Make sure <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
   is added to index.html so <lottie-player> web component works.
   File source citation: :contentReference[oaicite:1]{index=1}
   ------------------------- */
function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-50"
    >
      <div className="flex flex-col items-center justify-center">
        <lottie-player
          src="/Loading Yeti.json"
          background="transparent"
          speed="1"
          loop
          autoplay
          style={{ width: 300, height: 300 }}
        />

        <motion.div
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="mt-4 text-gray-700 font-medium"
        >
          Loading...
        </motion.div>
      </div>
    </motion.div>
  );
}


function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* HomePage: your full single-page layout */
function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Education />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
}

/* ContactPage: dedicated contact route (useful for direct links) */
function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white transition-colors duration-200">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ScrollToTopButton />
        {loading && <Loader />}
      </div>
    </BrowserRouter>
  );
}

export default App;
