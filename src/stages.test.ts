import { expect, test } from "vitest";
import { chosenStage, stageList, STAGES, titleOf } from "./stages";

test("ファイル名から、見せる名前を作る", () => {
  expect(titleOf("01_ジャンプ.wokoto")).toBe("ジャンプ");
});

test("一覧の行と「つづき」から、始めるステージを決める", () => {
  const cleared = new Set([0]);
  const list = stageList(cleared);
  expect(list[0]).toBe("1. ジャンプ  ✔");
  expect(chosenStage(list[1], cleared)).toBe(1);
  expect(chosenStage("つづき", cleared)).toBe(1);
  expect(chosenStage("つづき", new Set(STAGES.map((_, i) => i)))).toBe(STAGES.length - 1);
  expect(chosenStage("ない行", cleared)).toBeNull();
});
