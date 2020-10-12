import React from 'react';

import burgerLogo from "../../assets/images/burger-logo.png"

const logo = (props) => (
    <img src={burgerLogo} alt={props.label} height="40" />
)

export default logo