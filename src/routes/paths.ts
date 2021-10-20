import { RouteProps } from "react-router";
import NotFound from "../pages/NotFound";
import TestCompomemt from "../pages/TestComponent";

export enum EPath {
  MANUFACTURERS = "MANUFACTURERS",
  NOT_FOUND = "NOT_FOUND",
}

export const paths: Record<EPath, RouteProps> = {
  MANUFACTURERS: {
    path: "/",
    exact: true,
    component: TestCompomemt,
  },
  NOT_FOUND: {
    path: "*",
    exact: false,
    component: NotFound,
  },
};

export const getRouteConfig = (id: EPath): RouteProps => paths[id];
