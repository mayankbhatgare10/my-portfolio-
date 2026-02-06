import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useDarkMode } from "../contexts/DarkModeContext";

const Profile = () => {
  const { isDarkMode } = useDarkMode();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Trigger load animation
    setTimeout(() => setIsLoaded(true), 100);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <section id="profile">
      <div className="profile-content-centered">
        {/* Availability Badge */}
        <div className="profile-availability-badge">
          <span className="profile-status-dot"></span>
          <span className="profile-status-text">Open to Opportunities</span>
        </div>

        {/* Main Heading with Blur Animation */}
        <div className={`profile-heading-wrapper ${isLoaded ? 'loaded' : ''}`}>
          <h1 className="profile-main-heading-part">
            Hi, I'm <span className="profile-name-highlight">Mayank Bhatgare</span>
          </h1>
        </div>

        {/* Description */}
        <p className={`profile-description ${isLoaded ? 'loaded' : ''}`}>
          a self taught <span className="profile-highlight">UI/UX Designer</span> and <span className="profile-highlight">Frontend developer</span> turning the internet into less confusing...
        </p>

        {/* Social Icons Row */}


        {/* Let's Connect Button */}
        <button
          className="profile-connect-button"
          onClick={() => {
            document.getElementById("contact").scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Let's Connect
          <span className="profile-arrow-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 8H10M10 8L8 6M10 8L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {/* Date - Bottom Left */}
      <div className="date-display">
        {formatDate(currentTime)}
      </div>

      {/* Time - Bottom Right */}
      <div className="time-display">
        {formatTime(currentTime)}
      </div>
    </section>
  );
};

export default Profile;
