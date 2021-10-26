import { Button, Card, Layout } from "antd";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../pages/User/model/store";
import ContentBlock from "../ContentBlock";
import Wrapper from "../Wrapper";

interface Props {
  isLoggedIn: boolean;
  children?: ReactNode;
}
export default function Template({ children, isLoggedIn }: Props) {
  return (
    <Wrapper>
      <Layout>
        <Card
          title={<Link to="/">Кости</Link>}
          style={{ height: "100%" }}
          extra={
            !isLoggedIn ? (
              <Link to="/login">Войти</Link>
            ) : (
              <Button onClick={() => logout()}>Выйти</Button>
            )
          }
        >
          <ContentBlock>{children}</ContentBlock>
        </Card>
      </Layout>
    </Wrapper>
  );
}
