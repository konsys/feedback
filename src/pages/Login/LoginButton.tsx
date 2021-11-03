import { Button } from "antd";
import React from "react";
import queryString from "query-string";
import { useGate } from "effector-react";
import { LoginGate } from "./model/store";
import { VkOAuthParams } from "../../config/params";

export default function LoginButton() {
  const queryObj = queryString.parse(window.location.search);
  const code = queryObj.code ? queryObj.code.toString() : "";

  const handleRedirect = () => {
    const {
      client_id,
      display,
      redirect_uri,
      response_type,
      revoke,
      scope,
      v,
      oauthURL,
    } = VkOAuthParams;

    const params = {
      redirect_uri,
      client_id,
      scope,
      display,
      v,
      response_type,
      revoke,
    };
    const stringified = queryString.stringify(params);
    window.location.href = `${oauthURL}${stringified}`;
  };

  useGate(LoginGate, { code });

  const comp = (
    <>
      <Button type="primary" onClick={handleRedirect}>
        Войти через ВКонтакте
      </Button>
    </>
  );

  return <>{comp}</>;
}
