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

// 自動で遊ぶ係。右キーを押しっぱなしにして、スペースを 16 コマごとに押す。15 秒遊んで、クリアしたかを返す。
// jumps：ねこの横がこの範囲にいたら、必ず跳ぶ（穴の手前など）。quiet：この範囲では跳ばない（穴の手前で早く跳びすぎないように）。
type Bot = { jumps?: [number, number][]; quiet?: [number, number][] };

function cleared(source: string, bot: Bot = {}): boolean {
  const game = gameOf(source);
  const inside = (x: number, ranges: [number, number][] = []) => ranges.some(([from, to]) => x >= from && x <= to);
  for (let i = 0; i < 900; i++) {
    const keys = ["右キー"];
    const x = game.things.find((thing) => thing.kinds.includes("ねこ"))?.x ?? 0;
    const want = inside(x, bot.jumps) || (i % 16 < 2 && !inside(x, bot.quiet));
    if (want && i % 2 === 0) keys.push("スペース");
    step(game, { keys });
    if (game.variables.get("クリア") === true) return true;
  }
  return false;
}

// 自由に書けるところ（いちばん下の空の行）に、文を書き足す書き換え。
const FREE = "# ▼ 変えられる\n\n# ▲ ここまで\n";
const addLine = (line: string): [string, string] => [FREE, `# ▼ 変えられる\n${line}\n# ▲ ここまで\n`];
const MICE: [string, string] = ["ねこ が ねずみ に 触れたら、ねこ を 横 80 縦 80 に 動かす。", "ねこ が ねずみ に 触れたら、その ねずみ を 消す。"];
const RIGHT: [string, string] = ["右キー を 押している なら、ねこ を 左 に", "右キー を 押している なら、ねこ を 右 に"];

