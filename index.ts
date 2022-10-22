const readline = require("readline");
const util = require("util");
const rl = readline.createInterface({
  input: process.stdin,
  oninput: process.stdout,
});
const question = util.promisify(rl.question).bind(rl);
//当前的牙签
const arr = [3, 5, 7];
//玩家
const play: ["playA", "playB"] = ["playA", "playB"];
//当前玩家
let nowPlay: "playA" | "playB" = play[0];
//检查当前是否输了
function checkDefeated(arr: number[]) {
  return arr.some((item) => item > 0);
}
//拿牙签
function take(row: number, num: number) {
  if (Number.isNaN(row) || Number.isNaN(num)) {
    throw "输入错误,请输入正确的数字";
  }
  if (arr[row] <= 0) {
    throw "这一行没有了";
  }
  if (arr[row] < num) {
    throw "超过了这行剩余的数量";
  }
  arr[row] -= num;
  if (!checkDefeated(arr)) {
    return "游戏结束";
  }
  return "游戏继续";
}
async function start() {
  //开始循环
  while (true) {
    console.log(`请输入${nowPlay}号玩家在第几行拿牙签`);
    const row = await question(`请输入${nowPlay}号玩家在第几行拿牙签`);
    console.log(`请输入${nowPlay}号玩家在第${row}行拿多少牙签`);
    const num = await question(`请输入${nowPlay}号玩家在第${row}行拿多少牙签`);
    try {
      const value = take(Number(row - 1), Number(num));
      if (value === "游戏结束") {
        console.log(`${nowPlay}号玩家,你输了`);
        break;
      }
    } catch (error) {
      console.log(error);
      continue;
    }
    nowPlay = nowPlay === "playA" ? "playB" : "playA";
  }
}

start();
