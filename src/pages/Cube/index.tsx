import { Button } from "antd";
import { useStore } from "effector-react";
import React, { useRef } from "react";
import { Row, Col } from "antd";
import { dices$, rollDices } from "./model/store";
import "./position.less";
import "./diceDots.less";
import "./rotateDices.less";
import { Dice } from "./components/Dice";

export default function Dices() {
  const { dice1, dice2, rolling } = useStore(dices$);

  const d1 = useRef<HTMLDivElement>(null);
  const d2 = useRef<HTMLDivElement>(null);

  const r1 = d1.current;
  r1 && (r1.className = ` diceBody r${rolling ? "Rotating1" : dice1}`);
  const r2 = d2.current;
  r2 && (r2.className = ` diceBody  r${rolling ? "Rotating2" : dice2}`);

  return (
    <>
      <div className="dicesWrapper">
        <Row className="dices">
          <Col className="gutter-row dice" span={6} />
          <Col className="gutter-row dice" span={6}>
            <Dice ref={d1} />
          </Col>
          <Col className="gutter-row dice" span={6}>
            <Dice ref={d2} />
          </Col>
          <Col className="gutter-row dice" span={6} />
        </Row>
        <Row className="rollButton">
          <Col>
            <Button
              onClick={() => rollDices()}
              disabled={rolling}
              type="primary"
            >
              Вращать
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
