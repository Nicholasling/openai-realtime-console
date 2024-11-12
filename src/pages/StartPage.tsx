import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from '../components/Map';
import './StartPage.css';

const StartScreen = () => {
    const navigate = useNavigate();
    const [initialCenter, setInitialCenter] = useState<[number, number]>([0, 0]);
    const [hasLocation, setHasLocation] = useState(false);

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

    const handleStart = () => {
        navigate('/workout');
    };

    return (
        <div className="start-screen-container">
            {hasLocation ? (
                <>
                    {/* Apply the full-screen map styling to the wrapper div */}
                    
                        <div className="full-screen-map">
                            <Map initialCenter={initialCenter} />
                        </div>
                        <div className="button-overlay">
                            <button className="start-button" onClick={handleStart}>
                                Start
                            </button>
                            <div className="goal-text">Set a goal</div>
                        </div>
                    
                </>
            ) : (
                <p>Fetching your location...</p>
            )}
        </div>
    );
};

export default StartScreen;
