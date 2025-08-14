import React from "react";
import "./Profile.css";
import profilePic from "../assets/Professional LinkedIn Profile Picture.png";
import profilePicDark from "../assets/Professional LinkedIn Profile Picture_Dark.png";
import linkedinIcon from "../assets/linkedin.png";
import githubIcon from "../assets/github.png";
import TypingAnimation from "./ui/typing-animation";
import InteractiveHoverButton from "./ui/interactive-hover-button";
import { useDarkMode } from "../contexts/DarkModeContext";

const Profile = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <section id="profile">
      <div className="section__pic-container">
        <img
          src={isDarkMode ? profilePicDark : profilePic}
          alt="Mayank Bhatgare"
          style={{
            transition: "opacity 0.4s ease",
            opacity: 1,
          }}
        />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Hello, I'm</p>
        <TypingAnimation
          text="Mayank Nitin Bhatgare"
          duration={150}
          className="title"
        />
        <p className="section__text__p2">
          A Product Designer &<br />
          Frontend Developer
        </p>
        <div className="btn-container">
          <InteractiveHoverButton
            text="Resume"
            variant="secondary"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1zDvCIqIRDgi7DqTu6t8vK0K9pjnQhIOa/view?usp=sharing"
              )
            }
          />
          <InteractiveHoverButton
            text="Contact Info"
            variant="primary"
            onClick={() => {
              document.getElementById("contact").scrollIntoView({
                behavior: "smooth",
              });
            }}
          />
        </div>
        <div id="socials-container">
          <img
            src={linkedinIcon}
            alt="My LinkedIn profile"
            className="icon"
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/mayank-bhatgare")
            }
          />
          <img
            src={githubIcon}
            alt="My Github profile"
            className="icon"
            onClick={() => (window.location.href = "https://github.com/")}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
