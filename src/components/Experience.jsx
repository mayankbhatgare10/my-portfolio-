import React from 'react';
import './Experience.css';
import checkmarkIcon from '../assets/checkmark.png';
import arrowIcon from '../assets/arrow.png';

const Experience = () => {
  return (
    <section id="experience">
      <p className="section__text__p1">Explore My</p>
      <h1 className="title"> Stacks </h1>
      <div className="experience-details-container">
        <div className="about-containers">
          <div className="details-container">
            <h2 className="experience-sub-title">Frontend Development</h2>
            <div className="article-container">
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>HTML/CSS</h3>
                  <p>Experienced</p>
                </div>
              </article>
              
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>React.js</h3>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>JavaScript</h3>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>Ant-Design</h3>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>Material UI</h3>
                  <p>Basic</p>
                </div>
              </article>
            </div>
          </div>
          <div className="details-container">
            <h2 className="experience-sub-title">Graphic Designing & UI / UX </h2>
            <div className="article-container">
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>Figma</h3>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>Affinity Suit</h3>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>Axure RP</h3>
                  <p>Basic</p>
                </div>
              </article>
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>Proto.io</h3>
                  <p>Basic</p>
                </div>
              </article>
              <article>
                <img src={checkmarkIcon} alt="Experience icon" className="icon" />
                <div>
                  <h3>Canva</h3>
                  <p>Intermediate</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <img
        src={arrowIcon}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => window.location.href = './#projects'}
      />
    </section>
  );
};

export default Experience;