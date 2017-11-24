import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css'

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">Play</NavLink>
      <NavLink to="/scores">Scores</NavLink>
      <NavLink to="/images">Images</NavLink>
    </div>
  );
};

export default NavBar
