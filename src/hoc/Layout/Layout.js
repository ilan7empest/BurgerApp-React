import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showMenu: false,
  };
  handleToggleMenu = () => {
    this.setState((state, _) => {
      return {
        showMenu: !state.showMenu,
      };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuth}
          show={this.state.showMenu}
          toggle={this.handleToggleMenu}
        />
        <main className='flex-grow-1 mt-2 container'>
          {this.props.children}
        </main>
        <footer>footer</footer>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.tokenId !== null,
  };
};

export default connect(mapStateToProps, null)(Layout);