// ステージごとの、答えの一例（書き換える前と後の組を、いくつか）と、自動で遊ぶ係の決まり。
const answers: Record<string, { changes: [string, string][]; bot?: Bot; timeout?: number }> = {
  "01_ジャンプ.wokoto": { changes: [["50 だけ", "200 だけ"]] },
  "02_向き.wokoto": { changes: [RIGHT] },
  "03_速さ.wokoto": { changes: [["右 に 2 だけ", "右 に 6 だけ"]], bot: { jumps: [[800, 820]], quiet: [[500, 799]] } },
  "04_台.wokoto": { changes: [["100 だけ", "150 だけ"], addLine("ねこ は 台 に 乗る。")] },
  "05_ねずみ.wokoto": { changes: [["100 だけ", "200 だけ"], MICE] },
  "06_壁と穴.wokoto": { changes: [["100 だけ", "200 だけ"], ["右 に 2 だけ", "右 に 6 だけ"]], bot: { jumps: [[1360, 1380]], quiet: [[1050, 1359]] } },
  "07_がけ.wokoto": { changes: [RIGHT, ["1回 まで", "2回 まで"]], bot: { quiet: [[2000, 2400]] } },
  "08_鍵と扉.wokoto": { changes: [["100 だけ", "200 だけ"], addLine("ねこ が 鍵 に 触れたら、扉 を 消す。")] },
  "09_重い世界.wokoto": { changes: [["6000 だけ", "1500 だけ"], ["100 だけ", "200 だけ"], MICE], bot: { jumps: [[1520, 1540]], quiet: [[1250, 1519]] } },
  // 右キーの行は、向き（左 → 右）と速さ（2 → 6）の2か所を書き換える。どちらを先に書き換えても見つかるように、数だけ・向きだけで探す。
  "10_総まとめ.wokoto": {
    changes: [
      ["なら、ねこ を 左 に 2 だけ 動かす。\n\t左キー", "なら、ねこ を 右 に 2 だけ 動かす。\n\t左キー"],
      ["100 だけ", "200 だけ"],
      MICE,
      ["に 2 だけ 動かす。\n\t左キー", "に 6 だけ 動かす。\n\t左キー"],
    ],
    bot: { jumps: [[1520, 1540]], quiet: [[1250, 1519]] },
  },
  // ---- むずかしいステージ ----
  "11_トゲの天井.wokoto": {
    changes: [["400 だけ", "200 だけ"], ["右 に 2 だけ", "右 に 6 だけ"]],
    bot: { jumps: [[800, 820]], quiet: [[500, 799]] },
  },
  "12_せまいトンネル.wokoto": { changes: [["ねこ の 高さ を 56", "ねこ の 高さ を 40"], MICE] },
  "13_スイッチの橋.wokoto": {
    changes: [["橋 を 横 100", "橋 を 横 880"], ["縦 380 から 出す", "縦 40 から 出す"]],
    bot: { quiet: [[600, 720]] },
  },
  "14_エレベーター.wokoto": {
    changes: [["上の止まり を 150", "上の止まり を 280"], ["触れたら、動く を 偽", "触れたら、動く を 真"]],
    bot: { quiet: [[1000, 2400]] },
  },
  // 地面の魚を跳び越えないように、魚の近くでは跳ばない。
  "15_魚あつめ.wokoto": { changes: [["必要 を 3", "必要 を 2"], ["集めた + 0", "集めた + 1"]], bot: { quiet: [[260, 640], [760, 1140]] } },
  "16_向かい風.wokoto": { changes: [["左 に 6 だけ", "左 に 1 だけ"], MICE] },
  "17_落ちてくる岩.wokoto": {
    changes: [
      ["ねこ が 岩 に 触れたら、ねこ を 横 80 縦 80 に 動かす。", "ねこ が 岩 に 触れたら、その 岩 を 消す。"],
      ["右 に 2 だけ", "右 に 6 だけ"],
    ],
    bot: { jumps: [[1360, 1380]], quiet: [[1050, 1359]] },
  },
  "18_見えない床.wokoto": { changes: [addLine("ねこ は 見えない床 に 乗る。"), MICE] },
  "19_さかさま.wokoto": { changes: [["-1500 だけ", "1500 だけ"], ["5秒 ごと", "20秒 ごと"]] },
  "20_総まとめ2.wokoto": {
    timeout: 60000,
    changes: [["400 だけ", "200 だけ"], ["ねこ の 高さ を 56", "ねこ の 高さ を 40"], MICE, ["5秒 ごと", "20秒 ごと"]],
  },
};

const apply = (text: string, changes: [string, string][]) => changes.reduce((done, [before, after]) => done.replace(before, after), text);

for (const stage of STAGES) {
  test(`書き換えたらクリアできる：${stage.file}`, () => {
    const answer = answers[stage.file];
    expect(answer, "答えの一例を answers に書く").toBeDefined();
    for (const [before] of answer.changes) {
      expect(stage.text).toContain(before);
    }
    expect(cleared(stage.text, answer.bot), "書き換える前").toBe(false);
    expect(cleared(apply(stage.text, answer.changes), answer.bot), "全部書き換えた").toBe(true);
    // 2か所以上が要るステージは、1か所だけ書き換えても（答えの一例のうち1つを除いても）クリアできない。
    if (answer.changes.length >= 2) {
      answer.changes.forEach((_, skip) => {
        const partial = answer.changes.filter((__, i) => i !== skip);
        expect(cleared(apply(stage.text, partial), answer.bot), `${skip + 1}つ目を書き換えないと`).toBe(false);
      });
    }
  }, answers[stage.file]?.timeout ?? 20000);
}

// むずかしいステージ（11〜）は、ジャンプを高く・回数を多くするだけ（力押し）ではクリアできない。
for (const stage of STAGES.slice(10)) {
  test(`力押しだけではクリアできない：${stage.file}`, () => {
    const brute = stage.text.replace(/ねこ を \d+ だけ \d+回 まで ジャンプ させる。/, "ねこ を 1000 だけ 99回 まで ジャンプ させる。");
    expect(brute).not.toBe(stage.text);
    expect(cleared(brute)).toBe(false);
  });
}

