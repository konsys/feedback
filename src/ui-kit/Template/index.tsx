import { Avatar, Button, Card, Layout, Space } from "antd";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import LoginButton from "../../pages/Login";
import { logout } from "../../pages/User/model/store";
import { IUser } from "../../pages/User/model/types";

import ContentBlock from "../ContentBlock";
import Wrapper from "../Wrapper";

interface Props {
  user: IUser | null;
  children?: ReactNode;
}
export default function Template({ children, user }: Props) {
  return (
    <Wrapper>
      <Layout>
        <Card
          title={<Link to="/">Кости</Link>}
          style={{ height: "100%" }}
          extra={
            !user ? (
              <LoginButton />
            ) : (
              <>
                <Space>
                  <Avatar src={user.avatar} alt={user.name} />
                  <Button type="primary" onClick={() => logout()}>
                    Выйти
                  </Button>
                </Space>
              </>
            )
          }
        >
          <ContentBlock>{children}</ContentBlock>
        </Card>
      </Layout>
    </Wrapper>
  );
}
