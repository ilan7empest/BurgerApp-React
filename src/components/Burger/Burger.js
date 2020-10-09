import React from 'react';
import classes from "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = (props) => {
    let ingredientList = Object.keys(props.ingredients)// return an array ["cheese", "meat", "salad", "bacon"]
        .map((ingredientKey) => {
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient type={ingredientKey} key={ingredientKey + i} />
            })
    })
   
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientList}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger