export function getLuckNum() {
  return Math.round(Math.random());
}

// blessing: string, keys: Array
function match(blessing, keys) {
  for (let i = 0; i < keys.length; i++) {
    if (blessing.indexOf(keys[i]) > -1) {
      return true;
    }
  }
  return false;
}

const defaultLuck = {
  destiny: "哇，新的一年，是你的人生巅峰哎，居然事事顺心如意，还能暴富！！！",
  classNames: ["gold-coins", "gold-coins2"],
};
export function getGoodLuck(blessing) {
  blessing += "";
  if (blessing.replaceAll(" ", "") === "") {
    return {
      destiny: "🤩许愿都这么懒，那就祝你明年在法律允许的范围内能不劳而获啦！",
      classNames: ["gold-coins", "gold-coins2"],
    };
  }
  let res = { destiny: "", classNames: [], mainStyle: "" };
  for (let i = 0; i < lucks.length; i++) {
    const { keys, destiny, classNames, mainStyle = "" } = lucks[i];
    if (match(blessing, keys)) {
      res.destiny += destiny;
      res.classNames = [...res.classNames, ...classNames];
      res.mainStyle = mainStyle;
    }
  }

  return res.classNames.length > -1 ? res : defaultLuck;
}

const lucks = [
  {
    keys: ["1", "脱单", "女朋友", "男朋友", "对象"],
    destiny:
      "🤩新的一年，快主动点，你的桃花正在加速度靠近你，千万不要再躲开了！",
    classNames: ["hua-bg", "taohuayun"],
    mainStyle: "main-pink",
  },
  {
    keys: ["富", "钱", "薪", "升职"],
    destiny: "💰新的一年，财神选中你了，赶紧想想买哪里的豪宅吧！",
    classNames: ["gold-coins"],
  },
  {
    keys: ["美"],
    destiny:
      "👧🏻生气，你都已经这么美了，还要美下去，仙女都要嫉妒了！新的一年，你还是好好健身吧，毕竟都这么美了",
    classNames: ["gold-coins"],
  },
  {
    keys: ["帅"],
    destiny:
      "👦🏻生气，吴彦祖都没你帅，你居然还不满足！新的一年，你还是好好健身吧，毕竟都这么帅了！",
    classNames: ["gold-coins"],
  },
  {
    keys: ["吃"],
    destiny:
      "🍚重庆火锅？东北烤肉？北京烤鸭？广东烧鹅？成都串串？河南胡辣汤？全部安排！！！",
    classNames: ["gold-coins"],
  },

  {
    keys: ["减肥", "健", "胖", "头发"],
    destiny: "健康最重要，新的一年，好好健身，每天坚持才有效果哦！！！",
    classNames: ["gold-coins"],
  },
];
