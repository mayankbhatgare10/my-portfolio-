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
                I'm a Product Designer specializing in UX research, UI design,
                and frontend development, passionate about turning complex ideas
                into intuitive, visually engaging digital experiences. With
                hands-on expertise in tools like Figma, Next.js, and React.js,
                I've delivered impactful solutions across fintech, travel, and
                enterprise platforms. From user flows and prototypes to
                polished, production-ready interfaces, I handle the complete
                design journey while keeping users at the heart of every
                decision. Recognized in national and international hackathons, I
                combine human-centered design principles with technical
                execution to create products that are not only beautiful but
                also highly functional and accessible.
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
