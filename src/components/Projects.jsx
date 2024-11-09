import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Projects.css';
import project1 from '../assets/project-1.png';
import project2 from '../assets/project-2.png';
import project3 from '../assets/project-3.png';
import project4 from '../assets/project-4.png';
import arrowIcon from '../assets/arrow.png';

const Projects = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle opening detailed information page in a new tab
  const openDetailedInfoPage = (url) => {
    window.open(url, '_blank');
  };

  // Function to handle navigating to Milkera page
  const openMilkeraPage = () => {
    navigate('/milkera');
  };

  return (
    <section id="projects">
      <p className="section__text__p1">Browse My Recent</p>
      <h1 className="title">Projects</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          {/* Project 1 */}
          <div className="details-container color-container">
            <div className="article-container">
              <img src={project1} alt="Project 1" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">All Graphic</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => openDetailedInfoPage('https://www.canva.com/design/DAGEhrvsbKM/WHeqggomjjTEEhCextk9bw/edit?utm_content=DAGEhrvsbKM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton')}
              >
                View Detail
              </button>
            </div>
          </div>

          {/* Project 2 */}
          <div className="details-container color-container">
            <div className="article-container">
              <img src={project2} alt="Project 2" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">Jalank UI</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => openDetailedInfoPage('https://www.figma.com/file/0dumo3b7gmQ2y3RxJNYcrP/JalAnk-UI?type=design&node-id=0%3A1&mode=design&t=a9PZiQm38FpZGUIo-1')}
              >
                View Detail
              </button>
            </div>
          </div>

          {/* Project 3 */}
          <div className="details-container color-container">
            <div className="article-container">
              <img src={project3} alt="Project 3" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">NextGen Grocery</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => openDetailedInfoPage('https://www.figma.com/file/7vdYkH4aaKlNqkkyz88Qto/NextGen-Grocey-UI?type=design&mode=design&t=JIjYmA1zGW8aAFyE-1')}
              >
                View Detail
              </button>
            </div>
          </div>
        </div>
      </div>
      <img
        src={arrowIcon}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => window.location.href = '#contact'}
      />
    </section>
  );
};

export default Projects;