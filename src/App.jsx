// App.js
import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

// Import components
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Milkera from './components/milkera';

// Custom cursor component
const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = (e) => {
      cursor.classList.remove('default', 'pointer', 'text', 'resize');
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        cursor.classList.add('pointer');
      } else if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        cursor.classList.add('text');
      } else if (e.target.classList.contains('resize')) {
        cursor.classList.add('resize');
      } else {
        cursor.classList.add('default');
      }
      cursor.classList.add('hovering');
    };

    const handleMouseLeave = () => {
      cursor.className = 'custom-cursor';
    };

    document.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .resize');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef}></div>;
};

// AnimatedComponent definition
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
  return (
    <>
      <CustomCursor />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
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
                  <Contact />
                </AnimatedComponent>
                <AnimatedComponent>
                  <Footer />
                </AnimatedComponent>
              </div>
            }
          />
          <Route path="/milkera" element={<Milkera />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
