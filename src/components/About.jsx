import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./About.css";
import Confetti from "./ui/confetti";
import InfiniteTape from "./ui/infinite-tape";
import TechTicker from "./ui/tech-ticker";

const PROFILE_IMAGE =
  "https://4ekvzr5zup.ufs.sh/f/NwWZp9fksM6pCtkhLVzOHZneoRXwE8Qt3vbdczIVsGxmq2hO";

const About = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const sectionRef = useRef(null);

  /* ── scroll tracking for the entire About section ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Entry animations (driven by scroll) ── */

  // Profile image slides in from left
  const imageX = useTransform(scrollYProgress, [0.02, 0.14], [-280, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.02, 0.14], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.02, 0.14], [0.85, 1]);

  // Sidebar details (stats, buttons, social) fade in + rise
  const detailsOpacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.08, 0.18], [50, 0]);

  // About Me card slides in from right
  const aboutCardX = useTransform(scrollYProgress, [0.04, 0.16], [350, 0]);
  const aboutCardOpacity = useTransform(scrollYProgress, [0.04, 0.16], [0, 1]);

  // Experience card slides up + fades in (slightly later)
  const expCardY = useTransform(scrollYProgress, [0.18, 0.28], [80, 0]);
  const expCardOpacity = useTransform(scrollYProgress, [0.18, 0.28], [0, 1]);

  /* ── event handlers ── */
  const handleKudos = (e) => {
    e.preventDefault();
    setConfettiTrigger((prev) => prev + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4500);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mayank-bhatgare/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/mayankbhatgare10",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/imbhatgare_mb/",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:bhatgare.mayank10@gmail.com",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {/* ── Design Stack tape (lower z-index, cards scroll above it) ── */}
      <InfiniteTape />

      <div className="about-container-locked">
        {/* ═══════ LEFT: Sticky Sidebar ═══════ */}
        <div className="about-sidebar-fixed">
          <div className="about-sidebar-content">
            {/* Profile Image — slides from left */}
            <motion.div
              className="about-image-wrapper"
              style={{
                x: imageX,
                opacity: imageOpacity,
                scale: imageScale,
              }}
            >
              <img
                src={PROFILE_IMAGE}
                alt="Mayank Bhatgare - Professional Profile"
                className="about-profile-image"
              />
            </motion.div>

            {/* Stats — fade-in + rise */}
            <motion.div
              className="about-stats-container"
              style={{ opacity: detailsOpacity, y: detailsY }}
            >
              <div className="about-stat-item">
                <span className="stat-value">1.5+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-value">3x</span>
                <span className="stat-label">Hackathon Winner</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-value">7x</span>
                <span className="stat-label">Finales Attended</span>
              </div>
            </motion.div>

            {/* Resume & Kudos — fade-in + rise */}
            <motion.div
              className="action-buttons-row"
              style={{ opacity: detailsOpacity, y: detailsY }}
            >
              <a
                href="https://flowcv.com/resume/2t6ojvqekoae"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link-button black-button"
              >
                View Resume
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              <button
                onClick={handleKudos}
                className="kudos-button-standalone"
                aria-label="Give Kudos"
                title="Give Kudos"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </button>
            </motion.div>

            {/* Social Links — fade-in + rise */}
            <motion.div
              className="social-icons-row"
              style={{ opacity: detailsOpacity, y: detailsY }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-box"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ═══════ RIGHT: Scrollable Cards (scroll above tape) ═══════ */}
        <div className="about-cards-scrollable">
          {/* About Me Card — slides from right */}
          <motion.div
            className="about-text-section"
            style={{ x: aboutCardX, opacity: aboutCardOpacity }}
          >
            <h2 className="about-heading">About Me</h2>
            <div className="about-text">
              <p>
                I'm a Product Designer focused on translating complex ideas into
                intuitive, high-impact digital experiences. With 1.5+ years in
                UI/UX, I've contributed to real-world products where design
                directly shapes usability, business outcomes, and user behavior.
              </p>
              <p>
                As Lead UI/UX at Infobytes Technosys, I've driven end-to-end
                design for client and in-house products, including PayTrakz — an
                expense management platform designed from research to developer
                handoff. I enjoy navigating the full product lifecycle, aligning
                user needs, business logic, and technical feasibility into
                cohesive solutions.
              </p>
              <p>
                My frontend background (React, Next.js, TypeScript) informs a
                systems-aware design approach, enabling me to create scalable,
                build-ready interfaces. I value clarity, structure, and
                intentionality over visual noise.
              </p>
              <p>
                Hackathons and innovation environments have shaped my
                problem-solving mindset — from being a finalist at SIH and
                CodeXcaliber (IIIT Nagpur) to presenting a breakthrough concept
                at Google Agentic AI Day. These experiences strengthened my
                ability to think critically, iterate quickly, and design under
                constraints.
              </p>
              <p>
                I gravitate toward minimal, product-driven design where every
                element serves a purpose, aiming to build solutions that are not
                just usable, but meaningful.
              </p>
            </div>
          </motion.div>

          {/* Experience Card — rises up + fades in */}
          <motion.div
            className="about-experience-section"
            style={{ y: expCardY, opacity: expCardOpacity }}
          >
            <h2 className="about-heading">Experience</h2>
            <div className="experience-card">
              <div className="experience-header">
                <h3 className="experience-role">UI/UX Team Lead</h3>
                <p className="experience-company">Infobytes Technosys</p>
                <p className="experience-duration">
                  Aug 2024 – Present | Pune, India
                </p>
              </div>
              <ul className="experience-highlights">
                <li>
                  Leading UI/UX across client and in-house products, translating
                  business requirements into structured, scalable, and
                  production-ready experiences.
                </li>
                <li>
                  Delivered UI/UX for multiple digital products, balancing user
                  needs, business goals, and technical constraints.
                </li>
                <li>
                  Spearheaded a full redesign of the in-house mobile app,
                  refining navigation architecture, visual hierarchy, and
                  interaction clarity.
                </li>
                <li>
                  Designed web platforms end-to-end, from user flows and
                  wireframes to high-fidelity interfaces and developer-ready
                  specifications.
                </li>
                <li>
                  Systematized reusable components and design patterns to ensure
                  cross-product consistency and reduce iteration cycles.
                </li>
                <li>
                  Shipped a role-based dairy platform with distinct Customer and
                  Admin ecosystems, defining workflows, dashboards, and
                  permissions.
                </li>
                <li>
                  Drove stakeholder alignment through structured design reviews,
                  accelerating approvals and handoff clarity.
                </li>
                <li>
                  Led design QA and cross-device validation to maintain
                  implementation accuracy and production quality.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confetti Effect */}
      <Confetti active={showConfetti} trigger={confettiTrigger} />

      <TechTicker />
    </section>
  );
};

export default About;
