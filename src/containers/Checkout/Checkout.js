import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
  // state = {
  //   ingredients: {},
  //   price: 0,
  // };

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (const [key, value] of query) {
  //     if (key === 'price') {
  //       price = value;
  //     } else {
  //       ingredients[key] = +value;
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, price: price });
  // }

  cancelOrder = () => {
    this.props.history.goBack();
  };

  handleFinishPurchase = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    let summary = <Redirect to='/' />;
    if (this.props.ingr) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to='/Orders' />
      ) : null;
      summary = (
        <Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            cancel={this.cancelOrder}
            checkout={this.handleFinishPurchase}
            ingredients={this.props.ingr}
            price={this.props.price}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </Fragment>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    purchased: state.orderReducer.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
