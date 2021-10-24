import { Button } from "antd";
import { useStore } from "effector-react";
import React, { useRef } from "react";
import { Row, Col } from "antd";
import { dices$, rollDices } from "./model/store";
import "./position.less";
import "./diceDots.less";
import "./rotateDices.less";
import { OneDice } from "./components/OneDice";
import { TwoDice } from "./components/TwoDice";
import { ThreeDice } from "./components/ThreeDice";
import { FourDice } from "./components/FourDice";
import { FiveDice } from "./components/FiveDice";
import { SixDice } from "./components/SixDice";

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
        <Row>
          <Col className="gutter-row" span={6}></Col>
          <Col span={12}>
            <Row>
              <Col className="gutter-row" span={12}>
                <div ref={d1} className=" diceBody">
                  <OneDice />
                  <TwoDice />
                  <ThreeDice />
                  <FourDice />
                  <FiveDice />
                  <SixDice />
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div ref={d2} className=" diceBody">
                  <OneDice />
                  <TwoDice />
                  <ThreeDice />
                  <FourDice />
                  <FiveDice />
                  <SixDice />
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}></Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() => rollDices()}
              disabled={rolling}
              type="primary"
            >
              Roll
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
