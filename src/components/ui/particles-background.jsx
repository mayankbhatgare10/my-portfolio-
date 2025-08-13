import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ParticlesBackground({
  className = "",
  particleCount = 30,
  refresh = false,
}) {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 12,
        direction: Math.random() > 0.5 ? 1 : -1,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    setParticles(generateParticles());
  }, [particleCount, refresh]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Main particle system */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: "blur(0.5px)",
          }}
          initial={{
            opacity: 0,
            scale: 0,
            y: 0,
            x: 0,
          }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0],
            y: [0, particle.direction * 50, particle.direction * 100],
            x: [
              0,
              Math.sin(Date.now() / 1000) * 30,
              Math.cos(Date.now() / 1000) * 20,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Magic UI style geometric elements */}
      <motion.div
        className="absolute w-8 h-8 border border-blue-300/30 rounded-full"
        style={{ top: "15%", left: "8%" }}
        animate={{
          y: [0, -40, 0],
          rotate: [0, 360],
          opacity: [0.2, 0.6, 0.2],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-6 h-6 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-sm"
        style={{ top: "60%", right: "12%" }}
        animate={{
          x: [0, 25, 0],
          y: [0, -35, 0],
          rotate: [0, -180, -360],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-4 h-4 border-2 border-indigo-300/40"
        style={{ top: "35%", right: "20%" }}
        animate={{
          y: [0, -45, 0],
          x: [0, -15, 0],
          rotate: [0, 120, 240, 360],
          opacity: [0.1, 0.5, 0.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-3 h-3 bg-cyan-300/30 rounded-full"
        style={{ top: "80%", left: "15%" }}
        animate={{
          scale: [0.5, 1.5, 0.5],
          opacity: [0.2, 0.7, 0.2],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Connecting lines effect */}
      <motion.div
        className="absolute w-px h-16 bg-gradient-to-b from-blue-300/20 to-transparent"
        style={{ top: "25%", left: "25%" }}
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-px h-20 bg-gradient-to-b from-purple-300/20 to-transparent"
        style={{ top: "55%", right: "30%" }}
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
