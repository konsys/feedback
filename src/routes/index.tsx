import { ReactElement } from "react";
import { Route, Switch } from "react-router";
import { EPath, paths } from "./paths";

export default function Routes() {
  return <Switch>{getRoutes()}</Switch>;
}

const getRoutes = () => {
  const routes: ReactElement<EPath, string>[] = [];
  for (let k in paths) {
    routes.push(<Route key={k} {...paths[k as EPath]} />);
  }
  return routes;
};
