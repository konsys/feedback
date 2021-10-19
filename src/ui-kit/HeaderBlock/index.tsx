import { Space } from "antd";
import React from "react";
import { blue } from "@ant-design/colors";

export default function HeaderBlock() {
  console.log(blue); // ['#E6F7FF', '#BAE7FF', '#91D5FF', '#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766']
  return (
    <>
      <Space size="large">HeaderBlock HeaderBlock HeaderBlock</Space>
    </>
  );
}
