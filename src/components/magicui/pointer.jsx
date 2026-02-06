"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDarkMode } from "../../contexts/DarkModeContext";

export function Pointer({ className, style, children, ...props }) {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isActive, setIsActive] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.innerWidth <= 768) return;

        document.body.style.cursor = "none";

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isActive) setIsActive(true);

            // Check if hovering over clickable elements
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('pill-nav-item') ||
                target.classList.contains('pill-nav-toggle') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(isClickable);
        };

        const handleMouseEnter = () => setIsActive(true);
        const handleMouseLeave = () => setIsActive(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.body.style.cursor = "";
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isActive]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile || !mounted) return null;

    const cursorElement = (
        <div
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 2147483647,
                ...style,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    pointerEvents: "none",
                }}
            >
                {children || (
                    isHovering ? (
                        // Hand cursor for clickable elements
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="28"
                            width="28"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                filter: "drop-shadow(0px 3px 6px rgba(37, 99, 235, 0.5))",
                                color: "#2563eb",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <path d="M13 6a1 1 0 0 0-1 1v8.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L14 15.586V7a1 1 0 0 0-1-1z" />
                            <path d="M9.5 3a1.5 1.5 0 0 0-1.5 1.5V7H6.5A1.5 1.5 0 0 0 5 8.5v3A1.5 1.5 0 0 0 6.5 13H8v6.5A1.5 1.5 0 0 0 9.5 21h5a1.5 1.5 0 0 0 1.5-1.5V13h1.5a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 17.5 7H16V4.5A1.5 1.5 0 0 0 14.5 3h-5z" />
                        </svg>
                    ) : (
                        // Default arrow cursor
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="1"
                            viewBox="0 0 16 16"
                            height="24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                filter: "drop-shadow(0px 3px 6px rgba(37, 99, 235, 0.5))",
                                color: "#2563eb",
                                transform: "translate(-50%, -50%) scaleX(-1)",
                            }}
                        >
                            {/* The sleek Magic UI 'Paper Plane' Shape */}
                            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                        </svg>
                    )
                )}
            </div>
        </div>
    );

    // Render directly to document.body using a portal
    return createPortal(cursorElement, document.body);
}
