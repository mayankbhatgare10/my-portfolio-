import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Confetti = ({ active, trigger }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (active) {
            const newParticles = Array.from({ length: 200 }, (_, i) => {
                const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

                const shapeRand = Math.random();
                let width, height, borderRadius, content, rotationRange;

                if (shapeRand < 0.15) {
                    content = '👍'; width = 28; height = 28; borderRadius = '0'; rotationRange = 360;
                } else if (shapeRand < 0.30) {
                    content = '👏'; width = 28; height = 28; borderRadius = '0'; rotationRange = 360;
                } else if (shapeRand < 0.50) {
                    content = ''; width = 8; height = 30; borderRadius = '4px'; rotationRange = 720;
                } else if (shapeRand < 0.65) {
                    content = ''; width = 12; height = 12; borderRadius = '50%'; rotationRange = 500;
                } else {
                    content = ''; width = 12; height = 20; borderRadius = '2px'; rotationRange = 720;
                }

                return {
                    id: i + Date.now(),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    content,
                    left: 50 + (Math.random() * 30 - 15),
                    width, height, borderRadius,

                    // SLOWER STAGGER: up to 0.4s delay
                    delay: Math.random() * 0.4,

                    // SUPER SLOW DURATION: 8.5s to 11.5s
                    duration: 8.5 + Math.random() * 3,

                    endX: (Math.random() - 0.5) * 140,
                    endY: -(100 + Math.random() * 50),
                    endRotate: rotationRange + Math.random() * 360
                };
            });

            setParticles(newParticles);
            const timer = setTimeout(() => setParticles([]), 12000);
            return () => clearTimeout(timer);
        }
    }, [active, trigger]);

    if (!active || particles.length === 0) return null;

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 999,
                overflow: 'hidden',
            }}
        >
            {particles.map((p) => {
                return (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            bottom: '-50px',
                            left: `${p.left}vw`,
                            width: `${p.width}px`,
                            height: `${p.height}px`,
                            fontSize: '24px',
                            lineHeight: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: p.content ? 'transparent' : p.color,
                            borderRadius: p.borderRadius,

                            '--end-x': `${p.endX}vw`,
                            '--end-y': `${p.endY}vh`,
                            '--end-rotate': `${p.endRotate}deg`,

                            // Easing: Linear near end, gentle start.
                            animation: `shoot ${p.duration}s cubic-bezier(0.1, 0.9, 0.2, 1.0) forwards`,
                            animationDelay: `${p.delay}s`,
                        }}
                    >
                        {p.content}
                    </div>
                );
            })}

            <style>{`
        @keyframes shoot {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--end-x), var(--end-y), 0) rotate(var(--end-rotate));
            opacity: 0;
          }
        }
      `}</style>
        </div>,
        document.body
    );
};

export default Confetti;
