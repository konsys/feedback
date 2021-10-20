import React from "react";
import { TChildren } from "../../core/types";
import "./wrapper.less";

export default function Wrapper({ children }: TChildren) {
  return <div className="wrapper">{children}</div>;
}
