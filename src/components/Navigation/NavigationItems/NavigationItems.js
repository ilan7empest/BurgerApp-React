import React from 'react';

const navItems = (props) => (
    <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <a className={"nav-link " + (props.active ? "active" : "")} href="/">Active</a>
        </li>
    </ul>
)

export default navItems