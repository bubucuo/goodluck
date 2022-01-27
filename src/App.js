import React, { useState } from "react";

export default function App(props) {
  const [name, setName] = useState("");

  const getLuck = () => {};

  return (
    <div className="app">
      <div className="name-box">
        <input
          className="name"
          type="text"
          value={name}
          placeholder="请输入姓名"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={getLuck}>查看运势</button>
      </div>

      <div className="canvas">
        <img src={"../public/imgs/fu.jpeg"} />
      </div>
    </div>
  );
}
