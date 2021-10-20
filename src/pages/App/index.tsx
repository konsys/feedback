import React from "react";
import { Switch } from "react-router";
import Template from "../../ui-kit/Template";
import { BrowserRouter } from "react-router-dom";
import Routes from "../../routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Template headerComponents={2}>
          <Routes />
        </Template>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
