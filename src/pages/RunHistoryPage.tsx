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
  const [showAll, setShowAll] = useState(false); // State to toggle showing all cards

  const getZoneColor = (zone: string): string => {
    switch (zone) {
      case "Zone 1 (Warm-up)":
        return "#87CEEB"; // Light blue
      case "Zone 2 (Endurance)":
        return "#98FF98"; // Lime green
      case "Zone 3 (Cardio)":
        return "#FFEB3B"; // Yellow
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
        // const response = await fetch('https://glorious-space-guacamole-75q6v64xgqhwrqx-3001.app.github.dev/api/runs');
        const response = await fetch('https://openai-realtime-console-zxx5.onrender.com/api/runs');
        
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

  const displayedRuns = showAll ? runs : runs.slice(0, 3);

  return (
    <div className="run-history-container">
      <h1>Run History</h1>
      <ul className="run-list">
        {displayedRuns.length > 0 ? (
          displayedRuns.map((run) => (
            <li key={run.id} className="run-card">
              <p className="run-card-title">{run.runName}</p>
              <p className="run-card-details">
                <span className="metric-key">Time:</span> <span className="metric-value">{run.time}</span>
                <span className="metric-key">Distance:</span> <span className="metric-value">{run.distance.toFixed(2)} km</span>
                <span className="metric-key">Pace:</span> <span className="metric-value">{run.pace} per km</span>
                <span className="metric-key">Heart Rate:</span> <span className="metric-value">{run.heartrate} BPM</span>
              </p>
              <p
                className="heart-rate-zone-badge"
                style={{ backgroundColor: getZoneColor(run.heartratezone) }}
              >
                {run.heartratezone}
              </p>
            </li>
          ))
        ) : (
          <p>No runs recorded yet.</p>
        )}
      </ul>
      {runs.length > 3 && (
        <button
          className="toggle-button"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default RunHistoryPage;
