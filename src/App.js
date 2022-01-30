import React, { useState } from "react";
import classnames from "classnames";
import { getGoodLuck, getLuckNum } from "./utils";

const defaultState = {
  loading: false,
  data: new Array(5).fill(0),
  luck: { classNames: "" },
};

export default function App(props) {
  const [name, setName] = useState("");

  const [state, setState] = useState(defaultState);
  const getLuck = () => {
    let newState = {};
    if (state.loading) {
      newState = {
        loading: false,
        data: [],
      };

      for (let i = 0; i < 5; i++) {
        newState.data.push(getLuckNum());
      }
      newState.luck = getGoodLuck(name);
    } else {
      newState = { loading: true, data: new Array(5).fill(0) };
    }
    console.log("news", newState); //sy-log
    setState(newState);
  };

  const reset = () => {
    setState(defaultState);
  };

  return (
    <div className="app">
      <div className="center">
        <input
          className="name"
          type="text"
          value={name}
          placeholder="说出你的愿望吧"
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              getLuck();
            }
          }}
        />
        <button onClick={getLuck}>
          {state.loading ? "查看结果" : "查看运势"}
        </button>
      </div>

      <div className="canvas">
        {state.data.map((item, index) => (
          <div
            key={index}
            className={classnames(state.loading && "coin-rotate", "coin")}
          >
            <div
              className={classnames(
                "coin0",
                !state.loading && item === 1 && "hide"
              )}
            ></div>
            <div
              className={classnames(
                "coin1",
                !state.loading && item === 0 && "hide"
              )}
            ></div>
          </div>
        ))}
      </div>

      {state.luck?.classNames != "" && !state.loading && (
        <div className={classnames("luck-bg center", state.luck?.mainStyle)}>
          {state.luck?.classNames &&
            state.luck?.classNames.map((item, index) => (
              <div
                key={index}
                className={classnames("luck", item, "center")}
              ></div>
            ))}

          <div
            className={classnames(state.luck.banner, "banner", "center")}
          ></div>
          <div className="blessing center">{state.luck?.destiny}</div>
          <button className="reset" onClick={reset}>
            一键重启
          </button>
        </div>
      )}
    </div>
  );
}
