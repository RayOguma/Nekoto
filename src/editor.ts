// 下の文を書く部分（CodeMirror 6）。
// 変えられるところ（regions.ts）の中だけ打てて、ほかの行は読めるけれど変えられない。色分けは をこと の colorRanges。

import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { EditorSelection, EditorState, Prec, type Range, RangeSetBuilder, StateEffect, type StateCommand, StateField } from "@codemirror/state";
import {
  Decoration,
  type DecorationSet,
  drawSelection,
  EditorView,
  GutterMarker,
  gutter,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { codeFolding, foldEffect, foldGutter, foldService, indentUnit } from "@codemirror/language";
import { colorRanges } from "wokoto";
import { insertNewline, insertTab, removeTab, toggleComment } from "./editing";
import { CLOSE_MARK, findRegions, findValues, insideRegion, lockedSections, OPEN_MARK } from "./regions";

// 印の行（# ▼ 変えられる、# ▲ ここまで）の数。
function markCount(text: string): number {
  return text.split("\n").filter((line) => line.trim() === OPEN_MARK || line.trim() === CLOSE_MARK).length;
}

// 変えられるところの外を書き換えようとしたら、取り消す。
// 変えられるところの中でも、印の行を書き足したり消したりする書き換えは取り消す
// （印を打つと範囲が変わり、自分で書いた行に鍵がかかって、元に戻せなくなるため）。
export const lockFilter = EditorState.transactionFilter.of((tr) => {
  if (!tr.docChanged) {
    return tr;
  }
  const regions = findRegions(tr.startState.doc.toString());
  let ok = true;
  tr.changes.iterChanges((fromA, toA) => {
    if (!insideRegion(regions, fromA, toA)) {
      ok = false;
    }
  });
  if (ok && markCount(tr.newDoc.toString()) !== markCount(tr.startState.doc.toString())) {
    ok = false;
  }
  return ok ? tr : [];
});

// ---- 行の見た目：変えられる行、印の行、鍵の行 ----

const editableLine = Decoration.line({ class: "nk-editable" });
const markLine = Decoration.line({ class: "nk-mark" });
const lockedLine = Decoration.line({ class: "nk-locked" });

function lineDecorations(state: EditorState): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  const regions = findRegions(state.doc.toString());
  for (let n = 1; n <= state.doc.lines; n++) {
    const line = state.doc.line(n);
    const mark = line.text.trim();
    if (mark === OPEN_MARK || mark === CLOSE_MARK) {
      builder.add(line.from, line.from, markLine);
    } else if (regions.some((region) => region.from <= line.from && line.to <= region.end)) {
      builder.add(line.from, line.from, editableLine);
    } else {
      builder.add(line.from, line.from, lockedLine);
    }
  }
  return builder.finish();
}

const lineField = StateField.define<DecorationSet>({
  create: lineDecorations,
  update: (value, tr) => (tr.docChanged ? lineDecorations(tr.state) : value),
  provide: (field) => EditorView.decorations.from(field),
});

// ---- 役割の色分け ----

const setColors = StateEffect.define<Range<Decoration>[]>();
const COLOR_CLASSES: Record<string, string> = {
  主語: "nk-subject",
  対象: "nk-object",
  相手: "nk-partner",
  場所: "nk-place",
  "数量・値": "nk-amount",
  動作: "nk-action",
  条件の印: "nk-condition",
  コメント: "nk-comment",
};

const colorField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(value, tr) {
    let next = value.map(tr.changes);
    for (const effect of tr.effects) {
      if (effect.is(setColors)) {
        next = Decoration.set(effect.value, true);
      }
    }
    return next;
  },
  provide: (field) => EditorView.decorations.from(field),
});

// 色分けを付け直す。文が区切れないとき（書きかけ）は、前の色分けのまま。
function recolor(view: EditorView) {
  const text = view.state.doc.toString();
  const ranges = colorRanges(text);
  if (!ranges) {
    return;
  }
  const marks = ranges
    .filter((range) => range.start < range.end && range.end <= text.length && COLOR_CLASSES[range.kind])
    .map((range) => Decoration.mark({ class: COLOR_CLASSES[range.kind] }).range(range.start, range.end));
  view.dispatch({ effects: setColors.of(marks) });
}

