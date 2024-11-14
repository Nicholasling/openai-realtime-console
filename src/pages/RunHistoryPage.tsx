import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const response = await fetch('https://symmetrical-goldfish-95vr7r4rpp3vjq-3001.app.github.dev/api/runs');
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
    <div>
      <h1>Run History</h1>
      <ul>
        {runs.length > 0 ? (
          runs.map((run) => (
            <li key={run.id}>
              <strong>{run.runName}</strong> - Time: {run.time}, Distance: {run.distance.toFixed(2)} km, Pace: {run.pace} per km, Heart Rate: {run.heartrate} BPM, Heart Rate Zone: {run.heartratezone}
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
