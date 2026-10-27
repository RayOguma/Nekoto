// 下の文を書く部分（CodeMirror 6）。
// 変えられるところ（regions.ts）の中だけ打てて、ほかの行は読めるけれど変えられない。色分けは をこと の colorRanges。

import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { EditorState, type Range, RangeSetBuilder, StateEffect, StateField } from "@codemirror/state";
import { Decoration, type DecorationSet, EditorView, keymap, lineNumbers } from "@codemirror/view";
import { colorRanges } from "wokoto";
import { CLOSE_MARK, findRegions, insideRegion, OPEN_MARK } from "./regions";

// 変えられるところの外を書き換えようとしたら、取り消す。
const lockFilter = EditorState.transactionFilter.of((tr) => {
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

const theme = EditorView.theme({
  "&": { height: "100%", fontSize: "17px", backgroundColor: "#ffffff" },
  ".cm-content": { fontFamily: '"BIZ UDGothic", "MS Gothic", monospace', padding: "8px 0" },
  ".cm-gutters": { backgroundColor: "#faf6ef", color: "#b9a99a", border: "none" },
  ".nk-locked": { color: "#8c8c96" },
  ".nk-locked span": { opacity: 0.75 },
  ".nk-editable": { backgroundColor: "#fff6d6", boxShadow: "inset 4px 0 0 #f0a050" },
  ".nk-mark": { backgroundColor: "#ffe9b8", fontWeight: "bold" },
  ".nk-mark .nk-comment": { color: "#a0581a", fontStyle: "normal" },
  ".nk-subject": { color: "#c2620a" },
  ".nk-object": { color: "#2f8a3e" },
  ".nk-partner": { color: "#2a64c9" },
  ".nk-place": { color: "#8a3fc9" },
  ".nk-amount": { color: "#9a7400" },
  ".nk-action": { color: "#c8383a" },
  ".nk-condition": { fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.07)", borderRadius: "3px" },
  ".nk-comment": { color: "#7a8494", fontStyle: "italic" },
});

export type CodeEditor = {
  // 文を入れ替える（鍵を気にしない）。
  load(text: string): void;
  text(): string;
  // 日本語の変換中か（変換中は始め直さない）。
  composing(): boolean;
};

// onChange は、遊ぶ人が文を書き換えたときに呼ぶ。
export function createCodeEditor(parent: HTMLElement, onChange: () => void): CodeEditor {
  const extensions = [
    lineNumbers(),
    history(),
    keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
    lockFilter,
    lineField,
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
    },
    text: () => view.state.doc.toString(),
    composing: () => view.composing,
  };
}
