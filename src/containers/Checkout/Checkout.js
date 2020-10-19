import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const [key, value] of query) {
      if (key === 'price') {
        price = value;
      } else {
        ingredients[key] = +value;
      }
    }
    this.setState({ ingredients: ingredients, price: price });
  }

  cancelOrder = () => {
    this.props.history.goBack();
  };

  handleFinishPurchase = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <Fragment>
        <CheckoutSummary
          cancel={this.cancelOrder}
          checkout={this.handleFinishPurchase}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default Checkout;
