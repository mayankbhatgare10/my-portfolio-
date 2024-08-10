import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Milkera from './components/milkera'; // Import the Milkera component
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const AnimatedComponent = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 120, friction: 10 },
  });

  return <animated.div ref={ref} style={props}>{children}</animated.div>;
};

function App() {
  const profileRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <Router>
      <Routes>
        {/* Main page route */}
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <AnimatedComponent>
                <Profile ref={profileRef} />
              </AnimatedComponent>
              <AnimatedComponent>
                <About ref={aboutRef} />
              </AnimatedComponent>
              <AnimatedComponent>
                <Experience ref={experienceRef} />
              </AnimatedComponent>
              <AnimatedComponent>
                <Projects ref={projectsRef} />
              </AnimatedComponent>
              <AnimatedComponent>
                <Contact ref={contactRef} />
              </AnimatedComponent>
              <AnimatedComponent>
                <Footer ref={footerRef} />
              </AnimatedComponent>
            </div>
          }
        />

        {/* Milkera project detail page route */}
        <Route path="/milkera" element={<Milkera />} />
      </Routes>
    </Router>
  );
}

export default App;