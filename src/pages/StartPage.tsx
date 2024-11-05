import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from '../components/Map'; // Assuming you already have this component
import './StartPage.css'; // Add a CSS file for styling

const StartScreen = () => {
    const navigate = useNavigate();
    const [initialCenter, setInitialCenter] = useState<[number, number]>([0, 0]); // Default to [0, 0] initially
    const [hasLocation, setHasLocation] = useState(false); // Track if location is fetched

    // Get the user's current location when the component mounts
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setInitialCenter([latitude, longitude]); // Set the initial center
                setHasLocation(true); // Location is successfully retrieved
            },
            (error) => {
                console.error('Error fetching location:', error);
                setHasLocation(false); // Location could not be retrieved
            }
        );
    }, []);

    const handleStart = () => {
        // Start the workout
        navigate('/workout');
    };

    return (
        <div className="start-screen-container">
            {hasLocation ? (
                <div className="map-container">
                    <Map initialCenter={initialCenter} style={{ height: '100%', width: '100%' }} /> 
                    {/* Button over the map */}
                    <button className="start-button" onClick={handleStart}>
                        Start
                    </button>
                    <div className="goal-text">
                        Set a goal
                    </div>
                </div>
            ) : (
                <p>Fetching your location...</p>
            )}
        </div>
    );
};

export default StartScreen;
