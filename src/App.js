import React, { useState } from "react";
import classnames from "classnames";
import { getGoodLuck, getLuckNum } from "./utils";

const defaultState = {
  // loading为true代表铜钱在旋转
  loading: false,
  // 长度为5、默认值为0的数组，（0代表硬币反面，1代表正面）
  data: new Array(5).fill(0),
  luck: {
    // 算命的结果语
    destiny: "",
    // 一个class数组，标记不同命运的不同动画效果，具体的代码定义在index.css
    classNames: [],
    // 头图，如金钱豹
    banner: "",
  },
};

export default function App(props) {
  const [wish, setWish] = useState("");

  const [state, setState] = useState(defaultState);
  const getLuck = () => {
    let newState = { ...defaultState };
    if (state.loading) {
      newState.loading = false;
      // 获取五枚铜钱的正反面，玄机查看utils
      for (let i = 0; i < 5; i++) {
        newState.data[i] = getLuckNum();
      }
      newState.luck = getGoodLuck(wish);
    } else {
      newState.loading = true;
    }
    setState(newState);
  };

  const reset = () => {
    setState(defaultState);
  };

  return (
    <div className="app">
      <a
        className="like"
        href="https://juejin.cn/user/3878732755375742/posts"
        target="_blank"
      >
        不准不要赞
      </a>

      <div className="center">
        <input
          className="wish"
          type="text"
          value={wish}
          placeholder="说出你的愿望吧"
          onChange={(e) => {
            setWish(e.target.value);
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
