import React, { useState, useEffect } from 'react';
// import { Map } from '../components/Map'; // Assuming you have this component
import { Button } from '../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import './WorkoutPage.css';

// not safe without using relay
// import OpenAI from 'openai'; // Import OpenAI library
// const openai = new OpenAI({
//   apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Set your API key from .env
// });
const LOCAL_RELAY_SERVER_URL: string = process.env.REACT_APP_LOCAL_RELAY_SERVER_URL || 'http://localhost:8081';

const WorkoutPage = () => {
  const [time, setTime] = useState(0); // Timer for workout
  const [distance, setDistance] = useState(0); // Distance covered
  const [pace, setPace] = useState("");
  const [heartrate, setHeartRate] = useState(Math.floor(Math.random() * (85 - 75 + 1)) + 75);
  const [heartratezone, setHeartRateZone] = useState("");
  const [isPaused, setIsPaused] = useState(false); // Workout pause/resume
  const [isStopDialogOpen, setStopDialogOpen] = useState(false); // Stop confirmation dialog state
  const [isNameDialogOpen, setNameDialogOpen] = useState(false); // Name dialog state
  const [runName, setRunName] = useState(""); // Name of the run

  const navigate = useNavigate();

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const heartratezonecalc = () => {
    const age = 60;
    const maxHeartRate = 220 - age;

    const zones = [
      { zone: "Zone 1 (Warm-up)", min: Math.round(maxHeartRate * 0.4), max: Math.round(maxHeartRate * 0.6) },
      { zone: "Zone 2 (Endurance)", min: Math.round(maxHeartRate * 0.6), max: Math.round(maxHeartRate * 0.7) },
      { zone: "Zone 3 (Cardio)", min: Math.round(maxHeartRate * 0.7), max: Math.round(maxHeartRate * 0.8) },
      { zone: "Zone 4 (Hard)", min: Math.round(maxHeartRate * 0.8), max: Math.round(maxHeartRate * 0.9) },
      { zone: "Zone 5 (Max Effort)", min: Math.round(maxHeartRate * 0.9), max: maxHeartRate },
    ];

    const currentZone = zones.find((z) => heartrate >= z.min && heartrate <= z.max);
    setHeartRateZone(currentZone ? currentZone.zone : "Not in range");
  };

  useEffect(() => {
    heartratezonecalc();
  }, [heartrate]);

  useEffect(() => {
    const fetchTTS = async () => {
      if (heartratezone) {
        try {
          const response = await fetch(`${LOCAL_RELAY_SERVER_URL}/audio/speech`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: "tts-1",
              voice: "alloy", // Specify the desired voice
              input: heartratezone,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch TTS audio');
          }

          const audioBuffer = await response.arrayBuffer();
          const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(blob);

          const audio = new Audio(audioUrl);
          audio.play();
        } catch (error) {
          console.error("Error generating TTS:", error);
        }
      }
    };

    fetchTTS();
  }, [heartratezone]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);

        setDistance((prevDistance) => {
          const newDistance = prevDistance + 0.003;
          if (newDistance > 0) {
            const paceInMinutes = time / (newDistance * 60);
            const minutes = Math.floor(paceInMinutes);
            const seconds = Math.round((paceInMinutes - minutes) * 60);
            const formattedSeconds = seconds === 60 ? '00' : seconds < 10 ? `0${seconds}` : seconds;
            setPace(`${minutes}'${formattedSeconds}''`);
          }
          return newDistance;
        });

        setHeartRate((prevHeartRate) => {
          const fluctuation = Math.random() * 10 - 3;
          let newHeartRate = prevHeartRate + fluctuation;

          if (time <= 300) {
            newHeartRate = Math.min(newHeartRate, 120);
          } else if (time <= 1800) {
            if (newHeartRate > 145) {
              newHeartRate = 145 - Math.random() * 5;
            } else if (newHeartRate < 130) {
              newHeartRate = 130 + Math.random() * 5;
            }
          } else {
            newHeartRate = Math.max(newHeartRate, 90);
          }

          return newHeartRate;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPaused, time]);

  const handlePause = () => setIsPaused(true);

  const handleResume = () => setIsPaused(false);

  const handleStop = () => setStopDialogOpen(true);

  const handleConfirmStop = () => {
    setStopDialogOpen(false);
    const defaultRunName = `Run_${new Date().toLocaleString()}`;
    setRunName(defaultRunName);
    setNameDialogOpen(true);
  };

  const handleCancelStop = () => setStopDialogOpen(false);

  const handleSaveRun = async () => {
    setNameDialogOpen(false);
  
    try {
      const response = await fetch("https://your-api-endpoint.com/api/runs", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          runName,
          time: formatTime(time),
          distance,
          pace,
          heartrate,
          heartratezone,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to save run');
  
      console.log(`Run saved with name: ${runName}`);
      navigate('/run-history');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      alert('An error occurred while saving your run.');
    }
  };
  

  return (
    <div>
      <h3>Workout Progress</h3>
      <div className="stats">
        <div>
          <p className="stats-bold">{formatTime(time)}</p>
          <p>Time</p>
        </div>
        <div>
          <p className="stats-bold">{distance.toFixed(2)}</p>
          <p>Distance (km)</p>
        </div>
        <div>
          <p className="stats-bold">{pace}</p>
          <p>Pace (per km)</p>
        </div>
      </div>
      <div>
        <p className="heartrate">{heartrate.toFixed(0)}</p>
        <p className="heartrate-unit">
          Heart Rate (BPM) <span className="heart-icon">❤️</span>
        </p>
        <p>{heartratezone}</p>
      </div>
      <div className="button-overlay">
        {!isPaused ? (
          <Button onClick={handlePause} label="Pause" />
        ) : (
          <>
            <Button onClick={handleResume} label="Resume" />
            <Button onClick={handleStop} label="Stop" />
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;
