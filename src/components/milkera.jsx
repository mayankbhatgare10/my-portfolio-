import React from 'react';
import ReactPlayer from 'react-player';
import './milkera.css';
import designImage from '../assets/design.png'; // Adjust the path as per your project structure

const Milkera = () => {
  return (
    <div className="milkera-container">
      <div className="logo-text-section">
        <h1>Milkera ERP</h1>
        <p className="description">
          Milkera ERP is a ReactJS-based project focused on building
          a robust enterprise resource planning system specifically
          for the dairy industry. By utilizing the component library Ant
          Design, the project aims to create an intuitive and efficient
          platform for managing critical dairy operations. Key
          functionalities will include inventory management,
          production planning and scheduling, quality control, sales
          and distribution, and financial accounting.
        </p>
      </div>
      <div className="video-section">
        <ReactPlayer
          url={require('../assets/milkera_video.mp4')} // Adjust the path as per your project structure
          controls
          width="80%"
          height="auto"
          className="video-placeholder"
        />
      </div>
      <div className="sparkle-icon">✦</div>
    </div>
  );
};

export default Milkera;
