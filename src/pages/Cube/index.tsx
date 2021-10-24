import { Button } from "antd";
import { useStore } from "effector-react";
import React, { useRef } from "react";
import { dices$, rollDices } from "./model/store";
import "./style.less";
import "./diceDots.less";

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
      <Button onClick={() => rollDices()} disabled={rolling}>
        Roll
      </Button>
      <div className="dicesWrapper">
        <div className="dices">
          <div ref={d1} className=" diceBody">
            <div className="diceFace dice1">
              <div className="dot center" />
            </div>
            <div className="diceFace dice2">
              <div className="dot dtop dright" />
              <div className="dot dbottom dleft" />
            </div>
            <div className="diceFace dice3">
              <div className="dot dtop dright" />
              <div className="dot center" />
              <div className="dot dbottom dleft" />
            </div>
            <div className="diceFace dice4">
              <div className="dot dtop dleft" />
              <div className="dot dtop dright" />
              <div className="dot dbottom dleft" />
              <div className="dot dbottom dright" />
            </div>
            <div className="diceFace dice5">
              <div className="dot dtop dleft" />
              <div className="dot dtop dright" />
              <div className="dot center" />
              <div className="dot dbottom dleft" />
              <div className="dot dbottom dright" />
            </div>
            <div className="diceFace dice6">
              <div className="dot dtop dleft" />
              <div className="dot dtop dright" />
              <div className="dot dbottom dleft" />
              <div className="dot dbottom dright" />
              <div className="dot center dleft" />
              <div className="dot center dright" />
            </div>
          </div>

          <div ref={d2} className=" diceBody">
            <div className="diceFace dice1">
              <div className="dot center" />
            </div>
            <div className="diceFace dice2">
              <div className="dot dtop dright" />
              <div className="dot dbottom dleft" />
            </div>
            <div className="diceFace dice3">
              <div className="dot dtop dright" />
              <div className="dot center" />
              <div className="dot dbottom dleft" />
            </div>
            <div className="diceFace dice4">
              <div className="dot dtop dleft" />
              <div className="dot dtop dright" />
              <div className="dot dbottom dleft" />
              <div className="dot dbottom dright" />
            </div>
            <div className="diceFace dice5">
              <div className="dot dtop dleft" />
              <div className="dot dtop dright" />
              <div className="dot center" />
              <div className="dot dbottom dleft" />
              <div className="dot dbottom dright" />
            </div>
            <div className="diceFace dice6">
              <div className="dot dtop dleft" />
              <div className="dot dtop dright" />
              <div className="dot dbottom dleft" />
              <div className="dot dbottom dright" />
              <div className="dot center dleft" />
              <div className="dot center dright" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
