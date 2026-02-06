import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./Achievements.css";

const achievementsData = [
  {
    id: 1,
    title: "SIH — Smart India Hackathon",
    date: "Dec 2023",
    duration: "24 Hours • National Level",
    tag: "Winner",
    role: "UI/UX Designer",
    product: "Water Footprint Calculator",
    shortDesc: "Designed a water-usage awareness platform helping users calculate and reduce their water footprint through intuitive and relatable UX. Our UI direction was selected as the winning approach.",
    storyline: (
      <>
        <p>My focus was translating a policy-driven problem into an experience everyday users could understand. I worked on structuring the user flow, simplifying data-heavy concepts, and designing relatable comparisons that made water consumption tangible.</p>
        <p>I also helped the team prioritize clarity over feature overload during time pressure. My contribution centered on making the product understandable within seconds — which ultimately made our UI direction stand out at the national level.</p>
      </>
    ),
    logo: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pSjXguaqhXiIfLHRArNwQTPbcaFn8Vzk1B4Ej",
    photo: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6p9xNDun8JHxEtMSjVYpraCsnOL14DbU7efukq",
    color: "#FF9F1C",
    orientation: "vertical"
  },
  {
    id: 2,
    title: "CodeXCaliber — IIIT Nagpur",
    date: "June 2025",
    duration: "1-Month Bootcamp",
    tag: "Winner",
    role: "Product Designer & Frontend Developer",
    product: "JourNULL",
    shortDesc: "Built a minimal journaling platform designed to reduce overthinking through structured reflection and calm UX.",
    storyline: (
      <>
        <p>I worked at the intersection of design and development, ensuring ideas stayed feasible while maintaining a strong UX vision. I led the experience design, defined journaling flows, and implemented key screens on the frontend.</p>
        <p>Iterating on user feedback helped shape JourNULL into a focused and purposeful product.</p>
      </>
    ),
    logo: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pf0AZHYRg1Y8hRcpLZkG3nvmJVSjUErAMzfbd",
    photo: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6psJCiu9g6Qld8YCSjhpN5BFvREmwP0axtX2bD",
    color: "#2EC4B6",
    orientation: "horizontal"
  },
  {
    id: 3,
    title: "Agentic AI Day",
    date: "July 2025",
    duration: "36 Hours • National Level",
    tag: "Winner",
    role: "Product Designer & Frontend Developer",
    product: "Hi-Fi — “Paisa Bolta Hai”",
    shortDesc: "Designed an AI-powered financial platform that turns complex money insights into simple conversational experiences.",
    storyline: (
      <>
        <p>I focused on shaping how users interact with financial insights — moving away from static dashboards toward conversational and contextual UI. The jury feedback highlighted the clarity, usability, and polish of the experience.</p>
      </>
    ),
    logo: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pf792qZ2Rg1Y8hRcpLZkG3nvmJVSjUErAMzfb",
    photo: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pmwOVcT3pxVrQUXqD674jGLh9FMWYweaAHR5N",
    color: "#E71D36",
    orientation: "vertical"
  },
  {
    id: 4,
    title: "Panelist @ INSD Baner",
    date: "Jan 2026",
    duration: "External Jury & Mentor",
    tag: "Jury",
    role: "External Jury & Product Mentor",
    product: "Student Mentorship",
    shortDesc: "Invited as an external jury member to evaluate and mentor student product concepts.",
    storyline: (
      <>
        <p>Here my role shifted from builder to reviewer. I evaluated student projects from a product thinking lens, gave UX feedback, and guided teams on aligning design decisions with user needs.</p>
        <p>This experience strengthened my perspective on what makes ideas execution-ready and user-centered.</p>
      </>
    ),
    logo: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pFHsjoa0LQm1OUBhcsf9u83zopng6v2xHrdJA",
    photo: "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pbz3ZNghxJgvKsQFz45pBOWj9Yu3V1GlXoCqE",
    color: "#7209B7",
    orientation: "horizontal"
  }
];

