import React from 'react';
import BuildControl from "./BuildControl/BuildControl"
import classes from "./BuildControls.css"
import Button from "../../UI/Button/Button"

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
     {label: "Bacon", type: "bacon"},
    { label: "Meat", type: "meat" },

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
            <Button class={classes.OrderButton + " my-4"} click={props.clickPurchase} type="button" disabled={!props.isPurchase}>
                ORDER NOW
            </Button>
        </div>
    )
}

export default buildControls