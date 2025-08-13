import { motion } from "framer-motion";
import { useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

export default function InteractiveHoverButton({
  text = "Click me",
  onClick,
  className = "",
  variant = "primary",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useDarkMode();

  const variants = {
    primary: {
      background: isDarkMode ? "rgb(220, 220, 220)" : "rgb(53, 53, 53)",
      color: isDarkMode ? "#0a0a0a" : "white",
      border: isDarkMode
        ? "rgb(220, 220, 220) 0.1rem solid"
        : "rgb(53, 53, 53) 0.1rem solid",
      hoverBackground: isDarkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
      hoverColor: isDarkMode ? "#0a0a0a" : "white",
    },
    secondary: {
      background: "transparent",
      color: isDarkMode ? "#ffffff" : "rgb(53, 53, 53)",
      border: isDarkMode
        ? "rgb(220, 220, 220) 0.1rem solid"
        : "rgb(53, 53, 53) 0.1rem solid",
      hoverBackground: isDarkMode ? "rgb(220, 220, 220)" : "rgb(53, 53, 53)",
      hoverColor: isDarkMode ? "#0a0a0a" : "white",
    },
  };

  const currentVariant = variants[variant];

  return (
    <motion.button
      className={`btn ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        background: isHovered
          ? currentVariant.hoverBackground
          : currentVariant.background,
        color: isHovered ? currentVariant.hoverColor : currentVariant.color,
        borderColor: isHovered
          ? currentVariant.hoverBackground
          : currentVariant.border,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      style={{
        fontWeight: 600,
        padding: "1rem 2rem",
        minWidth: "140px",
        borderRadius: "2rem",
        cursor: "pointer",
        border: currentVariant.border,
        fontSize: "1rem",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        className="relative z-10"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isHovered
            ? {
                scale: 1,
                opacity: 0.1,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
}
