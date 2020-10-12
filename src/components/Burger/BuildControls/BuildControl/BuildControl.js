import React from 'react';
import classes from "./BuildControl.css"
import Button from "../../../UI/Button/Button"

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            
            <Button class={classes.More} click={props.add}>+</Button>
            <Button class={classes.Less} click={props.remove} disabled={props.disabled}>-</Button>
        </div>
    )
}

export default buildControl