import React from "react";
import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section" id="contact">
            <div className="footer-background-pattern"></div>

            <div className="footer-content">
                <div className="footer-top-message">
                    <p>Thank You For Scrolling this far!</p>
                </div>
                <div className="footer-main">
                    <div className="footer-left">
                        <h1 className="footer-name">
                            Mayank<br />Bhatgare
                        </h1>
                        <div className="footer-taglines">
                            <p>For the <span className="heart-icon">❤️</span> of design!</p>
                            <p>Working from wherever the Wi-Fi is strong <span className="earth-icon">🌍</span></p>
                        </div>

                        <p className="footer-made-with">
                            Made with love and a lot of coffee ☕
                        </p>

                        <div className="footer-copyright">
                            COPYRIGHT {currentYear} © MAYANK BHATGARE
                        </div>
                    </div>

                    <div className="footer-right">
                        <nav className="footer-nav">
                            <a href="https://www.linkedin.com/in/mayank-bhatgare/" target="_blank" rel="noopener noreferrer" className="footer-link">LINKEDIN</a>
                            <a href="https://github.com/mayankbhatgare10" target="_blank" rel="noopener noreferrer" className="footer-link">GITHUB</a>
                            <a href="https://www.instagram.com/imbhatgare_mb/" target="_blank" rel="noopener noreferrer" className="footer-link">INSTAGRAM</a>
                            <a href="https://flowcv.com/resume/2t6ojvqekoae" target="_blank" rel="noopener noreferrer" className="footer-link">RESUME</a>
                            <a href="mailto:bhatgare.mayank10@gmail.com" className="footer-link">EMAIL</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
