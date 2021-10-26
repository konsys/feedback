import React from "react";
import { Switch } from "react-router";
import Template from "../../ui-kit/Template";
import { BrowserRouter } from "react-router-dom";
import Routes from "../../routes";
import { useStore } from "effector-react";
import { user$ } from "../User/model/store";

function App() {
  const user = useStore(user$);
  return (
    <BrowserRouter>
      <Switch>
        <Template isLoggedIn={!!user?.name ?? false}>
          <Routes />
        </Template>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
