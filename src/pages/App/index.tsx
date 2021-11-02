import React from "react";
import { Switch } from "react-router";
import Template from "../../ui-kit/Template";
import { BrowserRouter } from "react-router-dom";
import Routes from "../../routes";
import { useGate, useStore } from "effector-react";
import { ProfileGate, user$ } from "../User/model/store";

function App() {
  useGate(ProfileGate);
  const user = useStore(user$);
  return (
    <BrowserRouter>
      <Switch>
        <Template user={user}>
          <Routes />
        </Template>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
