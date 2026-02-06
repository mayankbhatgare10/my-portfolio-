// App.js
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext";
import "./fix-overflow.css"; // Emergency overflow fix
import "./responsive.css"; // Comprehensive responsive styles

// Import components
import Profile from "./components/Profile";
import About from "./components/About";
import Achievements from "./components/Achievements";
import Products from "./components/Products";
import Footer from "./components/Footer";
import SimpleParticles from "./components/ui/simple-particles";
import { Pointer } from "./components/magicui/pointer";
import PillNav from "./components/ui/pill-nav";
import MobileWarning from "./components/ui/mobile-warning";

// AnimatedComponent definition
const AnimatedComponent = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { tension: 120, friction: 10 },
  });

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  );
};

// Main App wrapper component
const AppContent = () => {
  const { isDarkMode } = useDarkMode();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const containerStyle = {
    backgroundColor: isDarkMode ? "#0a0a0a" : "#ffffff",
    minHeight: "100vh",
    width: "100%",
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <Pointer className="stroke-white text-blue-500" />
      <MobileWarning />
      <div style={containerStyle}>
        <SimpleParticles />
        <PillNav hidden={isFooterVisible} />
        <div style={{ position: "relative", zIndex: 10 }}>
          <Routes>
            <Route
              path="/"
              element={
                <div style={{ ...containerStyle, backgroundColor: 'transparent' }}>
                  <AnimatedComponent>
                    <Profile />
                  </AnimatedComponent>

                  <AnimatedComponent>
                    <About />
                  </AnimatedComponent>
                  <AnimatedComponent>
                    <Achievements />
                  </AnimatedComponent>
                  <AnimatedComponent>
                    <Products />
                  </AnimatedComponent>
                  <div ref={footerRef}>
                    <Footer />
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <AppContent />
      </Router>
    </DarkModeProvider>
  );
}

export default App;
