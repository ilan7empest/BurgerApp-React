import React from "react";
import Aux from "../../hoc/Auxiliary";

const layout = (props) => {
  return (
    <Aux>
      <div>header, sideDrawe, backdrop</div>
      <main className="flex-grow-1">{props.children}</main>
      <footer></footer>
    </Aux>
  );
};

export default layout;
