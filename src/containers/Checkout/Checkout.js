import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      salad: 1,
    },
  };
  cancelOrder = () => {
    this.props.history.goBack();
  };

  handleFinishPurchase = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <CheckoutSummary
        cancel={this.cancelOrder}
        checkout={this.handleFinishPurchase}
        ingredients={this.state.ingredients}
      />
    );
  }
}

export default Checkout;
