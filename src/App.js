import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from './store/_actions';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BuregrBuilder';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.tokenId != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthState: () => dispatch(actionCreator.authCheckStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
