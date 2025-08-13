// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext";

// Import components
import Profile from "./components/Profile";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SimpleParticles from "./components/ui/simple-particles";
import SimpleCursor from "./components/ui/simple-cursor";
import Dock from "./components/ui/dock";
// import MobileNav from "./components/ui/mobile-nav"; // Replaced with mobile dock
import Milkera from "./components/milkera";

// AnimatedComponent definition
const AnimatedComponent = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
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

  const containerStyle = {
    backgroundColor: isDarkMode ? "#0a0a0a" : "#ffffff",
    minHeight: "100vh",
    width: "100%",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <SimpleParticles />
      <SimpleCursor />
      <Dock />
      {/* MobileNav removed - now using responsive dock */}
      <Routes>
        <Route
          path="/"
          element={
            <div style={containerStyle}>
              <AnimatedComponent>
                <Profile />
              </AnimatedComponent>
              <AnimatedComponent>
                <About />
              </AnimatedComponent>
              <AnimatedComponent>
                <Experience />
              </AnimatedComponent>
              <AnimatedComponent>
                <Projects />
              </AnimatedComponent>
              <AnimatedComponent>
                <Education />
              </AnimatedComponent>
              <AnimatedComponent>
                <Achievements />
              </AnimatedComponent>
              <AnimatedComponent>
                <Contact />
              </AnimatedComponent>
            </div>
          }
        />
        <Route path="/milkera" element={<Milkera />} />
      </Routes>
    </div>
  );
};

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
