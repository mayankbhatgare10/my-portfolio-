import React from "react";
import "./Education.css";
import educationIcon from "../assets/education.png";
import arrowIcon from "../assets/arrow.png";
import TypingAnimation from "./ui/typing-animation";

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: "BE Computer Engineering",
      institution: "JSPM's ICOER, Wagholi",
      grade: "8.68 SGPA",
      duration: "2022-2026",
      status: "Pursuing",
      level: "Bachelor's Degree",
    },
    {
      id: 2,
      degree: "HSC",
      institution: "Abhyasa English Medium Junior College, Yavatmal",
      grade: "91.50%",
      duration: "2022",
      status: "Completed",
      level: "Higher Secondary",
    },
    {
      id: 3,
      degree: "SSC",
      institution: "Jawaharlal Darda English Medium CBSE School, Yavatmal",
      grade: "86.80%",
      duration: "2020",
      status: "Completed",
      level: "Secondary",
    },
  ];

  return (
    <section id="education">
      <p className="section__text__p1">My Academic</p>
      <TypingAnimation text="Education" duration={100} className="title" />
      <div className="education-container">
        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div key={edu.id} className="education-item">
              <div className="education-icon-container">
                <img
                  src={educationIcon}
                  alt="Education icon"
                  className="education-icon"
                />
              </div>
              <div className="education-content">
                <div className="education-header">
                  <h3 className="education-degree">{edu.degree}</h3>
                  <span
                    className={`education-status ${edu.status.toLowerCase()}`}
                  >
                    {edu.status}
                  </span>
                </div>
                <h4 className="education-institution">{edu.institution}</h4>
                <div className="education-details">
                  <div className="education-grade">
                    <strong>Grade: </strong>
                    {edu.grade}
                  </div>
                  <div className="education-duration">
                    <strong>Year: </strong>
                    {edu.duration}
                  </div>
                </div>
                <span className="education-level">{edu.level}</span>
              </div>
              {index < educationData.length - 1 && (
                <div className="timeline-connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <img
        src={arrowIcon}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = "#experience")}
      />
    </section>
  );
};

export default Education;
