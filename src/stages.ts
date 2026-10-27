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
