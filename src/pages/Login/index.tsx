import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export default function Login() {
  const comp = (
    <>
      <Title level={4}>Вход</Title>
    </>
  );

  return <>{comp}</>;
}
