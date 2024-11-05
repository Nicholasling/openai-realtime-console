import React, { useState, useEffect } from 'react';
//import { Map } from '../components/Map'; // Assuming you already have this component
import { Button } from '../components/button/Button';

const WorkoutPage = () => {
  const [time, setTime] = useState(0); // Timer for workout
  const [distance, setDistance] = useState(0); // Distance covered
  const [isPaused, setIsPaused] = useState(false); // Workout pause/resume
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1); // Increment time every second
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePause = () => {
    setIsPaused(!isPaused); // Toggle pause state
  };

  // const handleStop = () => {
  //   setIsPaused(true); // Stop the workout
  //   // Add logic to save the workout here
  // };

  const handleStop = () => {
    // Save workout and go to history screen
    history.push('/history');
  };

  return (
    <div>
      {/* Only render the map if the user's location has been retrieved
      {hasLocation ? (
        <Map initialCenter={initialCenter} /> // Pass the initialCenter prop to the Map
      ) : (
        <p>Fetching your location...</p> // Display a message while fetching location
      )} */}
      <div>
        <h3>Workout Progress</h3>
        <p>Time: {time} s</p>
        <p>Distance: {distance.toFixed(2)} km</p>
        <Button onClick={handlePause} label={isPaused ? 'Resume' : 'Pause'} />
        <Button onClick={handleStop} label="Stop" />
      </div>
    </div>
  );
};

export default WorkoutPage;
