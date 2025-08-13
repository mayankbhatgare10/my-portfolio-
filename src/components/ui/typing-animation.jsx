import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDarkMode } from "../../contexts/DarkModeContext";

export default function TypingAnimation({
  text,
  duration = 200,
  className = "",
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [i, setI] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const { isDarkMode } = useDarkMode();

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);
      setI(0);
      setDisplayedText("");
    }
  }, [inView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text, hasStarted]);

  return (
    <motion.h1
      ref={ref}
      className={className}
      style={{
        fontWeight: "bold",
        letterSpacing: "-0.02em",
        color: isDarkMode ? "#ffffff" : "inherit", // Force white in dark mode
        transition: "color 0.4s ease",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      {hasStarted && displayedText.length > 0 && (
        <motion.span
          style={{
            display: "inline-block",
            color: isDarkMode ? "#ffffff" : "inherit", // Force white cursor in dark mode
            transition: "color 0.4s ease",
          }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          |
        </motion.span>
      )}
    </motion.h1>
  );
}
