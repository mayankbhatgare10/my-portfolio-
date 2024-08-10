import React from 'react';
import './Contact.css';
import emailIcon from '../assets/email.png';
import linkedinIcon from '../assets/linkedin.png';

const Contact = () => {
  return (
    <section id="contact">
      <p className="section__text__p1">Get in Touch</p>
      <h1 className="title">Contact Me</h1>
      <div className="contact-info-upper-container">
        <div className="contact-info-container">
          <img src={emailIcon} alt="Email icon" className="icon contact-icon email-icon" />
          <p>
            <a href="mailto:mayank.bhatgare@gmail.com">mayank.bhatgare@gmail.com</a>
          </p>
        </div>
        <div className="contact-info-container">
          <img src={linkedinIcon} alt="LinkedIn icon" className="icon contact-icon" />
          <p>
            <a href="https://www.linkedin.com/in/mayank-bhatgare" >LinkedIn</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;