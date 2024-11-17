// src/pages/AboutPage.tsx
import React from 'react';
import './AboutPage.css'; // Updated CSS file for styling
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>Train Smarter, Not Harder with RunBuddy</h1>
        <h2><em>Your ultimate running companion, guiding every stride with purpose and precision.</em></h2>
      </header>

      <section className="about-content">
        <p>
          At <span className="highlight">RunBuddy</span>, we empower runners to unlock their full potential with smarter, more efficient training. Every stride is meaningful, and every heartbeat fuels progress.
        </p>

        <div className="about-values">
          <h3>Our Values:</h3>
          <ul>
            <li><strong>Efficiency:</strong> Maximize every run with real-time guidance.</li>
            <li><strong>Safety:</strong> Train smart and stay injury-free.</li>
            <li><strong>Joy:</strong> Celebrate every milestone and rediscover the fun in running.</li>
          </ul>
        </div>
      </section>

      <footer className="about-footer">
        <Link to="/start" className="cta-button">Let’s Run the Future Together</Link>
      </footer>
    </div>
  );
};

export default AboutPage;
