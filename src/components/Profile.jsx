import React from 'react';
import './Profile.css';
import profilePic from '../assets/Professional LinkedIn Profile Picture.png';
import linkedinIcon from '../assets/linkedin.png';
import githubIcon from '../assets/github.png';

const Profile = () => {
  return (
    <section id="profile">
      <div className="section__pic-container">
        <img src={profilePic} alt="Mayank Bhatgare profile picture" />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Hello, I'm</p>
        <h1 className="title">Mayank Nitin Bhatgare</h1>
        <p className="section__text__p2">A Versatile Graphic Designer &<br />Frontend Developer</p>
        <div className="btn-container">
          <button
            className="btn btn-color-2"
            onClick={() => window.open('https://drive.google.com/file/d/1kGL6L9DEdjgT0GdUas85FAy76BQT0tI1/view?usp=sharing')}
          >
            Resume
          </button>
          <button className="btn btn-color-1" onClick={() => window.location.href = './#contact'}>
            Contact Info
          </button>
        </div>
        <div id="socials-container">
          <img
            src={linkedinIcon}
            alt="My LinkedIn profile"
            className="icon"
            onClick={() => window.location.href = 'https://www.linkedin.com/in/mayank-bhatgare'}
          />
          <img
            src={githubIcon}
            alt="My Github profile"
            className="icon"
            onClick={() => window.location.href = 'https://github.com/'}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;