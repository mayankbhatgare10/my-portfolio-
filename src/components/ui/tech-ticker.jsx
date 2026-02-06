import React from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

const TechTicker = () => {
  const { isDarkMode } = useDarkMode();

  const technologies = [
    { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" }, // Next.js is black/white
    { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "GitHub", src: isDarkMode ? "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" : "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" }, // Using original which is black, might need inversion for dark mode via filter
    { name: "Firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
    { name: "SQL (MySQL)", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" }
  ];

  // Triplicate for smooth loop
  const items = [...technologies, ...technologies, ...technologies];

  return (
    <div className="tech-ticker-container">
      <div className="tech-label">Tech Stack</div>
      <div className="tech-track">
        {items.map((tech, index) => (
          <div key={`${tech.name}-${index}`} className="tech-item">
            <img
              src={tech.src}
              alt={tech.name}
              className="tech-logo"
              style={tech.name === 'Next.js' && isDarkMode ? { filter: 'invert(1)' } : (tech.name === 'GitHub' && isDarkMode ? { filter: 'invert(1)' } : {})}
            />
            <span className="tech-name">{tech.name}</span>
            <span className="dot">•</span>
          </div>
        ))}
      </div>

      <style>{`
        .tech-ticker-container {
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
          background: ${isDarkMode ? '#000000' : '#ffffff'};
          padding: 2.5rem 0;
          position: relative;
          border-top: 1px solid rgba(128, 128, 128, 0.1);
          border-bottom: 1px solid rgba(128, 128, 128, 0.1);
          margin-top: 4rem; /* Separation from content above */
        }

        .tech-label {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          padding: 0 4rem 0 3rem; /* Extended padding-right for gradient fade */
          background: linear-gradient(to right, ${isDarkMode ? '#000000' : '#ffffff'} 70%, transparent);
          z-index: 10;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: ${isDarkMode ? '#fff' : '#000'};
          /* Minimal: No border, no shadow, just seamless fade */
        }

        .tech-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: techScroll 40s linear infinite;
        }

        .tech-track:hover {
          animation-play-state: paused;
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0 2rem;
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .tech-logo {
          width: 32px; /* Proper size for logos */
          height: 32px;
          object-fit: contain;
        }

        .tech-name {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 1.2rem;
          color: ${isDarkMode ? '#e5e5e5' : '#333333'};
          white-space: nowrap;
        }

        .dot {
          color: rgba(128,128,128,0.3);
          margin-left: 2rem;
          font-size: 1rem;
        }

        @keyframes techScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

export default TechTicker;
