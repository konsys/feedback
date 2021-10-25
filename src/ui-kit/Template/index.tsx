import { Card, Layout } from "antd";
import React, { ReactNode } from "react";
import ContentBlock from "../ContentBlock";
import Wrapper from "../Wrapper";

interface Props {
  children?: ReactNode;
}
export default function Template({ children }: Props) {
  return (
    <Wrapper>
      <Layout>
        <Card
          title="Default size card"
          style={{ height: "100%" }}
          extra={<a href="/">More</a>}
        >
          <ContentBlock>{children}</ContentBlock>
        </Card>
      </Layout>
    </Wrapper>
  );
}
