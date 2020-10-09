import React from 'react';
import BuildControl from "./BuildControl/BuildControl"
import classes from "./BuildControls.css"

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    {label: "Bacon", type: "bacon"},
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(control => {
               return  <BuildControl label={control.label} type={control.type} key={control.label} />
           })}
        </div>
    )
}

export default buildControls