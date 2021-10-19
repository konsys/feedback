import { Button, DatePicker, version } from "antd";
import React from "react";

export default function ContentBlock() {
  return (
    <>
      <div className="App">
        <h1>antd version: {version}</h1>
        <DatePicker />
        <Button type="primary" style={{ marginLeft: 8 }}>
          Primary Button
        </Button>
      </div>
    </>
  );
}
