import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ConsolePage } from './pages/ConsolePage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar'; // Import the Navbar component

// Import workout-related components
import StartPage from './pages/StartPage';
import WorkoutPage from './pages/WorkoutPage';
import RunHistoryPage from './pages/RunHistoryPage';

import './App.scss';

function App() {
  // Get the current location using useLocation
  const location = useLocation();

  // Define the path(s) where you want to hide the Navbar
  const hideNavbarPaths = ['/start', '/workout']; // You can add more paths to hide the navbar on multiple pages

  return (
    <div data-component="App">
      {/* Conditionally render the Navbar only if the current path is not in hideNavbarPaths */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* <Route path="/" element={<ConsolePage />} /> Home page */}
        <Route path="/" element={<AboutPage />} /> {/* Home page */}

        <Route path="/about" element={<AboutPage />} /> {/* About page */}
        <Route path="/start" element={<StartPage />} /> {/* Start page */}
        <Route path="/workout" element={<WorkoutPage />} /> {/* Workout page */}
        <Route path="/run-history" element={<RunHistoryPage />} /> {/* Run History page */}
      </Routes>
    </div>
  );
}

// Wrap App in Router in the main entry point, e.g., index.js or a similar root file
const Main = () => (
  <Router>
    <App />
  </Router>
);

export default Main;
