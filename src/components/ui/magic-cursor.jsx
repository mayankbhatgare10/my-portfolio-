import { useEffect, useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

export default function MagicCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isClicking, setIsClicking] = useState(false);
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        // Check if we're on desktop
        if (window.innerWidth <= 768) {
            return;
        }

        const updateMousePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        document.addEventListener("mousemove", updateMousePosition);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        document.body.style.cursor = "none";

        return () => {
            document.removeEventListener("mousemove", updateMousePosition);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "auto";
        };
    }, []);

    // Don't render on mobile/tablet
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
        return null;
    }

    const scale = isClicking ? 0.9 : 1;

    return (
        <div
            style={{
                position: "fixed",
                left: `${position.x}px`,
                top: `${position.y}px`,
                pointerEvents: "none",
                zIndex: 99999,
                transform: `scale(${scale})`,
                transition: "transform 0.1s ease",
                // Ensure the cursor tip is exactly at the mouse coordinates
                marginLeft: "0px",
                marginTop: "0px",
            }}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    // Stronger shadow to match the reference "floating" look
                    filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3))",
                    overflow: "visible",
                }}
            >
                <defs>
                    <linearGradient id="cursorGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#3b82f6" /> {/* Bright Blue */}
                        <stop offset="100%" stopColor="#8b5cf6" /> {/* Purple/Violet */}
                    </linearGradient>
                </defs>

                {/* White outline for sharp contrast */}
                <path
                    d="M3 1L3 19L7 15L10 22L13 21L10 14L15 14L3 1Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* Main Blue Gradient Arrow */}
                <path
                    d="M3 1L3 19L7 15L10 22L13 21L10 14L15 14L3 1Z"
                    fill="url(#cursorGradient)"
                />
            </svg>
        </div>
    );
}
