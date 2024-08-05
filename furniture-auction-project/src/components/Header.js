import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <header>
    <ul className="main-nav">
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/create">Add Item</NavLink></li>
    </ul>    
  </header>
);

export default Header;