// 間違いを、画面に出す形（文と、文の中の位置）にそろえる。
// をこと の間違いは2種類：読み取りの間違い（ParseError。字下げ・かっこ・「」 など）と、意味の間違い（CheckError。全部まとめた CheckErrors もある）。
// どちらも、文の中の位置（start）を持つ。それ以外（遊んでいる途中の思わぬ間違い）は、位置なしで文だけ出す。

import { CheckError, CheckErrors, ParseError } from "wokoto";

export type Problem = { message: string; at: number | null };

export function problemsOf(error: unknown): Problem[] {
  if (error instanceof CheckErrors) {
    return error.all.map((each) => ({ message: each.message, at: each.start }));
  }
  if (error instanceof CheckError || error instanceof ParseError) {
    return [{ message: error.message, at: error.start }];
  }
  return [{ message: error instanceof Error ? error.message : String(error), at: null }];
}

// 文の中の位置から、行の番号（1から）。
export function lineOf(text: string, at: number): number {
  return text.slice(0, at).split("\n").length;
}
