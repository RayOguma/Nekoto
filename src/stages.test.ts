import { expect, test } from "vitest";
import { chosenStage, openedPages, pageCount, playable, splitHints, STAGES, titleOf } from "./stages";

test("ファイル名から、見せる名前を作る", () => {
  expect(titleOf("01_ジャンプ.wokoto")).toBe("ジャンプ");
});

test("番号と 0（つづき）から、始めるステージを決める。まだ遊べないステージは選べない", () => {
  const cleared = new Set([0]);
  expect(chosenStage(2, cleared)).toBe(1);
  expect(chosenStage(3, cleared)).toBeNull();
  expect(chosenStage(3, cleared, true)).toBe(2);
  expect(chosenStage(0, cleared)).toBe(1);
  expect(chosenStage(0, new Set(STAGES.map((_, i) => i)))).toBe(STAGES.length - 1);
  expect(chosenStage(99, cleared)).toBeNull();
  expect(chosenStage(-1, cleared)).toBeNull();
  expect(chosenStage(null, cleared)).toBeNull();
});

test("遊べるのは、はじめ・クリアしたもの・クリアしたものの次", () => {
  const cleared = new Set([0, 1]);
  expect([0, 1, 2, 3].map((i) => playable(i, cleared))).toEqual([true, true, true, false]);
  expect(playable(3, cleared, true)).toBe(true);
});

test("ヒントの行を取り出し、文からは除く", () => {
  const { text, hints } = splitHints("a\n# ヒント2：にばんめ\n# ヒント1：いちばんめ\nb");
  expect(text).toBe("a\nb");
  expect(hints).toEqual(["いちばんめ", "にばんめ"]);
});

test("どのステージにもヒントが3つある", () => {
  for (const stage of STAGES) {
    expect(stage.hints, stage.file).toHaveLength(3);
  }
});

test("ページ：1〜10を全部クリアすると、2ページ目がひらく", () => {
  expect(pageCount()).toBe(2);
  const some = new Set([0, 1, 2]);
  expect(openedPages(some)).toBe(1);
  expect(openedPages(some, true)).toBe(2);
  const first = new Set(Array.from({ length: 10 }, (_, i) => i));
  expect(openedPages(first)).toBe(2);
});
