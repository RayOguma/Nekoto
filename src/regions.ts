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

// 畳める鍵のまとまり。見出しのコメント（「# 雲」など）の行から、空行の手前まで。
// 中が全部鍵の行で、をこと の文が1行以上あるときだけ（はじめの説明のような、コメントだけのまとまりは畳まない）。
// from は見出しの行の終わり、to はまとまりの最後の行の終わり。lines は畳む行の数。
export type Section = { title: string; from: number; to: number; lines: number };

export function lockedSections(text: string): Section[] {
  const regions = findRegions(text);
  const lines = text.split("\n");
  const starts: number[] = [];
  let at = 0;
  for (const line of lines) {
    starts.push(at);
    at += line.length + 1;
  }
  const isComment = (line: string) => line.trim().startsWith("#");
  const isMark = (line: string) => line.trim() === OPEN_MARK || line.trim() === CLOSE_MARK;
  const sections: Section[] = [];
  for (let i = 0; i < lines.length; i++) {
    const heading = lines[i];
    if (!isComment(heading) || isMark(heading) || (i > 0 && lines[i - 1].trim() !== "")) {
      continue;
    }
    // 見出しの次の行から、空行の手前まで。
    let last = i;
    while (last + 1 < lines.length && lines[last + 1].trim() !== "") {
      last += 1;
    }
    if (last === i) {
      continue;
    }
    const body = lines.slice(i + 1, last + 1);
    const from = starts[i] + heading.length;
    const to = starts[last] + lines[last].length;
    const touchesRegion = regions.some((region) => region.from <= to && from <= region.end) || body.some(isMark);
    if (touchesRegion || body.every(isComment)) {
      continue;
    }
    sections.push({ title: heading.trim().replace(/^#\s*/, ""), from, to, lines: body.length });
  }
  return sections;
}

// 設定の画面で変えられるところ：「〜 を ◯◯ に する。」の ◯◯（数やテーマの名前）。行ごとに1つ。
// 位置は文字の位置（from〜to）。
export function findValues(text: string): { from: number; to: number }[] {
  const values: { from: number; to: number }[] = [];
  let at = 0;
  for (const line of text.split("\n")) {
    const found = /^(?!\s*#).* を (\S+) に する。\s*$/.exec(line);
    if (found) {
      const from = at + found.index + found[0].lastIndexOf(` を ${found[1]} に する。`) + 3;
      values.push({ from, to: from + found[1].length });
    }
    at += line.length + 1;
  }
  return values;
}
