import React from 'react';
import './About.css';
import aboutPic from '../assets/about-pic.jpg';
import experienceIcon from '../assets/experience.png';
import educationIcon from '../assets/education.png';
import arrowIcon from '../assets/arrow.png';

const About = () => {
  return (
    <section id="about">
      <p className="section__text__p1">Get To Know More</p>
      <h1 className="title">About Me</h1>
      <div className="section-container">
        <div className="about-details-container">
          <div className="about-containers">
            <div className="details-container">
              <img src={experienceIcon} alt="Experience icon" className="icon" />
              <h3>Awards and Achievements</h3>
              <p>SIH 2023 Winners</p>
            </div>
            <div className="details-container">
              <img src={educationIcon} alt="Education icon" className="icon" />
              <h3>Education</h3>
              <p>B.E. Computer Engineering (Pursuing)</p>
            </div>
          </div>
          <div className="text-container">
            <p>
              Hey there! I'm a passionate student deeply immersed in the world of UI/UX design and graphic arts, driven by a relentless pursuit of problem-solving. Backed by a strong academic foundation, I've recently augmented my skills by mastering ReactJS and Figma. One of my crowning achievements was emerging victorious at the SIH Hackathon, where I showcased my ability to innovate and collaborate seamlessly as a UI/UX designer. My journey also encompasses a fervor for graphic design, where I thrive on blending aesthetics with functionality to create visually captivating experiences. The prospect of leveraging my creative prowess and technical acumen in an internship role fills me with anticipation. I'm eager to infuse fresh ideas, foster collaboration, and craft impactful user experiences that leave a lasting impression.
            </p>
          </div>
        </div>
        <div className="section__pic-container">
          <img src={aboutPic} alt="Profile picture" className="about-pic" />
        </div>
      </div>
      <img
        src={arrowIcon}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => window.location.href = './#experience'}
      />
    </section>
  );
};

export default About;