// 色は、つなぎのテーマと同じ CSS の変数（main.ts が設定の文から書き込む）。
const theme = EditorView.theme({
  "&": { height: "100%", fontSize: "var(--editor-font-size)", backgroundColor: "var(--editor-background)", color: "var(--ui-text)" },
  ".cm-scroller": { fontFamily: '"BIZ UDGothic", "Cascadia Mono", "MS Gothic", monospace', lineHeight: "1.65" },
  ".cm-content": { padding: "10px 0", caretColor: "var(--editor-caret)" },
  ".cm-cursor": { borderLeftColor: "var(--editor-caret)", borderLeftWidth: "2px" },
  ".cm-gutters": { backgroundColor: "var(--editor-background)", color: "var(--editor-gutter)", border: "none" },
  ".cm-lineNumbers .cm-gutterElement": { padding: "0 10px 0 14px" },
  ".cm-activeLine": { backgroundColor: "var(--editor-active-line)" },
  ".cm-activeLineGutter": { backgroundColor: "transparent", color: "var(--ui-text)" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": { backgroundColor: "var(--ui-selected) !important" },
  // 鍵の行は少し薄く。変えられる行は、差し色の線と薄い地。
  ".nk-locked": { opacity: 0.55 },
  ".nk-editable": { backgroundColor: "color-mix(in srgb, var(--ui-highlight) 12%, transparent)", boxShadow: "inset 3px 0 0 var(--ui-highlight)" },
  ".nk-mark": { backgroundColor: "color-mix(in srgb, var(--ui-highlight) 22%, transparent)", boxShadow: "inset 3px 0 0 var(--ui-highlight)" },
  ".nk-mark .nk-comment": { color: "var(--ui-highlight)", fontStyle: "normal", fontWeight: "bold" },
  ".nk-pen": { color: "var(--ui-highlight)", padding: "0 4px" },
  ".nk-subject": { color: "var(--role-subject)" },
  ".nk-object": { color: "var(--role-object)" },
  ".nk-partner": { color: "var(--role-partner)" },
  ".nk-place": { color: "var(--role-place)" },
  ".nk-amount": { color: "var(--role-amount)" },
  ".nk-action": { color: "var(--role-action)" },
  ".nk-condition": { fontWeight: "bold", backgroundColor: "var(--ui-tint)", borderRadius: "3px" },
  ".nk-comment": { color: "var(--editor-comment)", fontStyle: "italic" },
  ".nk-folded": {
    marginLeft: "10px",
    padding: "0 8px",
    borderRadius: "999px",
    fontSize: "0.85em",
    color: "var(--ui-text-muted)",
    backgroundColor: "var(--ui-hover)",
    border: "1px solid var(--ui-border)",
    cursor: "pointer",
  },
  ".nk-fold-mark": { color: "var(--editor-gutter)", cursor: "pointer", padding: "0 2px" },
});

// 変えられる行の左に出す ✏ の印。
class PenMarker extends GutterMarker {
  toDOM() {
    const span = document.createElement("span");
    span.className = "nk-pen";
    span.textContent = "✏";
    return span;
  }
}
const pen = new PenMarker();
const penGutter = gutter({
  class: "nk-pen-gutter",
  markers(view) {
    const builder = new RangeSetBuilder<GutterMarker>();
    const regions = findRegions(view.state.doc.toString());
    for (let n = 1; n <= view.state.doc.lines; n++) {
      const line = view.state.doc.line(n);
      if (regions.some((region) => region.from <= line.from && line.to <= region.end)) {
        builder.add(line.from, line.from, pen);
      }
    }
    return builder.finish();
  },
  initialSpacer: () => pen,
});

// ---- 鍵のまとまりを畳む ----
// 見出しのコメント（「# 雲」など）の行で畳める。畳むと「🔒 12行」の札になり、押すと開く。

const sectionFolds = foldService.of((state, lineStart, lineEnd) => {
  const section = lockedSections(state.doc.toString()).find((each) => each.from === lineEnd);
  return section && lineStart <= section.from ? { from: section.from, to: section.to } : null;
});

const folding = codeFolding({
  preparePlaceholder: (state, range) => state.doc.lineAt(range.to).number - state.doc.lineAt(range.from).number,
  placeholderDOM(_view, onclick, lines: number) {
    const tag = document.createElement("span");
    tag.className = "nk-folded";
    tag.textContent = `🔒 ${lines}行`;
    tag.title = "押すと開く（書き換えられない行）";
    tag.onclick = onclick;
    return tag;
  },
});

const foldMarks = foldGutter({
  markerDOM(open) {
    const mark = document.createElement("span");
    mark.className = "nk-fold-mark";
    mark.textContent = open ? "▾" : "▸";
    return mark;
  },
});

// ---- 値だけ変えられる（設定の画面） ----
// 「〜 を ◯◯ に する。」の ◯◯ だけを打てる。値の範囲は書き換えに合わせて動かす（全部消しても、その場所に打ち直せる）。

type Span = { from: number; to: number };

export const valueSpans = StateField.define<Span[]>({
  create: (state) => findValues(state.doc.toString()),
  update(spans, tr) {
    if (!tr.docChanged) {
      return spans;
    }
    // 前の端に打った字も、後ろの端に打った字も、その値の中に入れる。
    return spans.map((span) => ({ from: tr.changes.mapPos(span.from, -1), to: tr.changes.mapPos(span.to, 1) }));
  },
});

export const valueFilter = EditorState.transactionFilter.of((tr) => {
  if (!tr.docChanged) {
    return tr;
  }
  const spans = tr.startState.field(valueSpans);
  let ok = true;
  tr.changes.iterChanges((fromA, toA, _fromB, _toB, inserted) => {
    // 値の中だけ。改行とタブは入れられない（1行に1つの決まりが崩れる・値が読めなくなるので）。
    if (!spans.some((span) => span.from <= fromA && toA <= span.to) || /[\n\t]/.test(inserted.toString())) {
      ok = false;
    }
  });
  return ok ? tr : [];
});

const valueMarks = EditorView.decorations.compute([valueSpans], (state) =>
  Decoration.set(
    state.field(valueSpans).filter((span) => span.from < span.to).map((span) => Decoration.mark({ class: "nk-value" }).range(span.from, span.to)),
    true,
  ),
);

const valueTheme = EditorView.theme({
  ".nk-value": {
    padding: "1px 6px",
    borderRadius: "6px",
    backgroundColor: "color-mix(in srgb, var(--ui-highlight) 18%, transparent)",
    border: "1px solid var(--ui-highlight)",
  },
});

// 設定の画面の Tab：次の値の枠へ（Shift+Tab で前の枠へ）。最後の次は最初に戻る。値の中は全部選ぶ（打つと置き換わる）。
export function moveToValue(forward: boolean): StateCommand {
  return ({ state, dispatch }) => {
    const spans = state.field(valueSpans, false) ?? [];
    if (spans.length === 0) {
      return true;
    }
    const head = state.selection.main.head;
    const before = spans.filter((span) => span.to < head).length - 1;
    const index = forward ? spans.findIndex((span) => span.from > head) : before;
    const target = index === -1 ? spans[forward ? 0 : spans.length - 1] : spans[index];
    dispatch(state.update({ selection: EditorSelection.range(target.from, target.to), scrollIntoView: true }));
    return true;
  };
}

// ステージの文のキー（editing.ts）。決まったキーより先に受け取る。
const stageKeys = Prec.highest(
  keymap.of([
    { key: "Enter", run: insertNewline },
    { key: "Tab", run: insertTab, shift: removeTab },
    { key: "Mod-/", run: toggleComment },
  ]),
);

// 設定の文のキー。Tab で値の枠を移る。Enter は何もしない（改行は入れられない）。
const settingsKeys = Prec.highest(
  keymap.of([
    { key: "Tab", run: moveToValue(true), shift: moveToValue(false) },
    { key: "Enter", run: () => true },
  ]),
);

// タブの見た目の幅（全角2文字ぶん。つなぎと同じ）。
const tabWidth = EditorView.contentAttributes.of({ style: "tab-size: 2em" });

// 文を書く部分の種類。ステージ（印で囲んだ行を変えられる）か、設定（値だけ変えられる）。
export type LockMode = "ステージ" | "設定";

export type CodeEditor = {
  // 文を入れ替える（鍵を気にしない）。
  load(text: string): void;
  text(): string;
  // 日本語の変換中か（変換中は始め直さない）。
  composing(): boolean;
  // その位置へカーソルを動かして見せる（問題の行を押したとき）。
  goTo(at: number): void;
};

// onChange は、遊ぶ人が文を書き換えたときに呼ぶ。
export function createCodeEditor(parent: HTMLElement, onChange: () => void, mode: LockMode = "ステージ"): CodeEditor {
  const locks =
    mode === "ステージ"
      ? [foldMarks, penGutter, sectionFolds, folding, lockFilter, lineField, stageKeys]
      : [valueSpans, valueFilter, valueMarks, valueTheme, settingsKeys];
  const extensions = [
    lineNumbers(),
    ...locks,
    highlightActiveLine(),
    highlightActiveLineGutter(),
    drawSelection(),
    history(),
    // をこと の字下げはタブ。決まったキーの「字下げ」もタブで入れる。
    indentUnit.of("\t"),
    EditorState.tabSize.of(4),
    tabWidth,
    keymap.of([...defaultKeymap, ...historyKeymap]),
    colorField,
    theme,
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        recolor(update.view);
        onChange();
      }
    }),
  ];
  const view = new EditorView({ parent, state: EditorState.create({ doc: "", extensions }) });
  return {
    load(text) {
      // 状態ごと作り直す（前のステージの「元に戻す」が残らないように）。作り直しは書き換えではないので、onChange は呼ばない。
      view.setState(EditorState.create({ doc: text, extensions }));
      recolor(view);
      if (mode !== "ステージ") {
        return;
      }
      // 鍵のまとまりを畳み、最初の変えられる行へ移る（下までスクロールしなくて済むように）。
      const first = findRegions(text)[0];
      view.dispatch({
        effects: [
          ...lockedSections(text).map((section) => foldEffect.of({ from: section.from, to: section.to })),
          ...(first ? [EditorView.scrollIntoView(first.from, { y: "center" })] : []),
        ],
        selection: first ? { anchor: first.from } : undefined,
      });
    },
    text: () => view.state.doc.toString(),
    composing: () => view.composing,
    goTo(at) {
      const pos = Math.min(at, view.state.doc.length);
      view.dispatch({ selection: { anchor: pos }, scrollIntoView: true });
      view.focus();
    },
  };
}
