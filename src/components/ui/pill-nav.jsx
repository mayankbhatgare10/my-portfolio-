import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../../contexts/DarkModeContext";
import "./pill-nav.css";

const PillNav = ({ hidden }) => {
    const [activeSection, setActiveSection] = useState("profile");
    const [lastClickedSection, setLastClickedSection] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );
    const { isDarkMode } = useDarkMode();

    // Window resize handler
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const sections = ["profile", "about", "achievements", "products", "contact"];

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -40% 0px',
            threshold: Array.from({ length: 21 }, (_, i) => i * 0.05)
        };

        const sectionVisibility = new Map();

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                sectionVisibility.set(entry.target.id, entry.intersectionRatio);
            });

            // Find the section with the highest visibility ratio
            let maxVisibility = 0;
            let mostVisibleSection = "profile";

            sectionVisibility.forEach((visibility, sectionId) => {
                if (visibility > maxVisibility) {
                    maxVisibility = visibility;
                    mostVisibleSection = sectionId;
                }
            });

            // Only update if we're not waiting for a clicked section to settle
            if (!lastClickedSection || mostVisibleSection === lastClickedSection) {
                setActiveSection(mostVisibleSection);
                if (lastClickedSection && mostVisibleSection === lastClickedSection) {
                    setLastClickedSection(null);
                }
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
                sectionVisibility.set(sectionId, 0);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [lastClickedSection]);

    const navItems = [
        {
            id: "profile",
            label: "Home",
            href: "#profile",
            icon: (
                <svg width={windowWidth <= 480 ? "16" : "18"} height={windowWidth <= 480 ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
            ),
        },
        {
            id: "about",
            label: "About",
            href: "#about",
            icon: (
                <svg width={windowWidth <= 480 ? "16" : "18"} height={windowWidth <= 480 ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
        },
        {
            id: "achievements",
            label: "Awards",
            href: "#achievements",
            icon: (
                <svg width={windowWidth <= 480 ? "16" : "18"} height={windowWidth <= 480 ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
            ),
        },
        {
            id: "products",
            label: "Projects",
            href: "#products",
            icon: (
                <svg width={windowWidth <= 480 ? "16" : "18"} height={windowWidth <= 480 ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            ),
        },
        {
            id: "contact",
            label: "Contact",
            href: "#contact",
            icon: (
                <svg width={windowWidth <= 480 ? "16" : "18"} height={windowWidth <= 480 ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
        },
    ];

    const handleNavClick = (href, id) => {
        setActiveSection(id);
        setLastClickedSection(id);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const isActive = (itemId) => activeSection === itemId;
    const isHovered = (itemId) => hoveredItem === itemId;

    // Responsive breakpoints
    const isMobileXS = windowWidth <= 360;
    const isMobile = windowWidth <= 480;
    const isTablet = windowWidth > 480 && windowWidth <= 768;
    const isDesktop = windowWidth > 768;

    // On very small mobile, never show labels
    // On mobile, only show label on active item
    // On larger screens, show on active or hovered
    const shouldShowLabel = (itemId) => {
        if (isMobileXS) return false; // No labels on very small screens
        if (isMobile) return isActive(itemId); // Only active on mobile
        return isActive(itemId) || isHovered(itemId); // Active or hovered on larger screens
    };

    // Dynamic sizing based on screen size
    const getNavStyles = () => {
        if (isMobileXS) {
            return {
                bottom: "12px",
                gap: "3px",
                padding: "5px 6px",
                iconSize: "14",
                buttonPadding: "7px",
                fontSize: "0.7rem"
            };
        }
        if (isMobile) {
            return {
                bottom: "16px",
                gap: "4px",
                padding: "6px 8px",
                iconSize: "16",
                buttonPadding: "8px",
                buttonPaddingWithLabel: "8px 12px",
                fontSize: "0.75rem"
            };
        }
        if (isTablet) {
            return {
                bottom: "24px",
                gap: "5px",
                padding: "6px 10px",
                iconSize: "18",
                buttonPadding: "9px",
                buttonPaddingWithLabel: "9px 16px",
                fontSize: "0.85rem"
            };
        }
        return {
            bottom: "32px",
            gap: "6px",
            padding: "8px 12px",
            iconSize: "18",
            buttonPadding: "10px",
            buttonPaddingWithLabel: "10px 18px",
            fontSize: "0.9rem"
        };
    };

    const navStyles = getNavStyles();

    return (
        <AnimatePresence>
            {!hidden && (
                <motion.nav
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="pill-nav-container"
                    style={{
                        position: "fixed",
                        bottom: navStyles.bottom,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: navStyles.gap,
                        padding: navStyles.padding,
                        background: isDarkMode
                            ? "rgba(20, 20, 20, 0.95)"
                            : "rgba(10, 10, 10, 0.95)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        borderRadius: "50px",
                        border: isDarkMode
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "1px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: isDarkMode
                            ? "0 4px 16px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)"
                            : "0 4px 16px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.15)",
                        maxWidth: isMobileXS ? "95vw" : isMobile ? "90vw" : "auto",
                    }}
                >
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            onClick={() => handleNavClick(item.href, item.id)}
                            onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="pill-nav-item"
                            whileHover={{ scale: isMobile ? 1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                position: "relative",
                                padding: shouldShowLabel(item.id)
                                    ? navStyles.buttonPaddingWithLabel || navStyles.buttonPadding
                                    : navStyles.buttonPadding,
                                fontSize: navStyles.fontSize,
                                fontWeight: isActive(item.id) ? "600" : "500",
                                fontFamily: "'Hind Madurai', sans-serif",
                                color:
                                    isActive(item.id)
                                        ? isDarkMode
                                            ? "#000000"
                                            : "#000000"
                                        : isDarkMode
                                            ? "#ffffff"
                                            : "#ffffff",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "50px",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                zIndex: 1,
                                outline: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: isMobile ? "6px" : "8px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                minWidth: isMobileXS ? "32px" : isMobile ? "36px" : "auto",
                            }}
                        >
                            {isActive(item.id) && (
                                <motion.div
                                    className="pill-nav-active-bg"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: isDarkMode
                                            ? "linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)"
                                            : "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
                                        borderRadius: "50px",
                                        zIndex: -1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                />
                            )}

                            {/* Icon */}
                            <motion.span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                {item.icon}
                            </motion.span>

                            {/* Label - Show based on screen size and state */}
                            <AnimatePresence mode="wait">
                                {shouldShowLabel(item.id) && (
                                    <motion.span
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "auto", opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeInOut",
                                            opacity: { duration: 0.15 }
                                        }}
                                        style={{
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    ))}
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default PillNav;
