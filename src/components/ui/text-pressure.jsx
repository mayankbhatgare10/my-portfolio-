"use client";

import React, { useRef, useEffect } from "react";

export default function TextPressure({ text, className = "" }) {
    const textRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!textRef.current) return;

            const letters = textRef.current.querySelectorAll(".pressure-letter");
            letters.forEach((letter) => {
                const rect = letter.getBoundingClientRect();
                const letterCenterX = rect.left + rect.width / 2;
                const letterCenterY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(e.clientX - letterCenterX, 2) +
                    Math.pow(e.clientY - letterCenterY, 2)
                );

                const maxDistance = 200;
                const normalizedDistance = Math.min(distance / maxDistance, 1);

                // Use scale and font-weight for pressure effect
                const scale = 1 + (1 - normalizedDistance) * 0.15;
                const weight = 400 + (1 - normalizedDistance) * 500;

                letter.style.transform = `scale(${scale})`;
                letter.style.fontWeight = Math.round(weight);
            });
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <h1 ref={textRef} className={className}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className="pressure-letter"
                    style={{
                        display: "inline-block",
                        transition: "transform 0.1s ease, font-weight 0.1s ease",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </h1>
    );
}
