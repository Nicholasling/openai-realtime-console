import React, { useEffect, useState } from 'react';

// Define the structure of a run object
interface Run {
  name: string;
  time: number; // Time in minutes
  distance: number; // Distance in kilometers
  heartRateZone: string; // Heart Rate Zone (e.g., "Zone 3")
}

const RunHistoryPage = () => {
  const [runHistory, setRunHistory] = useState<Run[]>([]); // Array of Run objects

  useEffect(() => {
    const savedRuns = JSON.parse(localStorage.getItem('workouts') || '[]');
    setRunHistory(savedRuns);
  }, []);

  return (
    <div>
      <h3>Your Run History</h3>
      <ul>
        {runHistory.map((run, index) => (
          <li key={index}>
            <h4>{run.name}</h4>
            <p>Time: {run.time} minutes</p>
            <p>Distance: {run.distance} km</p>
            <p>Heart Rate Zone: {run.heartRateZone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RunHistoryPage;
