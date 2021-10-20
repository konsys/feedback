import { Layout } from "antd";
import React, { ReactNode } from "react";
import ContentBlock from "../ContentBlock";
import HeaderBlock from "../HeaderBlock";
import Wrapper from "../Wrapper";

const { Header, Content } = Layout;

interface Props {
  headerComponents: ReactNode;
  children?: ReactNode;
}
export default function Template({ headerComponents, children }: Props) {
  return (
    <Wrapper>
      <Layout>
        <Header>
          <HeaderBlock>{headerComponents}</HeaderBlock>
        </Header>

        <Content>
          <ContentBlock>{children}</ContentBlock>
        </Content>
      </Layout>
    </Wrapper>
  );
}
