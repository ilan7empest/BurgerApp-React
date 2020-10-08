import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Aux>
        <div>Burger</div>
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
