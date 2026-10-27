import { expect, test } from "vitest";
import { chosenStage, STAGES, titleOf } from "./stages";

test("ファイル名から、見せる名前を作る", () => {
  expect(titleOf("01_ジャンプ.wokoto")).toBe("ジャンプ");
});

test("番号と 0（つづき）から、始めるステージを決める", () => {
  const cleared = new Set([0]);
  expect(chosenStage(2, cleared)).toBe(1);
  expect(chosenStage(0, cleared)).toBe(1);
  expect(chosenStage(0, new Set(STAGES.map((_, i) => i)))).toBe(STAGES.length - 1);
  expect(chosenStage(99, cleared)).toBeNull();
  expect(chosenStage(null, cleared)).toBeNull();
});
