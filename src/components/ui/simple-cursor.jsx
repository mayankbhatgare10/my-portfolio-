import { useEffect, useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

export default function SimpleCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.matches(
          'button, a, input, textarea, select, [role="button"], .btn, .icon'
        ) ||
        target.closest(
          'button, a, input, textarea, select, [role="button"], .btn, .icon'
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    // Hide default cursor only on larger screens
    if (window.innerWidth > 320) {
      document.body.style.cursor = "none";
    }

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);

      // Restore default cursor
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x - 16,
        top: position.y - 16,
        width:
          windowWidth <= 480 ? "24px" : windowWidth <= 768 ? "28px" : "32px",
        height:
          windowWidth <= 480 ? "24px" : windowWidth <= 768 ? "28px" : "32px",
        backgroundColor: isDarkMode
          ? isHovering
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(255, 255, 255, 0.7)"
          : isHovering
          ? "rgba(107, 114, 128, 0.9)"
          : "rgba(107, 114, 128, 0.7)",
        border: isDarkMode
          ? windowWidth <= 480
            ? "1.5px solid #ffffff"
            : "2px solid #ffffff"
          : windowWidth <= 480
          ? "1.5px solid #6b7280"
          : "2px solid #6b7280",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 10000,
        transform: `scale(${isClicking ? 0.8 : isHovering ? 1.2 : 1})`,
        transition: "all 0.1s ease",
        boxShadow:
          windowWidth <= 480
            ? "0 0 15px rgba(107, 114, 128, 0.3)"
            : "0 0 20px rgba(107, 114, 128, 0.4)",
        display: windowWidth <= 320 ? "none" : "block", // Hide on very small screens
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: windowWidth <= 480 ? "4px" : "6px",
          height: windowWidth <= 480 ? "4px" : "6px",
          backgroundColor: isDarkMode ? "#ffffff" : "#6b7280",
          borderRadius: "50%",
          boxShadow:
            windowWidth <= 480
              ? "0 0 8px rgba(107, 114, 128, 0.5)"
              : "0 0 10px rgba(107, 114, 128, 0.6)",
        }}
      />
    </div>
  );
}
