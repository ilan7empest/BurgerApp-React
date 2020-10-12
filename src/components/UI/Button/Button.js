import React from 'react';

const button = (props) => (
    <button
        onClick={props.click}
        className={props.class}
        type={props.type}
        disabled={props.disabled}
    >
        {props.children}
    </button>
)

export default button