import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BuregrBuilder";

function App() {
  return (
    <Layout>
      <BurgerBuilder></BurgerBuilder>
    </Layout>
  );
}

export default App;
