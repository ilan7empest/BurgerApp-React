import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axiosInstance from "../../axios-orders"
import { Spinner } from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"


const INGREDIENT_PRICE = {
    cheese: 0.4,
      meat: 1.5,
      salad: 1.1,
      bacon: 0.8
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,      
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
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

  handlePurchase = () => {
    this.setState({
        purchasing: true
      })
  }
  handleCloseModal = () => {
    this.setState({
      purchasing: false
    })
  }

  handleContinuePurchase = () => {
    this.setState({ loading: true });
    const Order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: "Test",
        address: {
          street: "My street 1"
        }
      },
      deliveryMethod: "Take Away" 
    }
    axiosInstance.post("/orders.json", Order).then(order => {
      this.setState({ loading: false, purchasing: false });
      console.log(order)
    }).catch(() => {
      this.setState({ loading: false, purchasing: false });
    })
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary = (
      <OrderSummary
            ingredients={this.state.ingredients}
            closeModal={this.handleCloseModal}
            continue={this.handleContinuePurchase}
            total={this.state.totalPrice} />
    )
    if (this.state.loading) {
      orderSummary =  <Spinner />
    }
    return (
      <Aux>
        <Modal isVisible={this.state.purchasing} closeModal={this.handleCloseModal}>
          {orderSummary}          
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.handleAddIngredient}
          removeIngredient={this.handleRemoveIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          isPurchase={this.state.purchasable}
          clickPurchase={this.handlePurchase} />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);
