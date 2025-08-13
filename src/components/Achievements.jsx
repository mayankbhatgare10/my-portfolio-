import React from "react";
import "./Achievements.css";
import arrowIcon from "../assets/arrow.png";
import TypingAnimation from "./ui/typing-animation";
import AnimatedSection from "./ui/animated-section";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Smart India Hackathon 2023 WINNERS",
      year: "2023",
      type: "Winner",
      description:
        "Led the complete UI design for the winning solution, creating an intuitive and visually engaging interface that met user requirements and improved usability.",
      category: "UI Design Leadership",
    },
    {
      id: 2,
      title: "Breakthrough Concept Award – Agentic AI Day 2025",
      year: "2025",
      type: "Award",
      description:
        "Recognized for an innovative AI-driven concept, where frontend development and UI design were key to delivering an impactful demo and smooth user interaction.",
      category: "AI Innovation",
    },
    {
      id: 3,
      title: "Winner – CodeXCaliber, IIIT Nagpur",
      year: "2024",
      type: "Winner",
      description:
        "Designed the full UI, wrote the complete UX strategy, and implemented the solution, earning top honors for design clarity and functionality.",
      category: "Full-Stack Design",
    },
    {
      id: 4,
      title: "Finalist & Special Mention – HackFest 2024 (Organized by SAP)",
      year: "2024",
      type: "Finalist",
      description:
        "Played a pivotal role in frontend development for the finalist project, ensuring a responsive and polished user experience that received special mention.",
      category: "Frontend Excellence",
    },
  ];

  return (
    <section id="achievements">
      <p className="section__text__p1">Celebrating My</p>
      <TypingAnimation text="Achievements" duration={100} className="title" />
      <div className="achievements-container">
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <AnimatedSection
              key={achievement.id}
              delay={index * 0.1}
              direction="up"
            >
              <div className="achievement-card">
                <div className="achievement-header">
                  <span
                    className={`achievement-type ${achievement.type.toLowerCase()}`}
                  >
                    {achievement.type}
                  </span>
                  <span className="achievement-year">{achievement.year}</span>
                </div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-category">{achievement.category}</p>
                <p className="achievement-description">
                  {achievement.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <img
        src={arrowIcon}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = "#projects")}
      />
    </section>
  );
};

export default Achievements;
