import { useEffect, useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

export default function SimpleParticles() {
  const [particles, setParticles] = useState([]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      // Responsive particle count based on screen size
      const particleCount =
        windowWidth <= 480 ? 25 : windowWidth <= 768 ? 35 : 50;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: isDarkMode
            ? windowWidth <= 480
              ? Math.random() * 3 + 2 // Elegant small particles
              : Math.random() * 4 + 3 // Elegant small particles
            : windowWidth <= 480
            ? Math.random() * 4 + 1
            : Math.random() * 6 + 1,
          duration: Math.random() * 15 + 8,
          opacity: isDarkMode
            ? Math.random() * 0.4 + 0.6
            : Math.random() * 0.6 + 0.1, // Elegant opacity for dark mode
          color: isDarkMode
            ? "#ffffff" // SOLID WHITE particles for dark mode
            : `rgba(${
                Math.random() > 0.5
                  ? "59, 130, 246"
                  : Math.random() > 0.5
                  ? "147, 51, 234"
                  : "34, 197, 94"
              }, ${Math.random() * 0.5 + 0.2})`,
        });
      }
      setParticles(newParticles);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    generateParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, isDarkMode]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1, // Above background but below content
        overflow: "hidden",
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: "50%",
            boxShadow: isDarkMode ? "0 0 8px rgba(255, 255, 255, 0.3)" : "none", // Subtle glow
            animation: isDarkMode
              ? `floatBright ${particle.duration}s ease-in-out infinite`
              : `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: particle.opacity, // Use particle opacity directly
          }}
        />
      ))}

      {/* Add floating animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) translateX(0px) rotate(0deg);
              opacity: 0.3;
            }
            25% {
              transform: translateY(-15px) translateX(8px) rotate(90deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-30px) translateX(15px) rotate(180deg);
              opacity: 0.9;
            }
            75% {
              transform: translateY(-10px) translateX(5px) rotate(270deg);
              opacity: 0.7;
            }
          }
          
          @keyframes floatBright {
            0%, 100% {
              transform: translateY(0px) translateX(0px) rotate(0deg);
              opacity: 0.7;
            }
            25% {
              transform: translateY(-15px) translateX(8px) rotate(90deg);
              opacity: 0.9;
            }
            50% {
              transform: translateY(-30px) translateX(15px) rotate(180deg);
              opacity: 1.0;
            }
            75% {
              transform: translateY(-10px) translateX(5px) rotate(270deg);
              opacity: 0.8;
            }
          }

          @keyframes floatReverse {
            0%, 100% {
              transform: translateY(0px) translateX(0px) rotate(360deg);
              opacity: 0.2;
            }
            33% {
              transform: translateY(20px) translateX(-10px) rotate(240deg);
              opacity: 0.8;
            }
            66% {
              transform: translateY(-15px) translateX(-20px) rotate(120deg);
              opacity: 0.5;
            }
          }
        `}
      </style>

      {/* Tons of geometric shapes */}
      {/* Circles */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "8%",
          width: "24px",
          height: "24px",
          border: "2px solid rgba(59, 130, 246, 0.4)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "25%",
          right: "12%",
          width: "18px",
          height: "18px",
          border: "2px solid rgba(147, 51, 234, 0.5)",
          borderRadius: "50%",
          animation: "float 12s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "5%",
          width: "16px",
          height: "16px",
          border: "2px solid rgba(34, 197, 94, 0.4)",
          borderRadius: "50%",
          animation: "float 10s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "65%",
          right: "8%",
          width: "22px",
          height: "22px",
          border: "2px solid rgba(249, 115, 22, 0.4)",
          borderRadius: "50%",
          animation: "float 14s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "85%",
          left: "15%",
          width: "20px",
          height: "20px",
          border: "2px solid rgba(236, 72, 153, 0.4)",
          borderRadius: "50%",
          animation: "float 9s ease-in-out infinite reverse",
        }}
      />

      {/* Squares */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "25%",
          width: "16px",
          height: "16px",
          backgroundColor: "rgba(59, 130, 246, 0.3)",
          transform: "rotate(45deg)",
          animation: "float 11s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "55%",
          right: "25%",
          width: "14px",
          height: "14px",
          backgroundColor: "rgba(147, 51, 234, 0.3)",
          transform: "rotate(45deg)",
          animation: "float 13s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "75%",
          left: "30%",
          width: "18px",
          height: "18px",
          backgroundColor: "rgba(34, 197, 94, 0.3)",
          transform: "rotate(45deg)",
          animation: "float 15s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "30%",
          width: "12px",
          height: "12px",
          backgroundColor: "rgba(249, 115, 22, 0.3)",
          transform: "rotate(45deg)",
          animation: "float 7s ease-in-out infinite",
        }}
      />

      {/* Rectangles */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          width: "8px",
          height: "24px",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          animation: "float 16s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "70%",
          right: "40%",
          width: "6px",
          height: "20px",
          backgroundColor: "rgba(147, 51, 234, 0.2)",
          animation: "float 18s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          width: "24px",
          height: "6px",
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          animation: "float 12s ease-in-out infinite",
        }}
      />

      {/* Triangles (using border trick) */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "70%",
          width: "0",
          height: "0",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "14px solid rgba(59, 130, 246, 0.3)",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "65%",
          width: "0",
          height: "0",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderBottom: "12px solid rgba(147, 51, 234, 0.3)",
          animation: "float 22s ease-in-out infinite reverse",
        }}
      />

      {/* Hollow squares */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "80%",
          width: "20px",
          height: "20px",
          border: "2px solid rgba(34, 197, 94, 0.4)",
          animation: "float 14s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "75%",
          width: "16px",
          height: "16px",
          border: "2px solid rgba(249, 115, 22, 0.4)",
          animation: "float 17s ease-in-out infinite reverse",
        }}
      />

      {/* Plus signs */}
      <div
        style={{
          position: "absolute",
          top: "80%",
          right: "20%",
          width: "16px",
          height: "2px",
          backgroundColor: "rgba(59, 130, 246, 0.4)",
          animation: "float 19s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-7px",
            left: "7px",
            width: "2px",
            height: "16px",
            backgroundColor: "rgba(59, 130, 246, 0.4)",
          }}
        />
      </div>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "5%",
          width: "4px",
          height: "4px",
          backgroundColor: "rgba(147, 51, 234, 0.6)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "42%",
          right: "3%",
          width: "3px",
          height: "3px",
          backgroundColor: "rgba(34, 197, 94, 0.6)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "90%",
          left: "3%",
          width: "5px",
          height: "5px",
          backgroundColor: "rgba(249, 115, 22, 0.6)",
          borderRadius: "50%",
          animation: "float 10s ease-in-out infinite",
        }}
      />

      {/* Lines */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "45%",
          width: "30px",
          height: "1px",
          backgroundColor: "rgba(59, 130, 246, 0.3)",
          animation: "float 25s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "82%",
          right: "45%",
          width: "25px",
          height: "1px",
          backgroundColor: "rgba(147, 51, 234, 0.3)",
          animation: "float 28s ease-in-out infinite reverse",
        }}
      />

      {/* Additional complex shapes */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          right: "60%",
          width: "12px",
          height: "12px",
          border: "2px solid rgba(236, 72, 153, 0.4)",
          borderRadius: "50% 0",
          animation: "float 21s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "67%",
          left: "55%",
          width: "14px",
          height: "14px",
          backgroundColor: "rgba(156, 163, 175, 0.3)",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          animation: "float 23s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
