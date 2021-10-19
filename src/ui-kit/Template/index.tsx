import { Layout } from "antd";
import React from "react";
import Wrapper from "../Wrapper";

const { Header, Footer, Content } = Layout;

export default function Template() {
  return (
    <Wrapper>
      <Layout>
        <Header>Header</Header>

        <Content>Content</Content>

        <Footer>Footer</Footer>
      </Layout>
    </Wrapper>
  );
}
