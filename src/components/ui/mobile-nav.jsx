import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show only on mobile/tablet screens
  if (windowWidth > 768) {
    return null;
  }

  const navItems = [
    { href: "#profile", label: "Home", icon: "🏠" },
    { href: "#about", label: "About", icon: "👤" },
    { href: "#experience", label: "Skills", icon: "⚡" },
    { href: "#projects", label: "Projects", icon: "💻" },
    { href: "#education", label: "Education", icon: "🎓" },
    { href: "#achievements", label: "Awards", icon: "🏆" },
    { href: "#contact", label: "Contact", icon: "📧" },
  ];

  const handleNavigation = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 998,
            }}
          />
        )}
      </AnimatePresence>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              bottom: "100px",
              right: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              zIndex: 999,
              minWidth: "200px",
            }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavigation(item.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  color: "#333",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  marginBottom: index < navItems.length - 1 ? "4px" : "0",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.05)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <span style={{ fontWeight: "500" }}>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "rgba(59, 130, 246, 0.9)",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? "✕" : "☰"}
        </motion.div>
      </motion.button>
    </>
  );
}
