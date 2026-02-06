import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../../contexts/DarkModeContext";

const DockIcon = ({
  children,
  size = 36,
  isActive = false,
  windowWidth = 1024,
  isVertical = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useDarkMode();

  return (
    <motion.div
      className="dock-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.1,
        ...(isVertical ? { x: -4 } : { y: -4 }),
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isActive
          ? isDarkMode
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.08)"
          : "transparent",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
      }}
      {...props}
    >
      {children}
      {isHovered && (
        <motion.div
          className="dock-tooltip"
          initial={{
            opacity: 0,
            ...(isVertical ? { x: 10 } : { y: 10 }),
          }}
          animate={{
            opacity: 1,
            ...(isVertical ? { x: -15 } : { y: -15 }),
          }}
          exit={{
            opacity: 0,
            ...(isVertical ? { x: 10 } : { y: 10 }),
          }}
          style={{
            position: "absolute",
            ...(isVertical
              ? {
                right: "calc(100% + 10px)",
                top: "50%",
                transform: "translateY(-50%)",
              }
              : { top: -40, left: "50%", transform: "translateX(-50%)" }),
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "6px 10px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {props.tooltip}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function Dock({ hidden }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [activeSection, setActiveSection] = useState("profile");
  const [lastClickedSection, setLastClickedSection] = useState(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sections = [
      "profile",
      "about",
      "achievements",
      "products",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -40% 0px', // Less aggressive margins
      threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) // 0, 0.05, 0.10, ... 1.0
    };

    const sectionVisibility = new Map();

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        sectionVisibility.set(entry.target.id, entry.intersectionRatio);
        console.log(`📊 Section ${entry.target.id}: visibility = ${(entry.intersectionRatio * 100).toFixed(1)}%`);
      });

      // Find the section with the highest visibility ratio
      let maxVisibility = 0;
      let mostVisibleSection = "profile";

      console.log("=== Current Visibility Map ===");
      sectionVisibility.forEach((visibility, sectionId) => {
        console.log(`  ${sectionId}: ${(visibility * 100).toFixed(1)}%`);
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = sectionId;
        }
      });

      console.log(`✓ Most visible: ${mostVisibleSection} (${(maxVisibility * 100).toFixed(1)}%)`);

      // Only update if we're not waiting for a clicked section to settle
      if (!lastClickedSection || mostVisibleSection === lastClickedSection) {
        console.log(`→ Setting active section to: ${mostVisibleSection}`);
        setActiveSection(mostVisibleSection);
        if (lastClickedSection && mostVisibleSection === lastClickedSection) {
          setLastClickedSection(null);
        }
      } else {
        console.log(`⏸ Waiting for clicked section: ${lastClickedSection}`);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    console.log("🔍 Intersection Observer created with options:", observerOptions);

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        sectionVisibility.set(sectionId, 0);
        console.log(`✓ Observing section: ${sectionId}`);
      } else {
        console.warn(`✗ Section not found: ${sectionId}`);
      }
    });

    console.log("📋 Total sections being observed:", sectionVisibility.size);

    return () => {
      observer.disconnect();
    };
  }, [lastClickedSection]);

  const dockItems = [
    {
      id: "home",
      href: "#profile",
      section: "profile",
      tooltip: "Home",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      ),
    },
    {
      id: "about",
      href: "#about",
      section: "about",
      tooltip: "About",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: "achievements",
      href: "#achievements",
      section: "achievements",
      tooltip: "Awards",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
      href: "#products",
      section: "products",
      tooltip: "Projects",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  const handleNavigation = (href, section) => {
    setActiveSection(section);
    setLastClickedSection(section);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isMobileLayout = windowWidth <= 768;

  return (
    <motion.div
      className="dock-container"
      initial={isMobileLayout ? { x: 100, opacity: 0 } : { y: 100, opacity: 0 }}
      animate={
        hidden
          ? isMobileLayout
            ? { x: 150, opacity: 0 }
            : { y: 150, opacity: 0 }
          : isMobileLayout
            ? { x: 0, opacity: 1 }
            : { y: 0, opacity: 1 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        position: "fixed",
        pointerEvents: hidden ? "none" : "auto",
        ...(isMobileLayout
          ? {
            // Mobile: Top-right vertical layout
            top: "20px",
            right: "20px",
            flexDirection: "column",
            width: "fit-content",
            height: "fit-content",
          }
          : {
            // Desktop: Bottom center horizontal layout
            bottom: "24px",
            left: "0",
            right: "0",
            width: "fit-content",
            margin: "0 auto",
            flexDirection: "row",
          }),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobileLayout
          ? windowWidth <= 480
            ? "8px"
            : "10px"
          : windowWidth <= 480
            ? "12px"
            : "16px",
        padding: isMobileLayout
          ? windowWidth <= 480
            ? "12px 8px"
            : "16px 12px"
          : windowWidth <= 480
            ? "16px 24px"
            : "22px 36px",
        backgroundColor: "#2d2d2d",
        backdropFilter: "blur(16px)",
        borderRadius: isMobileLayout ? "20px" : "24px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        zIndex: 1000,
        WebkitBackdropFilter: "blur(16px)",
        whiteSpace: "nowrap",
        maxWidth: isMobileLayout ? "fit-content" : "90vw",
        maxHeight: isMobileLayout ? "80vh" : "fit-content",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {dockItems.map((item, index) => (
        <DockIcon
          key={item.id}
          tooltip={item.tooltip}
          isActive={activeSection === item.section}
          size={
            isMobileLayout
              ? windowWidth <= 480
                ? 28
                : 32
              : windowWidth <= 480
                ? 32
                : 36
          }
          windowWidth={windowWidth}
          isVertical={isMobileLayout}
          onClick={() => handleNavigation(item.href, item.section)}
          style={{
            color:
              activeSection === item.section
                ? "rgba(255, 255, 255, 1)"
                : "rgba(255, 255, 255, 0.6)",
          }}
        >
          {item.icon}
        </DockIcon>
      ))}

      {/* Dark Mode Toggle */}
      <div
        style={{
          ...(isMobileLayout
            ? {
              width: "24px",
              height: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              margin: "4px 0",
            }
            : {
              width: "1px",
              height: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              margin: "0 4px",
            }),
        }}
      />
      <DockIcon
        tooltip={isDarkMode ? "Light Mode" : "Dark Mode"}
        size={
          isMobileLayout
            ? windowWidth <= 480
              ? 28
              : 32
            : windowWidth <= 480
              ? 32
              : 36
        }
        windowWidth={windowWidth}
        isVertical={isMobileLayout}
        onClick={toggleDarkMode}
        style={{
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        {isDarkMode ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </DockIcon>
    </motion.div>
  );
}
