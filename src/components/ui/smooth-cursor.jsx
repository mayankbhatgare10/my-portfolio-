import { useEffect, useState } from "react";

export default function SmoothCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

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
        width: "32px",
        height: "32px",
        backgroundColor: isHovering
          ? "rgba(59, 130, 246, 0.8)"
          : "rgba(59, 130, 246, 0.6)",
        border: "2px solid #3b82f6",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 10000,
        transform: `scale(${isClicking ? 0.8 : isHovering ? 1.2 : 1})`,
        transition: "all 0.1s ease",
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "6px",
          height: "6px",
          backgroundColor: "#3b82f6",
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
        }}
      />
    </div>
  );
}
