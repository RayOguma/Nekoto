// 変えられるところ。ステージの文の中の、コメント「# ▼ 変えられる」と「# ▲ ここまで」に挟まれた行。
// をこと はコメントを読み飛ばすので、言語は変えずに、ねこと だけがこの印を読む。

export const OPEN_MARK = "# ▼ 変えられる";
export const CLOSE_MARK = "# ▲ ここまで";

// 変えられる範囲（文字の位置）。from は最初の行の頭、end は最後の行の終わり（改行の手前）。
// 書き換えは from から end までの中だけ（end の改行と、印の行は変えられない）。
export type Region = { from: number; end: number };

// 文から、変えられる範囲を前から順に探す。閉じる印がない「▼」は、文の終わりまで。
export function findRegions(text: string): Region[] {
  const regions: Region[] = [];
  let open: number | null = null;
  let at = 0;
  for (const line of text.split("\n")) {
    const lineEnd = at + line.length;
    const mark = line.trim();
    if (open === null && mark === OPEN_MARK) {
      open = lineEnd + 1;
    } else if (open !== null && mark === CLOSE_MARK) {
      // 印どうしが隣り合っていても、範囲は空のまま1つ数える（その場所に打てるように）。
      regions.push({ from: open, end: Math.max(open, at - 1) });
      open = null;
    }
    at = lineEnd + 1;
  }
  if (open !== null) {
    regions.push({ from: Math.min(open, text.length), end: text.length });
  }
  return regions;
}

// from〜to の書き換えが、どれか1つの変えられる範囲の中に収まっているか。
export function insideRegion(regions: Region[], from: number, to: number): boolean {
  return regions.some((region) => region.from <= from && to <= region.end);
}
