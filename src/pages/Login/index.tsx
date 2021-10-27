import { Button } from "antd";
import React from "react";
import queryString from "query-string";
import { useGate } from "effector-react";
import { LoginGate } from "./model/store";

export default function Login() {
  const queryObj = queryString.parse(window.location.search);
  const code = queryObj.code ? queryObj.code.toString() : "";

  const handleRedirect = () => {
    const params = {
      redirect_uri: "http://127.0.0.1:3000/login",
      client_id: 7731384,
      scope: "email",
      display: "popup",
      v: 5.126,
      response_type: "code",
      revoke: 1,
    };
    const stringified = queryString.stringify(params);
    window.location.href = `https://oauth.vk.com/authorize?${stringified}`;
  };

  useGate(LoginGate, { code });

  const comp = (
    <>
      <Button onClick={handleRedirect}>Войти через ВКонтакте</Button>
    </>
  );

  return <>{comp}</>;
}
