// 下の文を書くときのキーの動き（2026-10-27）。つなぎ（wokoto/src/editor.ts）と同じ決まりにそろえる。
//   Tab：タブを1つ入れる（をこと の字下げはタブ。スペースだと間違いになる）。行を選んでいれば、その行の頭に1つずつ。
//   Shift+Tab：行の頭のタブを1つ消す。
//   Enter：前の行と同じ数のタブを入れて改行する。「：」で終わる行の次は、1つ多く入れる（まとまりの中身）。
//   Ctrl+/：行の頭の「# 」（コメント）を付け外しする。
// どれも、変えられるところの外なら、鍵（editor.ts の lockFilter）が取り消す。
// 画面（EditorView）がなくても使えるように、state と dispatch だけを受け取る（テストで確かめる）。

import { EditorSelection, type EditorState, type StateCommand } from "@codemirror/state";

// 改行したときに入れる文字。今の行の頭のタブと同じ数のタブ。カーソルより前が「：」で終わっていれば1つ多く。
export function newlineIndent(lineText: string, before: string): string {
  const tabs = /^\t*/.exec(lineText)?.[0] ?? "";
  const opens = /[:：]\s*$/.test(before);
  return `\n${tabs}${opens ? "\t" : ""}`;
}

export const insertNewline: StateCommand = ({ state, dispatch }) => {
  const transaction = state.changeByRange((range) => {
    const line = state.doc.lineAt(range.from);
    const insert = newlineIndent(line.text, line.text.slice(0, range.from - line.from));
    return { changes: { from: range.from, to: range.to, insert }, range: EditorSelection.cursor(range.from + insert.length) };
  });
  dispatch(state.update(transaction, { scrollIntoView: true, userEvent: "input" }));
  return true;
};

// 選んでいる範囲がかかっている行（重ならないように並べる）。
function selectedLines(state: EditorState) {
  const lines = new Map<number, { from: number; text: string }>();
  for (const range of state.selection.ranges) {
    const first = state.doc.lineAt(range.from).number;
    const last = state.doc.lineAt(range.to).number;
    for (let n = first; n <= last; n++) {
      const line = state.doc.line(n);
      lines.set(n, { from: line.from, text: line.text });
    }
  }
  return [...lines.values()];
}

export const insertTab: StateCommand = ({ state, dispatch }) => {
  if (state.selection.ranges.every((range) => range.empty)) {
    dispatch(state.update(state.replaceSelection("\t"), { scrollIntoView: true, userEvent: "input" }));
    return true;
  }
  const changes = selectedLines(state).map((line) => ({ from: line.from, insert: "\t" }));
  dispatch(state.update({ changes, userEvent: "input.indent" }));
  return true;
};

export const removeTab: StateCommand = ({ state, dispatch }) => {
  const changes = selectedLines(state)
    .filter((line) => line.text.startsWith("\t"))
    .map((line) => ({ from: line.from, to: line.from + 1 }));
  if (changes.length > 0) {
    dispatch(state.update({ changes, userEvent: "delete.dedent" }));
  }
  return true;
};

// 行の頭の「# 」を付け外しする。選んでいる行が全部コメントなら外し、そうでなければ付ける。字下げのタブの後ろに付ける。
export const toggleComment: StateCommand = ({ state, dispatch }) => {
  const lines = selectedLines(state).filter((line) => line.text.trim() !== "");
  if (lines.length === 0) {
    return true;
  }
  const commented = (text: string) => /^\t*#/.test(text);
  const remove = lines.every((line) => commented(line.text));
  const changes = lines.map((line) => {
    const indent = /^\t*/.exec(line.text)?.[0].length ?? 0;
    if (remove) {
      const mark = /^#\s?/.exec(line.text.slice(indent))?.[0].length ?? 1;
      return { from: line.from + indent, to: line.from + indent + mark };
    }
    return { from: line.from + indent, insert: "# " };
  });
  dispatch(state.update({ changes, userEvent: "input" }));
  return true;
};
