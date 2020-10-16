import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = (props) => (
  <ul className='navbar-nav mr-auto'>
    <li className='nav-item'>
      <NavLink className='nav-link' to='/' exact>
        Burger Builder
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='/orders' exact>
        Checkout
      </NavLink>
    </li>
  </ul>
);

export default navItems;
