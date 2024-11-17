import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from '../components/Map';
import './StartPage.css';

const StartScreen = () => {
    const navigate = useNavigate();
    const [initialCenter, setInitialCenter] = useState<[number, number]>([0, 0]);
    const [hasLocation, setHasLocation] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(true); // State to control the onboarding card

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setInitialCenter([latitude, longitude]);
                setHasLocation(true);
            },
            (error) => {
                console.error('Error fetching location:', error);
                setHasLocation(false);
            }
        );
    }, []);

    const handleDismissOnboarding = () => {
        setShowOnboarding(false); // Dismiss the onboarding card
    };

    const handleStart = () => {
        navigate('/workout');
    };

    return (
        <div className="start-screen-container">
            {showOnboarding && (
                <div className="onboarding-overlay">
                <div className="onboarding-card">
                  <img 
                    src="/onboard_run.svg" 
                    alt="Fitness Tracker Illustration" 
                    className="onboarding-image"
                  />
                  <h2>Train Smarter, Not Harder!</h2>
                  <ul className="onboarding-list">
                    <li>Run efficiently, build endurance.</li>
                    <li>Train safely and avoid overtraining.</li>
                    <li>Enjoy every step.</li>
                  </ul>
                  <button className="onboarding-button" onClick={handleDismissOnboarding}>
                    I’m Ready to Run!
                  </button>
                </div>
              </div>
              
            )}
            {hasLocation ? (
                <>
                    {/* Apply the full-screen map styling to the wrapper div */}
                    
                        <div className="full-screen-map">
                            <Map initialCenter={initialCenter} />
                        </div>
                        <div className="button-overlay">
                            <button className="start-button" onClick={handleStart}>
                                Start run
                            </button>
                            <div className="goal">Set a goal</div>
                            <div className="voice">Voice</div>
                        </div>
                    
                </>
            ) : (
                <p>Fetching your location...</p>
            )}
        </div>
    );
};

export default StartScreen;
