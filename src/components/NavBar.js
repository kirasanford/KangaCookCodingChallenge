import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link"> &#127968; Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/add" className="navbar-link"> &#129390; Add Recipe</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;