// 大きすぎる値に書き換えても、ねこが世界の外へ出て消えず、ゲームが止まらない（左右の外に出たら、はじめの場所に戻る）。
const HUGE: [string, RegExp, string][] = [
  // 跳べる回数はそのまま（友達が見つけた書き換え。落ちてくるとき速すぎて、地面のすき間から抜け落ちていた）。
  ["ジャンプがとても高い", /ねこ を (-?\d+) だけ (\d+)回 まで ジャンプ させる。/, "ねこ を 10000 だけ $2回 まで ジャンプ させる。"],
  ["ジャンプがとても高く、何回も跳べる", /ねこ を (-?\d+) だけ (\d+)回 まで ジャンプ させる。/, "ねこ を 10000 だけ 99回 まで ジャンプ させる。"],
  ["右がとても速い", /右キー を 押している なら、ねこ を (右|左) に \d+ だけ 動かす。/, "右キー を 押している なら、ねこ を 右 に 10000 だけ 動かす。"],
  ["左がとても速い", /左キー を 押している なら、ねこ を (右|左) に \d+ だけ 動かす。/, "左キー を 押している なら、ねこ を 左 に 10000 だけ 動かす。"],
];
for (const stage of STAGES) {
  test(`大きすぎる値でも止まらない：${stage.file}`, () => {
    for (const [what, before, after] of HUGE) {
      const text = stage.text.replace(before, after);
      expect(text, what).not.toBe(stage.text);
      const game = gameOf(text);
      for (let i = 0; i < 900; i++) {
        const keys = [i < 600 ? "右キー" : "左キー"];
        if (i % 16 < 2) keys.push("スペース");
        expect(() => step(game, { keys }), `${what}（${i}コマ目）`).not.toThrow();
      }
    }
  });
}

