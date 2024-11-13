import React, { useEffect, useState } from 'react';

type Run = {
  id: number;
  runName: string;
  time: number;
  distance: number;
  heartrate: number;
};

const RunHistoryPage = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const response = await fetch('https://symmetrical-goldfish-95vr7r4rpp3vjq-3001.app.github.dev/api/runs');
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
              <strong>{run.runName}</strong> - Time: {run.time} seconds, Distance: {run.distance} km, Heart Rate: {run.heartrate} BPM
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
