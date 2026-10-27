import { expect, test } from "vitest";
import { findRegions, insideRegion, lockedSections } from "./regions";

const text = ["ねこ という 丸 を 作る。", "# ▼ 変えられる", "ねこ の 大きさ を 40 に する。", "# ▲ ここまで", "旗 という 三角 を 作る。"].join("\n");

test("印に挟まれた行が、変えられる範囲になる", () => {
  const [region] = findRegions(text);
  expect(text.slice(region.from, region.end)).toBe("ねこ の 大きさ を 40 に する。");
});

test("範囲の中は変えられ、外や印の行は変えられない", () => {
  const regions = findRegions(text);
  const at = text.indexOf("40");
  expect(insideRegion(regions, at, at + 2)).toBe(true);
  // 最後の行の終わりに書き足す（改行を打つ）のはよい。
  expect(insideRegion(regions, regions[0].end, regions[0].end)).toBe(true);
  // 最後の改行を消すと、印の行とくっつくので、だめ。
  expect(insideRegion(regions, regions[0].end, regions[0].end + 1)).toBe(false);
  // 最初の行の頭で後ろへ消す（印の行の改行を消す）のは、だめ。
  expect(insideRegion(regions, regions[0].from - 1, regions[0].from)).toBe(false);
  expect(insideRegion(regions, 0, 2)).toBe(false);
});

test("いくつあってもよい。空の行1つでも範囲になる", () => {
  const two = ["# ▼ 変えられる", "", "# ▲ ここまで", "a", "# ▼ 変えられる", "b", "# ▲ ここまで"].join("\n");
  const regions = findRegions(two);
  expect(regions).toHaveLength(2);
  expect(regions[0].from).toBe(regions[0].end);
  expect(two.slice(regions[1].from, regions[1].end)).toBe("b");
});

test("閉じる印がなければ、文の終わりまで", () => {
  const open = "a\n# ▼ 変えられる\nb\nc";
  const [region] = findRegions(open);
  expect(open.slice(region.from, region.end)).toBe("b\nc");
});

test("鍵のまとまりは、見出しから空行の手前まで。変えられるところやコメントだけのまとまりは畳まない", () => {
  const text = [
    "# ステージ1",
    "# 説明の行",
    "",
    "# 世界",
    "世界 の 大きさ を 横 2400 縦 450 に する。",
    "カメラ は ねこ を 追う。",
    "",
    "# 雲",
    "# ▼ 変えられる",
    "雲 という 四角 を 作る。",
    "# ▲ ここまで",
  ].join("\n");
  const sections = lockedSections(text);
  expect(sections.map((each) => [each.title, each.lines])).toEqual([["世界", 2]]);
  expect(text.slice(sections[0].from, sections[0].to)).toBe("\n世界 の 大きさ を 横 2400 縦 450 に する。\nカメラ は ねこ を 追う。");
});
