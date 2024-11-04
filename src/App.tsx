import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConsolePage } from './pages/ConsolePage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar'; // Import the Navbar component
import './App.scss';

function App() {
  return (
    <Router>
      <div data-component="App">
        <Navbar /> {/* Navbar is displayed on all pages */}
        <Routes>
          <Route path="/" element={<ConsolePage />} /> {/* Home page */}
          <Route path="/about" element={<AboutPage />} /> {/* About page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
