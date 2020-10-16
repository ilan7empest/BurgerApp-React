import React, { Component } from 'react';
import Aux from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showMenu: false,
  };
  handleToggleMenu = () => {
    const show = this.state.showMenu;
    this.setState({ showMenu: !show });
  };
  render() {
    return (
      <Aux>
        <Toolbar show={this.state.showMenu} toggle={this.handleToggleMenu} />
        <main className='flex-grow-1 mt-2 container'>
          {this.props.children}
        </main>
        <footer>footer</footer>
      </Aux>
    );
  }
}

export default Layout;
