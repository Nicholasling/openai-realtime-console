// import React, { useEffect, useState } from 'react';

// // Define the structure of a run object
// interface Run {
//   name: string;
//   time: number; // Time in minutes
//   distance: number; // Distance in kilometers
//   heartRateZone: string; // Heart Rate Zone (e.g., "Zone 3")
// }

// const RunHistoryPage = () => {
//   const [runHistory, setRunHistory] = useState<Run[]>([]); // Array of Run objects

//   useEffect(() => {
//     const savedRuns = JSON.parse(localStorage.getItem('workouts') || '[]');
//     setRunHistory(savedRuns);
//   }, []);

//   return (
//     <div>
//       <h3>Your Run History</h3>
//       <ul>
//         {runHistory.map((run, index) => (
//           <li key={index}>
//             <h4>{run.name}</h4>
//             <p>Time: {run.time} minutes</p>
//             <p>Distance: {run.distance} km</p>
//             <p>Heart Rate Zone: {run.heartRateZone}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RunHistoryPage;


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