test("メニュー：はじめるを押すと「遊ぶ」が 0（つづき）に、ステージの札を押すとその番号になる", () => {
  const game = gameOf(menu);
  game.variables.set("ステージ名", ["ジャンプ", "向き", "速さ"]);
  game.variables.set("クリアした", [true, false, false]);
  game.variables.set("遊べる", [true, true, false]);
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

test("設定の文が読める。はじめの音楽と効果音の音量は小さい", () => {
  const settings = readSettings(SETTINGS_TEXT);
  expect(settings.theme).toBe("夜");
  expect(settings.musicVolume).toBe(3);
  expect(settings.soundVolume).toBe(3);
});

test("メニュー：字の部品（副題・札の名前）が真ん中にそろう", () => {
  const game = gameOf(menu);
  game.variables.set("ステージ名", ["ジャンプ", "向き", "速さ"]);
  game.variables.set("クリアした", [false, false, false]);
  game.variables.set("遊べる", [true, false, false]);
  step(game, { keys: [] });
  const center = (thing: { x: number; width: number }) => thing.x + thing.width / 2;
  const subtitle = game.things.find((thing) => thing.kinds.includes("副題"))!;
  expect(Math.abs(center(subtitle) - 400)).toBeLessThan(1);
  step(game, { keys: [], clicks: [{ x: 400, y: 450 - 90 - 30 }] });
  step(game, { keys: [] });
  const cards = game.things.filter((thing) => thing.kinds.includes("札"));
  const names = game.things.filter((thing) => thing.kinds.includes("札名"));
  names.forEach((name, i) => expect(Math.abs(center(name) - center(cards[i]))).toBeLessThan(1));
});

test("メニュー：右下に音楽のクレジットが出る", () => {
  const game = gameOf(menu);
  step(game, { keys: [] });
  const credit = game.things.find((thing) => thing.kinds.includes("クレジット"))!;
  expect(credit.label).toContain("音楽：もみじばミュージック");
  expect(credit.label).toContain("音楽：魔王魂");
  expect(credit.x + credit.width).toBeLessThanOrEqual(800);
});

test("メニュー：まだ遊べない札には南京錠が出て、押しても -1（何もしない）", () => {
  const game = gameOf(menu);
  game.variables.set("ステージ名", ["ジャンプ", "向き", "速さ"]);
  game.variables.set("クリアした", [true, false, false]);
  game.variables.set("遊べる", [true, true, false]);
  step(game, { keys: [] });
  step(game, { keys: [], clicks: [{ x: 400, y: 450 - 90 - 30 }] });
  step(game, { keys: [] });
  expect(game.things.filter((thing) => thing.kinds.includes("錠"))).toHaveLength(1);
  // 3枚目（横 65 + 280）を押す。
  step(game, { keys: [], clicks: [{ x: 65 + 280 + 55, y: 450 - 255 - 55 }] });
  expect(game.variables.get("遊ぶ")).toBe(-1);
});

test("メニュー：ひらけたページがあると ▶ が出て、押すと次の10枚になる", () => {
  const game = gameOf(menu);
  const names = Array.from({ length: 20 }, (_, i) => `ステージ${i + 1}`);
  game.variables.set("ステージ名", names);
  game.variables.set("クリアした", names.map((_, i) => i < 10));
  game.variables.set("遊べる", names.map((_, i) => i <= 10));
  game.variables.set("ページ数", 2);
  game.variables.set("ひらけたページ", 2);
  step(game, { keys: [] });
  step(game, { keys: [], clicks: [{ x: 400, y: 450 - 90 - 30 }] });
  step(game, { keys: [] });
  const labels = () => game.things.filter((thing) => thing.kinds.includes("札")).map((thing) => thing.label);
  expect(labels()).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  const next = game.things.find((thing) => thing.kinds.includes("次へボタン"))!;
  expect(next.x).toBeGreaterThan(0);
  step(game, { keys: [], clicks: [{ x: next.x + 10, y: next.y + 10 }] });
  step(game, { keys: [] });
  expect(labels()).toEqual(["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]);
  expect(game.variables.get("ページ")).toBe(2);
  // ◀ を押すと、前の10枚に戻る（前へボタン が 次へボタン の仲間だったころは、両方が動いて戻れなかった）。
  const back = game.things.find((thing) => thing.kinds.includes("前へボタン"))!;
  expect(back.x).toBeGreaterThan(0);
  expect(back.x).toBeLessThan(800);
  step(game, { keys: [], clicks: [{ x: back.x + 10, y: back.y + 10 }] });
  step(game, { keys: [] });
  expect(labels()).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  expect(game.variables.get("ページ")).toBe(1);
});

test("メニュー：タイトルとステージ選択を行き来しても、飾りや矢印が消えない", () => {
  const game = gameOf(menu);
  const names = Array.from({ length: 20 }, (_, i) => `ステージ${i + 1}`);
  game.variables.set("ステージ名", names);
  game.variables.set("クリアした", names.map(() => false));
  game.variables.set("遊べる", names.map((_, i) => i === 0));
  game.variables.set("ページ数", 2);
  game.variables.set("ひらけたページ", 1);
  // その種類だけを数える（仲間は数えない）。
  const count = (kind: string) => game.things.filter((thing) => thing.kinds[0] === kind).length;
  step(game, { keys: [] });
  // ステージ選択へ（えらぶボタン）。
  step(game, { keys: [], clicks: [{ x: 400, y: 450 - 90 - 30 }] });
  for (let i = 0; i < 5; i++) step(game, { keys: [] });
  expect(count("次へボタン")).toBe(1);
  expect(count("前へボタン")).toBe(1);
  // ステージ選択では、飾りは画面の外。
  const cat = game.things.find((thing) => thing.kinds.includes("ねこ"))!;
  expect(cat.x).toBeGreaterThan(800);
  // もどる（横 250 縦 10、高さ 60）で、タイトルへ。
  step(game, { keys: [], clicks: [{ x: 400, y: 450 - 10 - 30 }] });
  for (let i = 0; i < 5; i++) step(game, { keys: [] });
  expect(count("ねこ")).toBe(1);
  expect(count("旗")).toBe(1);
  expect(game.things.find((thing) => thing.kinds.includes("ねこ"))!.x).toBeLessThan(800);
});
