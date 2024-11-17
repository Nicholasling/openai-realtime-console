import React, { useEffect, useState } from 'react';
import './RunHistoryPage.css';

type Run = {
  id: number;
  runName: string;
  time: string;
  distance: number;
  pace: string;
  heartrate: number;
  heartratezone: string;
};

const RunHistoryPage = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getZoneColor = (zone: string): string => {
    switch (zone) {
      case "Zone 1 (Warm-up)":
        return "#87CEEB"; // Light blue
      case "Zone 2 (Endurance)":
        return "#98FF98"; // Lime green
      case "Zone 3 (Cardio)":
        return "#FFEB3B"; // yellow
      case "Zone 4 (Hard)":
        return "#FF7F50"; // Orange
      case "Zone 5 (Max Effort)":
        return "#E60000"; // Red
      default:
        return "#555"; // Gray for 'Not in range'
    }
  };
  
  useEffect(() => {
    const fetchRuns = async () => {
      try {
        // const response = await fetch('https://symmetrical-goldfish-95vr7r4rpp3vjq-3001.app.github.dev/api/runs');
        const response = await fetch('https://glorious-space-guacamole-75q6v64xgqhwrqx-3001.app.github.dev/api/runs');
        //const response = await fetch('https://openai-realtime-console-zxx5.onrender.com/api/runs');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Run[] = await response.json();
        setRuns(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, []);

  if (loading) {
    return <p>Loading run history...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="run-history-container">
      <h1>Run History</h1>
      <ul className="run-list">
        {runs.length > 0 ? (
          runs.map((run) => (
            <li key={run.id} className="run-card">
              {/* <strong>{run.runName}</strong> - Time: {run.time}, Distance: {run.distance.toFixed(2)} km, Pace: {run.pace} per km, Heart Rate: {run.heartrate} BPM, Heart Rate Zone: {run.heartratezone} */}
              <p className="run-card-title">{run.runName}</p>
              <p className="run-card-details">
                <span className="metric-key">Time:</span> <span className="metric-value">{run.time}  </span> 
                <span className="metric-key">Distance:</span> <span className="metric-value">{run.distance.toFixed(2)} km  </span> 
                <span className="metric-key">Pace:</span> <span className="metric-value">{run.pace} per km  </span> 
                <span className="metric-key">Heart Rate:</span> <span className="metric-value">{run.heartrate} BPM  </span> 
                {/* <span className="metric-key">Heart Rate Zone:</span> <span className="metric-value">{run.heartratezone}</span> */}
                <p className="heart-rate-zone-badge" style={{ backgroundColor: getZoneColor(run.heartratezone) }}>
                  {run.heartratezone}
                </p>
              </p>

            </li>
          ))
        ) : (
          <p>No runs recorded yet.</p>
        )}
      </ul>
    </div>
  );
};

export default RunHistoryPage;
