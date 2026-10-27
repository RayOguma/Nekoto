import { expect, test } from "vitest";
import { clearSave, emptySave, loadSave, rememberText, SAVE_KEY, stageText, writeSave } from "./save";

// 試し用の Storage（覚えるだけ）。
function memory(): Storage {
  const items = new Map<string, string>();
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
    removeItem: (key) => void items.delete(key),
    clear: () => items.clear(),
    key: (index) => [...items.keys()][index] ?? null,
    get length() {
      return items.size;
    },
  };
}

test("残したものを、そのまま読める", () => {
  const storage = memory();
  const data = emptySave();
  data.cleared.push("01_ジャンプ.wokoto");
  rememberText(data, "01_ジャンプ.wokoto", "はじめ", "書き換えた");
  data.settings = "テーマ を 紙 に する。";
  expect(writeSave(storage, data)).toBe(true);
  expect(loadSave(storage)).toEqual(data);
});

test("ないときや壊れているときは、空のセーブ", () => {
  const storage = memory();
  expect(loadSave(storage)).toEqual(emptySave());
  storage.setItem(SAVE_KEY, "{こわれている");
  expect(loadSave(storage)).toEqual(emptySave());
});

test("はじめの文と同じに戻したら、覚えていた文を消す", () => {
  const data = emptySave();
  rememberText(data, "a", "はじめ", "書き換えた");
  rememberText(data, "a", "はじめ", "はじめ");
  expect(data.texts).toEqual({});
});

test("ステージのはじめの文が変わっていたら、残した文は使わない", () => {
  const data = emptySave();
  rememberText(data, "a", "古いはじめ", "書き換えた");
  expect(stageText(data, "a", "古いはじめ")).toBe("書き換えた");
  expect(stageText(data, "a", "新しいはじめ")).toBe("新しいはじめ");
});

test("セーブを消す", () => {
  const storage = memory();
  writeSave(storage, { ...emptySave(), settings: "x" });
  clearSave(storage);
  expect(loadSave(storage)).toEqual(emptySave());
});
