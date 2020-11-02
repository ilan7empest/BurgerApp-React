import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = (props) => (
  <Fragment>
    <ul className='navbar-nav mr-auto'>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/' exact>
          Burger Builder
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/Orders' exact>
          Orders
        </NavLink>
      </li>
      {/* <li className='nav-item'>
      <NavLink className='nav-link' to='/checkout' exact>
        Checkout
      </NavLink>
    </li> */}
    </ul>
    <ul className='navbar-nav'>
      <li className='nav-item'>
        {!props.isAuth ? (
          <NavLink to='/auth' className='nav-link'>
            Signup
          </NavLink>
        ) : (
          <NavLink to='/logout' className='nav-link'>
            Logout
          </NavLink>
        )}
      </li>
    </ul>
  </Fragment>
);

export default navItems;
