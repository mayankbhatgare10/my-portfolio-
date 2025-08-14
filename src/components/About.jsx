import React from "react";
import "./About.css";
import aboutPic from "../assets/about-pic.jpg";
import arrowIcon from "../assets/arrow.png";
import TypingAnimation from "./ui/typing-animation";
import AnimatedSection from "./ui/animated-section";

const About = () => {
  return (
    <section id="about">
      <p className="section__text__p1">Get To Know More</p>
      <TypingAnimation text="About Me" duration={100} className="title" />
      <AnimatedSection direction="up" delay={0.3}>
        <div className="section-container">
          <div className="about-details-container">
            <div className="text-container">
              <p>
                I’m a Product Designer passionate about transforming complex
                ideas into simple, elegant user experiences. As Lead UI/UX
                Designer at Infobytes Technosys, I’ve shaped both client
                solutions and in-house products—most notably PayTrakz, an
                advanced expense tracking platform—through end-to-end design
                ownership, from UX research and strategy to high-fidelity UI and
                interaction design. My approach blends human-centered design
                principles with strong technical execution, leveraging tools
                like Figma, Affinity Suite, and Git alongside development skills
                in Next.js, React.js, HTML, CSS, and TypeScript. Recognized at
                national-level hackathons for innovation and design excellence,
                I excel at creating digital products that are not only visually
                striking but also functional, accessible, and business-driven.
              </p>
            </div>
          </div>
          <div className="section__pic-container">
            <img src={aboutPic} alt="Mayank Bhatgare" className="about-pic" />
          </div>
        </div>
      </AnimatedSection>
      <img
        src={arrowIcon}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = "#education")}
      />
    </section>
  );
};

export default About;
