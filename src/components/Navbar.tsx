import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you'll add CSS here to style it similarly

const Navbar = () => {
  return (
    <nav className="navbar-container">
      {/* Logo Section */}
      <Link to="/" className="navbar-logo">
        <img src="/path-to-logo.png" alt="App Logo" />
      </Link>

      {/* Navigation Links */}
      <ul className="navbar-links">
        {/* <li><Link to="/">Home</Link></li> */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/run-history">Run History</Link></li>
      </ul>

      {/* Call to Action Button */}
      <Link to="/start" className="navbar-cta">Run</Link>
    </nav>
  );
};

export default Navbar;
