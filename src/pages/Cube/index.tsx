import { useStore } from "effector-react";
import React, { useRef } from "react";
import { dices$ } from "./model/store";
import "./style.less";

export default function Cube() {
  const { dice1, dice2, dice3 } = useStore(dices$);

  const d1 = useRef<HTMLDivElement>(null);
  const d2 = useRef<HTMLDivElement>(null);
  const d3 = useRef<HTMLDivElement>(null);

  setTimeout(() => {
    const r1 = d1.current;
    r1 && (r1.className = `r${dice1} diceBody`);
    const r2 = d2.current;
    r2 && (r2.className = `r${dice2} diceBody`);
    const r3 = d3.current;
    r3 && (r3.className = `r${dice3} diceBody`);
  }, 0);
  return (
    <>
      <div className="dicesWrapper">
        {dice1 && (
          <div className="table-body-board-generators">
            <div className="dices">
              <div ref={d1} className={` diceBody`}>
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

              <div ref={d2} className={` diceBody`}>
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
              {dice3 && (
                <div ref={d3} className={` diceBody`}>
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
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
