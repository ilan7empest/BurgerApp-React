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
            <p className="text-center">Total Price: $<b>{props.price.toFixed(2)}</b></p>
            {controls.map(control => {
                return <BuildControl
                    label={control.label}
                    key={control.label}
                    add={() => props.addIngredient(control.type)}
                    remove={props.removeIngredient.bind(this, control.type)}
                    disabled={props.disabled[control.type]}/>
           })}
        </div>
    )
}

export default buildControls