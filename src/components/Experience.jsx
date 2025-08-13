import React from "react";
import "./Experience.css";
import arrowIcon from "../assets/arrow.png";
import TypingAnimation from "./ui/typing-animation";

const Experience = () => {
  const designSkills = [
    "UX/UI Design",
    "Product Design",
    "User Research",
    "Wireframing & Prototyping",
    "User Flows & Journey Mapping",
    "Design Systems",
    "Responsive Design",
    "Accessibility (WCAG)",
    "Usability Testing",
    "Human-Centered Design",
    "Agile/Scrum Collaboration",
    "Rapid Prototyping",
    "Branding & Typography",
    "Color Theory",
  ];

  const technicalSkills = [
    "HTML5 & CSS3",
    "TypeScript",
    "JavaScript (ES6+)",
    "Python",
    "Next.js",
    "React.js",
    "Git & GitHub",
    "VS Code",
    "Figma",
    "Motiff",
    "Affinity Serif Suite",
    "QA Testing",
    "Version Control",
  ];

  return (
    <section id="experience">
      <p className="section__text__p1">Explore My</p>
      <TypingAnimation text="Skills" duration={100} className="title" />
      <div className="experience-details-container">
        <div className="skills-grid">
          <div className="skills-category">
            <h2 className="category-title">Design</h2>
            <div className="skills-list">
              {designSkills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skills-category">
            <h2 className="category-title">Technical</h2>
            <div className="skills-list">
              {technicalSkills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <img
        src={arrowIcon}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = "#achievements")}
      />
    </section>
  );
};

export default Experience;