const Achievements = () => {
  const containerRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  // Scroll Progress Logic for Locked Section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Timeline Fill Height - moves with scroll (smoother spring)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothLineHeight = useSpring(lineHeight, { stiffness: 30, damping: 30 });

  // Title Animation: Moves down at SAME PACE as timeline (slower, smoother)
  const titleY = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], ["-30vh", "0vh", "0vh", "15vh"]);
  const smoothTitleY = useSpring(titleY, { stiffness: 25, damping: 30 });

  // Title Opacity: 25% → 100% → 25% (more gradual fade transitions)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0.25, 1, 1, 0.25]);
  const smoothTitleOpacity = useSpring(titleOpacity, { stiffness: 30, damping: 25 });

  // Dot Colors: Milestone-based filling - dots fill completely when timeline reaches them
  // Smoother transitions with wider ranges
  const dot1Fill = useTransform(scrollYProgress, [0.20, 0.26], ["#e5e7eb", "#2563eb"]);
  const dot2Fill = useTransform(scrollYProgress, [0.45, 0.51], ["#e5e7eb", "#2563eb"]);
  const dot3Fill = useTransform(scrollYProgress, [0.70, 0.76], ["#e5e7eb", "#2563eb"]);
  const dot4Fill = useTransform(scrollYProgress, [0.94, 1], ["#e5e7eb", "#2563eb"]);

  const dotColors = [
    { fill: dot1Fill },
    { fill: dot2Fill },
    { fill: dot3Fill },
    { fill: dot4Fill }
  ];

  // Dynamic Layout Calculation
  const isAnyExpanded = !!activeId;

  // Dynamic height: Further reduced to minimize bottom gap
  const wrapperHeight = isAnyExpanded ? "140vh" : "110vh";

  // Dynamic list shift: Pull up slightly less since we reduced height
  const listEndPos = isAnyExpanded ? "-40vh" : "-15vh";

  // List Translation: Fixed VH units, shifting content fully for clear exit (smoother)
  const rawY = useTransform(scrollYProgress, [0, 1], ["10vh", listEndPos]);
  // Smoother spring with lower stiffness
  const smoothY = useSpring(rawY, { stiffness: 30, damping: 30 });

  const toggleExpand = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="achievements-scroll-wrapper"
      style={{ height: wrapperHeight, transition: 'height 0.5s ease' }}
    >
      <div className="achievements-sticky-viewport">
        <div className="achievements-layout">
          {/* Left Column: Locked Title */}
          <div className="achievements-intro-col">
            <motion.div
              className="achievements-intro-content"
              style={{ y: smoothTitleY, opacity: smoothTitleOpacity }}
            >
              <h2 className="static-section-title">Achievements & Recognition</h2>
            </motion.div>
          </div>

          {/* Right Column: Scrolling Timeline List */}
          <div className="achievements-list-window">
            {/* Timeline Track - fluid line */}
            <div className="timeline-container">
              <div className="timeline-track-bg"></div>
              <motion.div
                className="timeline-track-fill"
                style={{ height: smoothLineHeight }}
              ></motion.div>
            </div>

            <motion.div
              className="achievements-list-col"
              style={{ y: smoothY }}
            >
              {achievementsData.map((item, index) => {
                const isExpanded = activeId === item.id;
                const dotStyle = dotColors[index] || dotColors[0];

                return (
                  <div
                    key={item.id}
                    className={`achievement-accord-card ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(item.id)}
                  >
                    {/* Timeline Dot with Motion Colors */}
                    <motion.div
                      className={`timeline-dot ${activeId === item.id ? 'active' : ''}`}
                      style={{
                        backgroundColor: dotStyle.fill,
                      }}
                    ></motion.div>

                    {/* Header Row */}
                    <div className="accord-header">
                      <div className="accord-brand">
                        <div className="accord-logo-wrapper">
                          <img src={item.logo} alt={item.title} className="accord-logo" />
                        </div>
                        <div className="accord-header-info">
                          <div className="accord-title-row">
                            <h3 className="accord-title">{item.title}</h3>
                            {item.tag && <span className="accord-tag inline">{item.tag}</span>}
                          </div>
                          <div className="accord-meta-row">
                            <span className="accord-date">{item.date}</span>
                            <span className="accord-dot">•</span>
                            <span className="accord-duration">{item.duration}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        className={`accord-toggle-btn ${isExpanded ? 'active' : ''}`}
                        aria-label={isExpanded ? "Collapse Details" : "Expand Details"}
                      >
                        {isExpanded ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Short Desc */}
                    <div className="accord-short-desc">
                      <p className="accord-role-label">{item.role}</p>
                      <p>{item.shortDesc}</p>
                    </div>

                    {/* Expandable Content */}
                    <div
                      className={`accord-expanded-content ${isExpanded ? 'open' : ''} ${item.orientation}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="expanded-inner">
                        <div className="expanded-visual">
                          <img src={item.photo} alt={item.title} className="expanded-hero-img" />
                        </div>
                        <div className="expanded-story">
                          <div className="expanded-text">
                            {item.storyline}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
