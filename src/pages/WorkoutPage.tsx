import React, { useState, useEffect } from 'react';
// import { Map } from '../components/Map'; // Assuming you have this component
import { Button } from '../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import './WorkoutPage.css';

// import dotenv from 'dotenv';

// const dotenv = require('dotenv');
// dotenv.config();
// console.log(process.env.API_CALL_URL)


const API_CALL_URL: string =
  process.env.API_CALL_URL|| '';

const WorkoutPage = () => {
  const [time, setTime] = useState(0); // Timer for workout
  const [distance, setDistance] = useState(0); // Distance covered
  const [pace, setPace] = useState("");
  //const [heartrate, setHeartRate] = useState(0); // HeartRate  
  const [heartrate, setHeartRate] = useState(Math.floor(Math.random() * (85 - 75 + 1)) + 75);
  const [heartratezone, setHeartRateZone] = useState("");
  const [isPaused, setIsPaused] = useState(false); // Workout pause/resume
  const [initialCenter, setInitialCenter] = useState<[number, number]>([0, 0]); // Default to [0, 0] initially
  const [hasLocation, setHasLocation] = useState(false); // Track if location is fetched
  const [isStopDialogOpen, setStopDialogOpen] = useState(false); // Stop confirmation dialog state
  const [isNameDialogOpen, setNameDialogOpen] = useState(false); // Name dialog state
  const [runName, setRunName] = useState(""); // Name of the run

  const navigate = useNavigate();

  const heartratezonecalc = () => {
    const age = 50;
    const maxHeartRate = 220 - age;

    // Define each zone's range
    const zones = [
      { zone: "Zone 1 (Warm-up)", min: Math.round(maxHeartRate * 0.5), max: Math.round(maxHeartRate * 0.6) },
      { zone: "Zone 2 (Endurance)", min: Math.round(maxHeartRate * 0.6), max: Math.round(maxHeartRate * 0.7) },
      { zone: "Zone 3 (Cardio)", min: Math.round(maxHeartRate * 0.7), max: Math.round(maxHeartRate * 0.8) },
      { zone: "Zone 4 (Hard)", min: Math.round(maxHeartRate * 0.8), max: Math.round(maxHeartRate * 0.9) },
      { zone: "Zone 5 (Max Effort)", min: Math.round(maxHeartRate * 0.9), max: maxHeartRate },
    ];

    const currentZone = zones.find((z) => heartrate >= z.min && heartrate <= z.max);
    setHeartRateZone(currentZone ? currentZone.zone : "Not in range");
  };

  // **New effect to re-calculate heart rate zone whenever heartrate changes**
  useEffect(() => {
    heartratezonecalc();
  }, [heartrate]);

  // // Get the user's current location when the component mounts
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setInitialCenter([latitude, longitude]); // Set the initial center
  //       setHasLocation(true); // Location is successfully retrieved
  //     },
  //     (error) => {
  //       console.error('Error fetching location:', error);
  //       setHasLocation(false); // Location could not be retrieved
  //     }
  //   );
  // }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1); // Increment time every second
  
        setDistance((prevDistance) => {
          const newDistance = prevDistance + 0.003; // Increment distance
          // Update pace based on new distance and time
          if (newDistance > 0) {
            const paceInMinutes = (time / newDistance) / 60; // Calculate pace in minutes per km
            const minutes = Math.floor(paceInMinutes);
            const seconds = Math.round((paceInMinutes - minutes) * 60);
  
            // Ensure seconds are displayed as two digits
            const formattedSeconds = seconds === 60 ? '00' : seconds < 10 ? `0${seconds}` : seconds;
            setPace(`${minutes}'${formattedSeconds}''`);
          }
          return newDistance;
        });
  
        //**Added heart rate logic**
        setHeartRate((prevHeartRate) => {
          if (time <= 300) {
            return Math.min(prevHeartRate + Math.random() * 1.5, 120); // Warm-up to ~120 BPM
          } else if (time <= 1800) {
            return Math.min(Math.max(prevHeartRate + (Math.random() * 2 - 1), 130), 145); // Fluctuate around 130-145 BPM
          } else {
            return Math.max(prevHeartRate - Math.random() * 3, 90); // Cool-down phase
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [isPaused, distance, time]); // Add `distance` and `time` as dependencies
  

  const handlePause = () => {
    setIsPaused(true); // Pause the workout
  };

  const handleResume = () => {
    setIsPaused(false); // Resume the workout
  };

  const handleStop = () => {
    setStopDialogOpen(true); // Open the confirmation dialog
  };

  const handleConfirmStop = () => {
    setStopDialogOpen(false); // Close the stop confirmation dialog
    const defaultRunName = `Run_${new Date().toLocaleString()}`;
    setRunName(defaultRunName);
    setNameDialogOpen(true); // Open the naming dialog
  };

  const handleCancelStop = () => {
    setStopDialogOpen(false); // Close the stop confirmation dialog
  };

  const handleSaveRun = async () => {
    setNameDialogOpen(false); // Close the naming dialog

    try {
      const response = await fetch('https://symmetrical-goldfish-95vr7r4rpp3vjq-3001.app.github.dev/api/runs'
, {
      // const response = await fetch(API_CALL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          runName,
          time,
          distance,
          pace,
          heartrate,
          heartratezone
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save run');
      }

      console.log(`Run saved with name: ${runName}`); // Confirm the save
      navigate('/run-history'); // Navigate to RunHistoryPage
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      alert('An error occurred while saving your run.');
    }
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
        <p>Time:      {time} s</p>
        <p>Distance:  {distance.toFixed(2)} km</p>
        <p>Pace:      {pace} per km </p>
        <p>Heart Rate: {heartrate.toFixed(0)} BPM</p>
        <p>{heartratezone}</p>

        
        <div className="button-overlay">
          {/* Conditionally render buttons based on `isPaused` state */}
          {!isPaused ? (
            <Button onClick={handlePause} label="Pause" className="pause-button"/>
          ) : (
            <div>
              <Button onClick={handleResume} label="Resume" className="resume-button"/>
              <Button onClick={handleStop} label="Stop" className="stop-button"/>
            </div>
          )}
        </div>  
      </div>

      {/* Stop Confirmation Dialog */}
      <Dialog open={isStopDialogOpen} onClose={handleCancelStop}>
        <DialogTitle>Confirm Stop</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to stop the workout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelStop} label="No" />
          <Button onClick={handleConfirmStop} label="Yes" />
        </DialogActions>
      </Dialog>

      {/* Naming Dialog */}
      <Dialog open={isNameDialogOpen} onClose={() => setNameDialogOpen(false)}>
        <DialogTitle>Name Your Run</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a name for your run. If left blank, it will default to the current date and time.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Run Name"
            type="text"
            fullWidth
            value={runName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRunName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNameDialogOpen(false)} label="Cancel" />
          <Button onClick={handleSaveRun} label="Save" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkoutPage;
