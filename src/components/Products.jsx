import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Products.css";
import { motion, AnimatePresence } from "framer-motion";

// Assets
import hifiImg from "../assets/Hi-Fi.png";
import wanderWiseImg from "../assets/WanderWise.png";
import jalankUIImg from "../assets/jalank_ui.png";
import allGraphicsImg from "../assets/all graphics.png";

// Toast Component with Portal
const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="minimal-toast"
        >
            <span className="toast-icon">✨</span>
            {message}
        </motion.div>,
        document.body
    );
};

const productsData = [
    {
        id: 1,
        title1: "Hi-Fi",
        title2: "'Paisa Bolta Hai'",
        role: "Product Designer & Frontend Developer",
        description: "AI-native multi-agent financial assistant that automates fraud checks, tax guidance, and debt insights to reduce financial decision stress.",
        readMore: [
            "Multi-agent AI assistant that works like ChatGPT for your bank account",
            "Automates 5+ core financial tasks including fraud detection and debt optimization",
            "Designed trust-first finance UX with clear hierarchy and guided flows",
            "Built full Next.js frontend with reusable components and clean UI states",
            "Collaborated on planner–executor multi-agent architecture",
            "Reduced user decision friction by ~60%",
            "Won Breakthrough Concept Award at Agentic AI Day 2025"
        ],
        techStack: ["Next.js", "React", "TypeScript", "Firebase", "Google ADK", "Vertex AI", "FastAPI"],
        image: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pyPXdR3aBjJDIT8ZSVomP5FflMzXOguRkv960",
        links: { visit: "https://web.hifi.click/", details: "#", github: "#" }
    },
    {
        id: 2,
        title1: "UnTangle",
        title2: "Demystifying Legal Documents",
        role: "Product Designer & Frontend Developer",
        description: "AI platform that simplifies legal documents into summaries, clause explanations, and risk insights through chat.",
        readMore: [
            "AI-driven platform for simplifying complex legal documents",
            "Multi-agent workflow for summarization, risk analysis, and clause classification",
            "Designed end-to-end UX from upload to simplified output",
            "Built responsive Next.js frontend with secure AI pipeline integrations",
            "Created clarity-first interface with structured legal insights",
            "Implemented scalable UI patterns and edge-case handling",
            "Supported web, Chrome, and WhatsApp experiences"
        ],
        techStack: ["Next.js", "TypeScript", "Hono", "Drizzle ORM", "Turso", "Cloudflare Workers", "Google ADK", "Gemini"],
        image: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pXEotMToQBE4cOvZTmdLINpRirWHF6klzfqta",
        links: { visit: "https://www.figma.com/design/fVU8uj5LGg7MyEVgYxILXY/UnTangle?node-id=0-1&t=MJtcBvMdLrxbQ0Jz-1", details: "#", github: "#" }
    },
    {
        id: 3,
        title1: "Pookie",
        title2: "Notes",
        role: "Product Designer & Full-Stack Developer",
        description: "Gen-Z focused Notes 2.0 app where users create, link, and organize notes into collections like watchlists, buckets, and life logs.",
        readMore: [
            "Built a Notes 2.0 system where notes can be linked together like a knowledge web",
            "Enabled users to connect notes into collections, lists, and life logs",
            "Designed full UX system with fast capture, linking, and tagging flows",
            "Developed the complete app solo from design to deployment",
            "Created scalable component architecture in Next.js",
            "Implemented Firebase Auth and structured database for linked notes",
            "Enabled smooth navigation across connected note networks"
        ],
        techStack: ["Next.js", "TypeScript", "Firebase (Auth, Firestore, Storage)"],
        image: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pzPhHhZbmPToaqrJn9DsQNe5IS6iZW1tAXKdF",
        links: { visit: "https://pookie-notes.mayankbhatgare.dev/login", details: "#", github: "#" }
    },
    {
        id: 4,
        title1: "Rookie",
        title2: "House Website",
        role: "Designer & Frontend Developer",
        description: "Interactive coming-soon website featuring a mini Mario-style coder game.",
        readMore: [
            "Designed a gamified coming-soon experience instead of static page",
            "Built mini-game where coder powers up after drinking coffee",
            "Added playful animations and interactive storytelling",
            "Increased engagement through game-like interactions",
            "Created a fun brand-first launch experience"
        ],
        techStack: ["Next.js", "JavaScript", "CSS Animations"],
        image: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pWN5Sa2TsSRqHK3azjNi46tIOPAQldgxZceVC",
        links: { visit: "https://rookie.house/", details: "#", github: "#" }
    },
    {
        id: 5,
        title1: "Dagent",
        title2: "Marketplace",
        role: "UI/UX Designer & Frontend Developer",
        description: "Web3 AI-agent marketplace enabling listing, renting, and monetizing AI agents.",
        readMore: [
            "Built unified AI-agent marketplace with semantic matching",
            "Designed creator and renter journeys end-to-end",
            "Developed responsive Next.js marketplace UI",
            "Enabled agent discovery, pricing, and rental flows",
            "Standardized UI states for scalable marketplace UX",
            "Part of Cardano Hackathon and India Blockchain Week builds",
            "Supported decentralized staking and on-chain rewards"
        ],
        techStack: ["Next.js", "React", "TypeScript", "TanStack Query", "Web3", "RAG", "Hono", "PostgreSQL"],
        image: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pzvLDr3bmPToaqrJn9DsQNe5IS6iZW1tAXKdF",
        links: { visit: "https://dagent.rookie.house/", details: "#", github: "#" }
    },
    {
        id: 6,
        title1: "WanderWise",
        title2: "",
        role: "UX Designer",
        description: "Solo-traveler companion app focused on safety, planning, and emotional support.",
        readMore: [
            "Designed all-in-one toolbox for solo travelers",
            "Conducted user research to identify solo travel pain points",
            "Created journey maps and safety-first experiences",
            "Designed features like SOS, buddy system, and trip dashboard",
            "Collaborated in a 3-member designathon team",
            "Built detailed case study for solo travel support"
        ],
        techStack: ["Figma", "UX Research Methods"],
        image: wanderWiseImg,
        links: { visit: "https://www.figma.com/design/HZReHgHUfRTu7d23fKXzSn/Untitled?node-id=0-1", details: "#", github: "#" }
    },
    {
        id: 7,
        title1: "Jalank",
        title2: "UI",
        role: "UI/UX Designer",
        description: "Real-time water footprint calculator promoting sustainable water usage.",
        readMore: [
            "Built water usage tracking and footprint platform at SIH 2023",
            "Designed minimal-input flows for quick data entry",
            "Created dashboard UI for consumption insights",
            "Developed responsive web UI with smooth navigation",
            "Selected by Jal Shakti Ministry",
            "Awarded National Winner at SIH 2023"
        ],
        techStack: ["HTML", "CSS", "JavaScript", "Firebase", "TensorFlow Lite", "COCO Dataset"],
        image: jalankUIImg,
        links: { visit: "https://www.figma.com/file/0dumo3b7gmQ2y3RxJNYcrP/JalAnk-UI?type=design", details: "#", github: "#" }
    },
    {
        id: 8,
        title1: "Graphics &",
        title2: "Visual Work",
        role: "Visual Designer",
        description: "Collection of logos, posters, and brand identity work.",
        readMore: [
            "Designed logos and visual identities for multiple projects",
            "Created posters and marketing creatives",
            "Built cohesive branding systems",
            "Focused on typography and visual storytelling",
            "Delivered graphics across digital and print formats"
        ],
        techStack: ["Affinity Suite", "Canva", "ChatGPT"],
        image: allGraphicsImg,
        links: { visit: "https://www.canva.com/design/DAGEhrvsbKM/WHeqggomjjTEEhCextk9bw/edit", details: "#", github: "#" }
    }
];

