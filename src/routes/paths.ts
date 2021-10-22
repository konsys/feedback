import { RouteProps } from "react-router";
import Cube from "../pages/Cube";
import NotFound from "../pages/NotFound";
import TestCompomemt from "../pages/TestComponent";

export enum EPath {
  TEST_PATH = "TEST_PATH",
  CUBE = "CUBE",
  NOT_FOUND = "NOT_FOUND",
}

export const paths: Record<EPath, RouteProps> = {
  CUBE: {
    path: "/",
    exact: true,
    component: Cube,
  },
  TEST_PATH: {
    path: "/t",
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
