// ステージの一覧。ゲーム/ステージ/ の .wokoto を、ファイル名の順に並べる。
// ステージを足すときは、ファイルを1つ置くだけ（名前の頭の番号で順番が決まる）。

export type Stage = {
  // ファイル名（01_ジャンプ.wokoto）。セーブの見出しにも使う。
  file: string;
  // 見せる名前（ジャンプ）。ファイル名から番号と拡張子を除いたもの。
  title: string;
  // をこと の文（はじめの形）。
  text: string;
};

// Vite が、組み立てるときにファイルの中身を文字として入れる。
const files = import.meta.glob<string>("../ゲーム/ステージ/*.wokoto", { query: "?raw", import: "default", eager: true });

export const STAGES: Stage[] = Object.entries(files)
  .map(([path, text]) => {
    const file = path.split("/").pop()!;
    return { file, title: titleOf(file), text };
  })
  .sort((a, b) => a.file.localeCompare(b.file, "ja"));

// 「01_ジャンプ.wokoto」→「ジャンプ」。
export function titleOf(file: string): string {
  return file.replace(/\.wokoto$/, "").replace(/^\d+_/, "");
}

// メニュー（タイトルとステージ選択）の文。ゲーム/画面/メニュー.wokoto。
const screens = import.meta.glob<string>("../ゲーム/画面/*.wokoto", { query: "?raw", import: "default", eager: true });
export const MENU_TEXT = screens["../ゲーム/画面/メニュー.wokoto"] ?? "";

// メニューの一覧に出す、ステージの名前の並び（「1. ジャンプ ✔」）。cleared は、クリアしたステージの番号（0 から）。
export function stageList(cleared: ReadonlySet<number>): string[] {
  return STAGES.map((stage, index) => `${index + 1}. ${stage.title}${cleared.has(index) ? "  ✔" : ""}`);
}

// メニューで選んだもの（名前「遊ぶ」の値）を、始めるステージの番号にする。
// 「つづき」なら、まだクリアしていない最初のステージ（全部クリアしていれば最後）。一覧の行なら、その行の番号。
export function chosenStage(choice: string, cleared: ReadonlySet<number>): number | null {
  if (choice === "つづき") {
    const next = STAGES.findIndex((_, index) => !cleared.has(index));
    return next === -1 ? STAGES.length - 1 : next;
  }
  const index = stageList(cleared).indexOf(choice);
  return index === -1 ? null : index;
}
