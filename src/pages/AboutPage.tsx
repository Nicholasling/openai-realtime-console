// src/pages/AboutPage.tsx
import React from 'react';
import './AboutPage.css'; // Updated CSS file for styling
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>Train Smarter, Not Harder with RunBuddy</h1>
        {/* <h2><em>Your ultimate running companion, guiding every stride with purpose and precision.</em></h2> */}
      </header>

      <section className="about-content">
        {/* <p>
          At <span className="highlight">RunBuddy</span>, we empower runners to unlock their full potential with smarter, more efficient training. Every stride is meaningful, and every heartbeat fuels progress.
        </p> */}

        <div className="app-screen">
          <div className="content-section">
            <div className="content-card">
              <div className="card-inner">
                {/* <!-- Front side of the card --> */}
                <div className="card-front">
                  <img src="/heart-image.jpg" alt="Exercise" />
                  <div className="card-title">Heart Rate Zone</div>
                </div>
                {/* <!-- Back side of the card --> */}
                <div className="card-back">
                  <p>Training with heart rate zones <strong>tunes into your effort</strong> — whether you're building endurance, burning fat, or pushing your limits for speed!</p>
                </div>
              </div>
            </div>
            <div className="content-card">
              <div className="card-inner">
                <div className="card-front">
                  <img src="/pace-image.jpg" alt="Sleep" />
                  <div className="card-title">Pace</div>
                </div>
                <div className="card-back">
                  <p>Training with pace keeps you <strong>in control</strong> — run slow to go far, run fast to get strong, and find your rhythm to make every run count!</p>
                </div>
              </div>
            </div>
            <div className="content-card">
              <div className="card-inner">
                <div className="card-front">
                  <img src="/time-image.jpg" alt="Time" />
                  <div className="card-title">Time</div>
                </div>
                <div className="card-back">
                  <p>Training with time lets you focus on <strong>consistency</strong> - run for minutes, not miles, and watch your endurance grow!</p>
                </div>
              </div>
            </div>
            <div className="content-card">
              <div className="card-inner">
                <div className="card-front">
                  <img src="/cadence-image.jpg" alt="Cadence" />
                  <div className="card-title">Cadence</div>
                </div>
                <div className="card-back">
                  <p>Training with cadence is all about <strong>rhythm</strong> - keep those steps quick and light for a smoother, more efficient run!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <footer className="about-footer">
        <Link to="/start" className="cta-button">Let’s Run the Future Together</Link>
      </footer>
    </div>
  );
};

export default AboutPage;
