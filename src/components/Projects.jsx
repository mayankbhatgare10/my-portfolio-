import React, { useRef } from "react";
import "./Projects.css";
import TypingAnimation from "./ui/typing-animation";
import payTrakzImg from "../assets/PayTrakz.jpg";
import dairyAppImg from "../assets/Dairy App.png";
import infobytesImg from "../assets/Infobytes Technosys.png";
import hiFiImg from "../assets/Hi-Fi.png";
import wanderWiseImg from "../assets/WanderWise.png";
import allGraphicsImg from "../assets/all graphics.png";
import jalankUIImg from "../assets/jalank_ui.png";
import nextgenGroceryImg from "../assets/nextgen_grocery_ui.png";
import arrowIcon from "../assets/arrow.png";

const Projects = () => {
  const sliderRef = useRef(null);

  // Project data array
  const projects = [
    {
      id: 1,
      title: "PayTrakz UI",
      description:
        "Advanced expense tracking software for managing expenses efficiently",
      role: "UI/UX Designer",
      contribution:
        "Redesigned the PayTrakz Mobile App for improved usability and created the UX for PayTrakz Web UI, ensuring a cohesive cross-platform experience. Delivered cleaner layouts, improved navigation flow, and a more engaging interface.",
      tools: "Figma, Design Systems, Wireframing & Prototyping",
      image: payTrakzImg,
      link: "https://www.figma.com/design/F0uQ2IElKhMGv7chNNy3oV/New_Paytrakz-App-UI?node-id=0-1&t=rwDEdcCUmcXZjfCg-1",
    },
    {
      id: 2,
      title: "Dairy App",
      description:
        "Digital platform for streamlining dairy business operations",
      role: "UX Researcher & UI Designer",
      contribution:
        "Conducted UX research, developed user flows, and designed responsive role-based admin and customer dashboards. Enhanced operational efficiency by streamlining key workflows.",
      tools: "Figma, Prototyping, Interaction Design",
      image: dairyAppImg,
      link: "https://www.figma.com/design/KUDzX9yWfXJ4BlGsSjkexZ/Dairy-App?node-id=0-1&t=ioIwhnxglNa0lGfj-1",
    },
    {
      id: 3,
      title: "Infobytes Technosys Landing Page",
      description: "Corporate landing page for IT solutions provider",
      role: "UI/Frontend Developer",
      contribution:
        "Designed a minimalist landing page with subtle micro-interactions and implemented it fully in React.js. Strengthened brand presence with modern visuals and smooth animations.",
      tools: "Figma, React.js, CSS Animations",
      image: infobytesImg,
      link: "https://infobytestechnosys.in/",
    },
    {
      id: 4,
      title: "Hi-Fi",
      description:
        "AI-powered financial assistant that helps users understand, manage, and act on their finances — like ChatGPT for your bank account",
      role: "Product Designer & Frontend Developer",
      contribution:
        "Designed high-fidelity UI screens, documented UX flows, and implemented the complete platform in Next.js. Delivered a scalable, responsive platform with an optimized onboarding process.",
      tools: "Figma, Next.js, TypeScript",
      image: hiFiImg,
      link: "https://web.hifi.click/login",
    },
    {
      id: 5,
      title: "WanderWise",
      description: "Solo travel buddy platform for planning and managing trips",
      role: "UI/UX Designer",
      contribution:
        "Created a robust UX strategy and designed a visually engaging interface tailored for solo travelers. Improved trip planning ease through intuitive navigation and personalized features.",
      tools: "Figma",
      image: wanderWiseImg,
      link: "https://www.figma.com/design/HZReHgHUfRTu7d23fKXzSn/Untitled?node-id=0-1&t=t4ltd82WzE0acPBu-1",
    },
    {
      id: 6,
      title: "All Graphic",
      description: "Graphic design projects and visual content",
      role: "Graphic Designer",
      contribution:
        "Created various graphic design assets and visual content for different projects.",
      tools: "Canva, Design Tools",
      image: allGraphicsImg,
      link: "https://www.canva.com/design/DAGEhrvsbKM/WHeqggomjjTEEhCextk9bw/edit?utm_content=DAGEhrvsbKM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
      id: 7,
      title: "Jalank UI",
      description: "User interface design for Jalank platform",
      role: "UI Designer",
      contribution:
        "Designed comprehensive UI components and interfaces for the Jalank platform.",
      tools: "Figma, UI Design",
      image: jalankUIImg,
      link: "https://www.figma.com/file/0dumo3b7gmQ2y3RxJNYcrP/JalAnk-UI?type=design&node-id=0%3A1&mode=design&t=a9PZiQm38FpZGUIo-1",
    },
    {
      id: 8,
      title: "NextGen Grocery",
      description: "Modern grocery shopping platform interface",
      role: "UI/UX Designer",
      contribution:
        "Designed modern and intuitive grocery shopping experience with improved user flows.",
      tools: "Figma, UX Design",
      image: nextgenGroceryImg,
      link: "https://www.figma.com/file/7vdYkH4aaKlNqkkyz88Qto/NextGen-Grocey-UI?type=design&mode=design&t=JIjYmA1zGW8aAFyE-1",
    },
  ];

  // Function to handle opening detailed information page in a new tab
  const openDetailedInfoPage = (url) => {
    window.open(url, "_blank");
  };

  // Scroll functions for the slider
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects">
      <p className="section__text__p1">Browse My Recent</p>
      <TypingAnimation text="Projects" duration={100} className="title" />
      <div className="projects-slider-container">
        <button className="slider-btn slider-btn-left" onClick={scrollLeft}>
          ‹
        </button>
        <div className="projects-slider" ref={sliderRef}>
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-details">
                  <p>
                    <strong>Role:</strong> {project.role}
                  </p>
                  <p>
                    <strong>Tools:</strong> {project.tools}
                  </p>
                </div>
                <div className="btn-container">
                  <button
                    className="btn btn-color-2 project-btn"
                    onClick={() => openDetailedInfoPage(project.link)}
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn slider-btn-right" onClick={scrollRight}>
          ›
        </button>
      </div>
      <img
        src={arrowIcon}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = "#contact")}
      />
    </section>
  );
};

export default Projects;
