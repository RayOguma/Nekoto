// 下の文を書くときのキーの動き（Tab・Shift+Tab・Enter・Ctrl+/）と、鍵（変えられるところ）を、画面なしで確かめる。
import { indentUnit } from "@codemirror/language";
import { EditorSelection, EditorState, type StateCommand } from "@codemirror/state";
import { check, parse, tokenize } from "wokoto";
import { expect, test } from "vitest";
import { insertNewline, insertTab, removeTab, toggleComment } from "./editing";
import { lockFilter, moveToValue, valueFilter, valueSpans } from "./editor";
import { SETTINGS_TEXT, STAGES } from "./stages";

const stage = (file: string) => STAGES.find((each) => each.file === file)!.text;

// 文と、カーソル（または選ぶ範囲）を決めて、キーを押した後の文と、カーソルの位置を返す。
function press(doc: string, at: number | [number, number], command: StateCommand, extensions = [lockFilter, indentUnit.of("\t")]) {
  let state = EditorState.create({
    doc,
    selection: typeof at === "number" ? EditorSelection.cursor(at) : EditorSelection.range(at[0], at[1]),
    extensions,
  });
  command({ state, dispatch: (tr) => (state = tr.state) });
  return { text: state.doc.toString(), head: state.selection.main.head };
}

// 文を打つ（カーソルの位置に入れる）。
function type(doc: string, at: number, text: string) {
  return press(doc, at, ({ state, dispatch }) => {
    dispatch(state.update(state.replaceSelection(text)));
    return true;
  });
}

const readable = (text: string) => () => check(parse(tokenize(text), text));

test("Tab はタブを入れる（スペースではない）。書いたあとの文は、をこと で読める", () => {
  // ステージ3の変えられるところ（ずっと： の中身）で、行を足す。
  const source = stage("03_速さ.wokoto");
  const line = "\t右キー を 押している なら、ねこ を 右 に 2 だけ 動かす。";
  const end = source.indexOf(line) + line.length;
  const afterEnter = press(source, end, insertNewline);
  // Enter で、同じ深さ（タブ1つ）の行ができる。
  expect(afterEnter.text.slice(end, end + 2)).toBe("\n\t");
  const typed = type(afterEnter.text, afterEnter.head, "ねこ を 右 に 1 だけ 動かす。");
  expect(readable(typed.text)).not.toThrow();
});

test("Enter：「：」で終わる行の次は、1段深くなる", () => {
  const source = stage("01_ジャンプ.wokoto");
  const free = source.lastIndexOf("# ▼ 変えられる") + "# ▼ 変えられる\n".length;
  const typed = type(source, free, "ずっと：");
  const afterEnter = press(typed.text, typed.head, insertNewline);
  expect(afterEnter.text.slice(typed.head, typed.head + 2)).toBe("\n\t");
  const done = type(afterEnter.text, afterEnter.head, "ねこ を 右 に 1 だけ 動かす。");
  expect(readable(done.text)).not.toThrow();
});

test("Tab を押してから書いても、をこと で読める（スペースの字下げの間違いにならない）", () => {
  const source = stage("01_ジャンプ.wokoto");
  const free = source.lastIndexOf("# ▼ 変えられる") + "# ▼ 変えられる\n".length;
  let now = type(source, free, "ずっと：\n");
  now = press(now.text, now.head, insertTab);
  now = type(now.text, now.head, "ねこ を 右 に 1 だけ 動かす。");
  expect(readable(now.text)).not.toThrow();
});

test("Shift+Tab は、行の頭のタブを1つ消す", () => {
  const doc = "# ▼ 変えられる\n\t\tx を 1 に する。\n# ▲ ここまで";
  const result = press(doc, doc.indexOf("x"), removeTab);
  expect(result.text).toBe("# ▼ 変えられる\n\tx を 1 に する。\n# ▲ ここまで");
});

test("行を選んで Tab を押すと、選んだ行の頭に1つずつ入る", () => {
  const doc = "# ▼ 変えられる\na\nb\n# ▲ ここまで";
  const result = press(doc, [doc.indexOf("a"), doc.indexOf("b") + 1], insertTab);
  expect(result.text).toBe("# ▼ 変えられる\n\ta\n\tb\n# ▲ ここまで");
});

test("鍵の行では、Tab も Enter も取り消される", () => {
  const source = stage("01_ジャンプ.wokoto");
  const locked = source.indexOf("世界 の 大きさ");
  expect(press(source, locked, insertTab).text).toBe(source);
  expect(press(source, locked, insertNewline).text).toBe(source);
});

test("変えられるところに印（# ▲ ここまで など）を打つ書き換えは、取り消される", () => {
  const doc = "# ▼ 変えられる\nx を 1 に する。\n# ▲ ここまで\ny を 2 に する。";
  const at = doc.indexOf("x");
  expect(type(doc, at, "# ▲ ここまで\n").text).toBe(doc);
  expect(type(doc, at, "# ▼ 変えられる\n").text).toBe(doc);
  // ふつうのコメントは書ける。
  expect(type(doc, at, "# メモ\n").text).toBe("# ▼ 変えられる\n# メモ\nx を 1 に する。\n# ▲ ここまで\ny を 2 に する。");
});

test("Ctrl+/ で、行の頭の「# 」を付け外しする（字下げのタブの後ろ）", () => {
  const doc = "# ▼ 変えられる\n\tx を 1 に する。\n# ▲ ここまで";
  const on = press(doc, doc.indexOf("x"), toggleComment);
  expect(on.text).toBe("# ▼ 変えられる\n\t# x を 1 に する。\n# ▲ ここまで");
  const off = press(on.text, on.text.indexOf("x"), toggleComment);
  expect(off.text).toBe(doc);
});

test("設定の画面：Tab で次の値の枠へ。値の中にタブや改行は入らない", () => {
  const extensions = [valueSpans, valueFilter];
  const first = SETTINGS_TEXT.indexOf("テーマ を ") + "テーマ を ".length;
  const moved = press(SETTINGS_TEXT, 0, moveToValue(true), extensions);
  expect(moved.head).toBe(first + "夜".length);
  const tabbed = press(SETTINGS_TEXT, first, ({ state, dispatch }) => {
    dispatch(state.update(state.replaceSelection("\t")));
    return true;
  }, extensions);
  expect(tabbed.text).toBe(SETTINGS_TEXT);
});