const ProductCard = ({ data, index, onInfoClick, onGithubClick }) => {
    const cardRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const isReverse = index % 2 !== 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold: 0.15 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, []);

    return (
        <div
            className={`product-item ${isReverse ? "reverse" : ""}`}
            ref={cardRef}
        >
            {/* TEXT SIDE */}
            <div className="product-info">
                <h3 className="product-brand">
                    {data.title1} <br />
                    <strong>{data.title2}</strong>
                </h3>

                <div className="product-role-badge">{data.role}</div>

                <p className="product-description">
                    {data.description}
                    <button
                        className="product-read-more-inline"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Collapse" : "... Read More"}
                    </button>
                </p>

                {/* Collapsible Content - Points Only */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="product-collapsible"
                        >
                            <div className="product-details-list">
                                <ul>
                                    {data.readMore && data.readMore.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tech Stack - Always Visible */}
                <div className="product-tech-container">
                    <h4 className="tech-stack-title">Tech Stack</h4>
                    <div className="tech-tags-wrapper">
                        {data.techStack && data.techStack.map((tech, i) => (
                            <span key={i} className="tech-tag-minimal">{tech}</span>
                        ))}
                    </div>
                </div>

                <div className="product-actions">
                    {/* Pill Button for Visit */}
                    <button
                        className="btn-pill"
                        onClick={() => window.open(data.links.visit, "_blank")}
                    >
                        <span>Visit Project</span>
                        <svg
                            className="arrow-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5" /* Thinner Stroke */
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </button>

                    <button
                        className="btn-icon-circle"
                        onClick={onInfoClick}
                        title="View Details"
                    >
                        {/* Minimal Info Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                    </button>

                    <button
                        className="btn-icon-circle"
                        onClick={onGithubClick}
                        title="Github"
                    >
                        {/* Minimal Github Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* IMAGE SIDE */}
            <div className="product-visual">
                <img src={data.image} alt={`${data.title1} ${data.title2}`} className="product-img" />
            </div>
        </div>
    );
};

const Products = () => {
    const [displayCount, setDisplayCount] = useState(3);
    const [toast, setToast] = useState({ show: false, message: "", id: 0 });

    const handleLoadMore = () => {
        setDisplayCount((prev) => Math.min(prev + 3, productsData.length));
    };

    const showToast = (message) => {
        setToast({ show: true, message, id: Date.now() });
    };

    const handleToastClose = () => {
        setToast((prev) => ({ ...prev, show: false }));
    };

    const hasMore = displayCount < productsData.length;

    return (
        <section className="products-section" id="products">
            <div className="section-header">
                <p className="section-subtitle">Selected</p>
                <h2 className="section-title">Projects</h2>
            </div>

            <div className="products-list">
                {productsData.slice(0, displayCount).map((product, index) => (
                    <ProductCard
                        key={product.id}
                        data={product}
                        index={index}
                        onInfoClick={(e) => {
                            e.stopPropagation();
                            showToast(`Case Study for ${product.title1} Coming Soon...`);
                        }}
                        onGithubClick={(e) => {
                            e.stopPropagation();
                            showToast(`${product.title1} Repository is Private 🔒`);
                        }}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="load-more-wrapper">
                    <button className="text-link-btn" onClick={handleLoadMore}>
                        View More Projects
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div>
            )}

            <AnimatePresence mode="wait">
                {toast.show && (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        onClose={handleToastClose}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Products;
