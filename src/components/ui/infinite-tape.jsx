import React from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

const InfiniteTape = () => {
  const { isDarkMode } = useDarkMode();

  const keywords = [
    "Product Design",
    "UI/UX Experience",
    "User-Centric",
    "Design Systems",
    "Problem Solving",
    "Interactive Interfaces",
    "Design Thinking",
    "User Research",
    "Prototyping",
    "Visual Hierarchy",
  ];

  // Duplicate list to ensure seamless infinite scroll
  const items = [...keywords, ...keywords, ...keywords];

  return (
    <div style={{
      position: 'sticky',
      top: '0',
      width: '100%',
      height: '120px', // Space for the tilted tape
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible', // Allow tape to extend fully
      zIndex: 100,
      marginTop: '0',
      marginBottom: '4rem', // Space below tape before content
    }}>
      <div className="tape-strip">
        <div className="tape-label">Design Stack:</div>
        <div className="tape-content">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span className="tape-text">{item}</span>
              <span className="tape-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
        {/* Second copy for seamless loop */}
        <div className="tape-content">
          {items.map((item, index) => (
            <React.Fragment key={`copy-${index}`}>
              <span className="tape-text">{item}</span>
              <span className="tape-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .tape-strip {
          background: #000000; /* Solid Black */
          color: #ffffff;
          padding: 1.2rem 0;
          position: absolute;
          width: 100vw; /* Exact viewport width */
          left: 50%;
          transform: translateX(-50%) rotate(-2deg); /* Center then rotate */
          display: flex;
          align-items: center;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        body.dark-mode .tape-strip {
          background: #000000;
          border-color: #333;
        }

        .tape-label {
          position: absolute;
          left: 0;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 2rem 0 3rem; /* Extra padding left because of width/rotation */
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 20;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 10px 0 20px rgba(0, 0, 0, 0.5);
        }

        .tape-content {
          display: flex;
          align-items: center;
          animation: tapeScroll 40s linear infinite;
          padding-left: 200px; /* Offset for the label */
        }

        .tape-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 1rem;
        }

        .tape-separator {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        @keyframes tapeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default InfiniteTape;
