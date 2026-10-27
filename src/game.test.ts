// ゲーム/ の をこと の文が、読めて動くか。ステージは、書き換える前はクリアできず、書き換えたらクリアできるか。
import { check, createGame, type GameState, parse, step, tokenize } from "wokoto";
import { expect, test } from "vitest";
import { STAGES } from "./stages";

const files = import.meta.glob<string>("../ゲーム/**/*.wokoto", { query: "?raw", import: "default", eager: true });
const menu = files["../ゲーム/画面/メニュー.wokoto"];

function gameOf(source: string): GameState {
  return createGame(check(parse(tokenize(source), source)));
}

for (const [path, source] of Object.entries(files)) {
  test(`読めて動く：${path.replace("../ゲーム/", "")}`, () => {
    const game = gameOf(source);
    for (let i = 0; i < 120; i++) {
      step(game, { keys: i % 30 === 0 ? ["スペース"] : [] });
    }
  });
}

// 右キーを押しっぱなしにして、スペースを 16 コマごとに押す。15 秒遊んで、クリアしたかを返す。
// jumpAt を渡したら、ねこの横がその範囲にいるときだけスペースを押す（穴の手前で跳ぶ）。
function cleared(source: string, jumpAt?: [number, number]): boolean {
  const game = gameOf(source);
  for (let i = 0; i < 900; i++) {
    const keys = ["右キー"];
    const cat = game.things.find((thing) => thing.kinds.includes("ねこ"));
    const x = cat?.x ?? 0;
    const want = jumpAt ? x >= jumpAt[0] && x <= jumpAt[1] : i % 16 < 2;
    if (want && i % 2 === 0) keys.push("スペース");
    step(game, { keys });
    if (game.variables.get("クリア") === true) return true;
  }
  return false;
}

// ステージごとの、書き換える前の文と、答えの一例。
const answers: Record<string, [string, string, [number, number]?]> = {
  "01_ジャンプ.wokoto": ["50 だけ", "200 だけ"],
  "02_向き.wokoto": ["右キー を 押している なら、ねこ を 左 に", "右キー を 押している なら、ねこ を 右 に"],
  "03_速さ.wokoto": ["右 に 2 だけ", "右 に 6 だけ", [800, 820]],
};

for (const stage of STAGES) {
  test(`書き換えたらクリアできる：${stage.file}`, () => {
    const answer = answers[stage.file];
    expect(answer, "答えの一例を answers に書く").toBeDefined();
    const [before, after, jumpAt] = answer;
    expect(stage.text).toContain(before);
    expect(cleared(stage.text, jumpAt)).toBe(false);
    expect(cleared(stage.text.replace(before, after), jumpAt)).toBe(true);
  });
}

test("メニュー：はじめるを押すと「遊ぶ」が「つづき」に、ステージを選ぶとその行になる", () => {
  const game = gameOf(menu);
  game.variables.set("ステージ一覧", ["1. ジャンプ", "2. 向き"]);
  step(game, { keys: [] });
  // はじめる は 横 100 縦 190（下から）、幅 260 高さ 52。クリックの位置は上から数える。
  step(game, { keys: [], clicks: [{ x: 230, y: 450 - 190 - 26 }] });
  expect(game.variables.get("遊ぶ")).toBe("つづき");
  game.variables.set("遊ぶ", null);
  // えらぶ（縦 125）を押して、ステージ選択へ。一覧は 横 50 縦 150、高さ 210。1行目を押す。
  step(game, { keys: [], clicks: [{ x: 230, y: 450 - 125 - 26 }] });
  step(game, { keys: [] });
  step(game, { keys: [], clicks: [{ x: 200, y: 450 - 150 - 210 + 20 }] });
  expect(game.variables.get("遊ぶ")).toBe("1. ジャンプ");
});
