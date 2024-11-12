
import React from 'react';

const RunHistory = () => {
  // For PoC, using mock data for saved runs
  const runs = [
    {
      id: 1,
      name: 'Pete_Run1',
      distance: 3.45,
      pace: 8.12,
      time: '15:67',
      heartRateZone: 'Zone 2',
      date: '2024-11-02',
    },
    {
      id: 2,
      name: 'Pete_Run2',
      distance: 2.45,
      pace: 7.12,
      time: '12:34',
      heartRateZone: 'Zone 3',
      date: '2024-11-04',
    },
  ];

  return (
    <div>
      <h2>Run History</h2>
      {runs.map((run) => (
        <div key={run.id}>
          <h3>{run.name}</h3>
          <p>Date: {run.date}</p>
          <p>Distance: {run.distance} km</p>
          <p>Pace: {run.pace} min/km</p>
          <p>Time: {run.time}</p>
          <p>Heart Rate Zone: {run.heartRateZone}</p>
        </div>
      ))}
    </div>
  );
};

export default RunHistory;
