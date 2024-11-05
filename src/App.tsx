// import React from 'react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConsolePage } from './pages/ConsolePage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar'; // Import the Navbar component

// Import workout-related components
import StartPage from './pages/StartPage'; // Create this page for start
import WorkoutPage from './pages/WorkoutPage'; // Create this page for workout
import RunHistoryPage from './pages/RunHistoryPage'; // Create this page for run history

import './App.scss';

function App() {
  return (
    <Router>
      <div data-component="App">
        <Navbar /> {/* Navbar is displayed on all pages */}
        <Routes>
          <Route path="/" element={<ConsolePage />} /> {/* Home page */}
          <Route path="/about" element={<AboutPage />} /> {/* About page */}
          <Route path="/start" element={<StartPage />} /> {/* Start page */}
          <Route path="/workout" element={<WorkoutPage />} /> {/* Workout page */}
          <Route path="/run-history" element={<RunHistoryPage />} /> {/* Run History page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
