import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"

const INGREDIENT_PRICE = {
    cheese: 0.4,
      meat: 1.5,
      salad: 1.1,
      bacon: 0.8
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 0,
      meat: 0,
      salad: 0,
      bacon: 0
    },
    totalPrice: 4,
    purchasable: false
  }
  updatePurchaseState(ingredients)  {
    const sum = Object.keys(ingredients)//array of prop names ["cheese", "meat"]
      .map(igKey => {
      return ingredients[igKey]//array of values for each key 
      }).reduce((sum, el) => {
      return sum + el
      }, 0)
    this.setState({
      purchasable: sum > 0
    })
  }
  handleAddIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice
    const newPrice = priceAddition + oldPrice

    this.setState({
      ingredients : updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients)
  }
   handleRemoveIngredient = (type) => {
     const oldCount = this.state.ingredients[type];
     if (oldCount <= 0) {
       return;
     }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceDeduct = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice
     const newPrice = oldPrice - priceDeduct

    this.setState({
      ingredients : updatedIngredients,
      totalPrice: newPrice
    })
     this.updatePurchaseState(updatedIngredients)
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    return (
      <Aux>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.handleAddIngredient}
          removeIngredient={this.handleRemoveIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          isPurchase={this.state.purchasable}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
