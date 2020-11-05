import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from './store/_actions';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BuregrBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

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
          <Route path='/logout' component={Logout} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
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
