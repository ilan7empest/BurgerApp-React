import React from 'react';
import classes from "./BuildControl.css"

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.More} onClick={props.add}>+</button>
            <button className={classes.Less} onClick={props.remove} disabled={props.disabled}>-</button>
        </div>
    )
}

export default buildControl