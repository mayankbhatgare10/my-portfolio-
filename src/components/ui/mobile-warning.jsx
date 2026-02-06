import React, { useState, useEffect } from "react";
import "./mobile-warning.css";

const MobileWarning = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            // Show warning for screens smaller than 768px
            setIsVisible(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="mobile-warning-banner">
            <div className="mobile-warning-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Best viewed on desktop • Switch to desktop site for optimal experience</span>
            </div>
        </div>
    );
};

export default MobileWarning;
