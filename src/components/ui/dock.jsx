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

export default function Dock() {
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
    const handleScroll = () => {
      const sections = [
        "profile",
        "about",
        "projects",
        "experience",
        "education",
        "achievements",
        "contact",
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = "profile";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // Only update if we're not in a clicked section or if we've scrolled to the clicked section
      if (!lastClickedSection || currentSection === lastClickedSection) {
        setActiveSection(currentSection);
        if (lastClickedSection && currentSection === lastClickedSection) {
          setLastClickedSection(null); // Reset once we've reached the clicked section
        }
      }
    };

    // Add scroll listener with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, [lastClickedSection]);

  // Show dock on all screen sizes now
  // Removed the mobile restriction

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
      id: "projects",
      href: "#projects",
      section: "projects",
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
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "skills",
      href: "#experience",
      section: "experience",
      tooltip: "Skills",
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
          <circle cx="12" cy="12" r="3" />
          <path d="m12 1 0 6m0 6 0 6m11-7-6 0m-6 0-6 0" />
        </svg>
      ),
    },
    {
      id: "education",
      href: "#education",
      section: "education",
      tooltip: "Education",
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
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      id: "achievements",
      href: "#achievements",
      section: "achievements",
      tooltip: "Achievements",
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
      id: "contact",
      href: "#contact",
      section: "contact",
      tooltip: "Contact",
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
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  const handleNavigation = (href, section) => {
    // Set the clicked section as active and remember it
    setActiveSection(section);
    setLastClickedSection(section);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Determine if we should use mobile layout (vertical dock in top-right)
  const isMobileLayout = windowWidth <= 768;

  return (
    <motion.div
      className="dock-container"
      initial={isMobileLayout ? { x: 100, opacity: 0 } : { y: 100, opacity: 0 }}
      animate={isMobileLayout ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        position: "fixed",
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
        backgroundColor: isDarkMode
          ? "rgba(30, 30, 30, 0.9)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(16px)",
        borderRadius: isMobileLayout ? "20px" : "24px",
        border: isDarkMode
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        WebkitBackdropFilter: "blur(16px)", // Safari support
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
                ? isDarkMode
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(0, 0, 0, 0.9)"
                : isDarkMode
                ? "rgba(255, 255, 255, 0.6)"
                : "rgba(0, 0, 0, 0.6)",
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
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.2)",
                margin: "4px 0",
              }
            : {
                width: "1px",
                height: "24px",
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.2)",
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
          color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
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
