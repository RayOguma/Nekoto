// ゲーム/ の をこと の文が、読めて動くか。ステージは、書き換える前はクリアできず、書き換えたらクリアできるか。
import { check, createGame, type GameState, parse, readSettings, step, tokenize } from "wokoto";
import { expect, test } from "vitest";
import { SETTINGS_TEXT, STAGES } from "./stages";

const files = import.meta.glob<string>("../ゲーム/**/*.wokoto", { query: "?raw", import: "default", eager: true });
const menu = files["../ゲーム/画面/メニュー.wokoto"];

function gameOf(source: string): GameState {
  return createGame(check(parse(tokenize(source), source)));
}

// 設定の文はゲームではないので、下で別に確かめる。
for (const [path, source] of Object.entries(files).filter(([path]) => !path.endsWith("/設定.wokoto"))) {
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

test("メニュー：はじめるを押すと「遊ぶ」が 0（つづき）に、ステージの札を押すとその番号になる", () => {
  const game = gameOf(menu);
  game.variables.set("ステージ名", ["ジャンプ", "向き", "速さ"]);
  game.variables.set("クリアした", [true, false, false]);
  step(game, { keys: [] });
  // 画面の幅 800 なので真ん中は 400。はじめボタン は 横 250 縦 160（下から）、幅 300 高さ 60。クリックの位置は上から数える。
  step(game, { keys: [], clicks: [{ x: 400, y: 450 - 160 - 30 }] });
  expect(game.variables.get("遊ぶ")).toBe(0);
  game.variables.set("遊ぶ", null);
  // えらぶボタン（縦 90）を押して、ステージ選択へ。
  step(game, { keys: [], clicks: [{ x: 400, y: 450 - 90 - 30 }] });
  step(game, { keys: [] });
  // 札は 横 (400 - 335 + 列 * 140) 縦 255、大きさ 110。2枚目を押す。
  const cards = game.things.filter((thing) => thing.kinds.includes("札"));
  expect(cards).toHaveLength(3);
  expect(cards[0].image).toBe("札クリア.png");
  expect(cards[1].image).toBe("札.png");
  step(game, { keys: [], clicks: [{ x: 65 + 140 + 55, y: 450 - 255 - 55 }] });
  expect(game.variables.get("遊ぶ")).toBe(2);
});

test("設定の文が読める。はじめの音楽の音量は小さい", () => {
  const settings = readSettings(SETTINGS_TEXT);
  expect(settings.theme).toBe("夜");
  expect(settings.musicVolume).toBe(3);
  expect(settings.soundVolume).toBe(80);
});
