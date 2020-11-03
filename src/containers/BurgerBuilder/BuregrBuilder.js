import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/_actions/actionTypes';
import * as actionCreator from '../../store/_actions/';

const INGREDIENT_PRICE = {
  cheese: 0.4,
  meat: 1.5,
  salad: 1.1,
  bacon: 0.8,
};
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    this.props.handleFetchIngerients();
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients) //array of prop names ["cheese", "meat"]
      .map((igKey) => {
        return ingredients[igKey]; //array of values for each key
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  // handleAddIngredient = (type) => {
  //   const oldCount = this.props.ingr[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.props.ingr };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.props.totalPrice;
  //   const newPrice = priceAddition + oldPrice;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // handleRemoveIngredient = (type) => {
  //   const oldCount = this.props.ingr[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = { ...this.props.ingr };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduct = INGREDIENT_PRICE[type];
  //   const oldPrice = this.props.totalPrice;
  //   const newPrice = oldPrice - priceDeduct;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  handlePurchase = () => {
    if (this.props.isAuth) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };
  handleCloseModal = () => {
    this.setState({
      purchasing: false,
    });
  };

  handleContinuePurchase = () => {
    // let querySring = [];
    // for (let i in this.props.ingr) {
    //   querySring.push(
    //     encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingr[i]),
    //   );
    // }
    // querySring.push('price=' + this.props.totalPrice.toFixed(2));
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: `?${querySring.join('&')}`,
    // });
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ingr };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingr) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingr} />
          <BuildControls
            addIngredient={this.props.handleAddIngredient}
            removeIngredient={this.props.handleRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            isAuth={this.props.isAuth}
            isPurchase={this.updatePurchaseState(this.props.ingr)}
            clickPurchase={this.handlePurchase}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingr}
          closeModal={this.handleCloseModal}
          continue={this.handleContinuePurchase}
          total={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          isVisible={this.state.purchasing}
          closeModal={this.handleCloseModal}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    error: state.burgerReducer.error,
    isAuth: state.auth.tokenId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddIngredient: (name) =>
      dispatch(actionCreator.addIngredient(name, INGREDIENT_PRICE)),
    handleRemoveIngredient: (name) =>
      dispatch(actionCreator.removeIngredient(name, INGREDIENT_PRICE)),
    handleFetchIngerients: () => {
      dispatch(actionCreator.initIngredients());
    },
    onInitPurchase: () => dispatch(actionCreator.submitOrderInit()),
    onSetRedirectPath: (path) =>
      dispatch(actionCreator.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axiosInstance));
