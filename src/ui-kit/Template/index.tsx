import { Layout } from "antd";
import React from "react";
import ContentBlock from "../ContentBlock";
import FooterBlock from "../FooterBlock";
import HeaderBlock from "../HeaderBlock";
import Wrapper from "../Wrapper";

const { Header, Footer, Content } = Layout;

export default function Template() {
  return (
    <Wrapper>
      <Layout>
        <Header>
          <HeaderBlock />
        </Header>

        <Content>
          <ContentBlock />
        </Content>

        <Footer>
          <FooterBlock />
        </Footer>
      </Layout>
    </Wrapper>
  );
}
