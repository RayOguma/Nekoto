// セーブ。進み（クリアしたステージ）・ステージごとに書き換えた文・設定の文を、1つの見出しで残す。
// 残す場所は、渡された Storage（ふだんは localStorage）。画面のことは知らない。

export const SAVE_KEY = "nekoto:セーブ";

// ステージごとの書き換えた文。base は、書き換えたときのはじめの文（ゲームを更新してはじめの文が変わったら、使わない）。
export type SavedText = { base: string; text: string };

export type SaveData = {
  // クリアしたステージのファイル名（番号ではなく名前で残す。ステージを足しても、ずれないように）。
  cleared: string[];
  // ファイル名 → 書き換えた文。
  texts: Record<string, SavedText>;
  // 設定の文。null なら、はじめの設定。
  settings: string | null;
};

export function emptySave(): SaveData {
  return { cleared: [], texts: {}, settings: null };
}

// 読む。なかったり壊れていたりしたら、空のセーブ。
export function loadSave(storage: Pick<Storage, "getItem">): SaveData {
  try {
    const raw = storage.getItem(SAVE_KEY);
    if (!raw) {
      return emptySave();
    }
    const data = JSON.parse(raw) as Partial<SaveData>;
    return {
      cleared: Array.isArray(data.cleared) ? data.cleared.filter((item): item is string => typeof item === "string") : [],
      texts: data.texts && typeof data.texts === "object" ? data.texts : {},
      settings: typeof data.settings === "string" ? data.settings : null,
    };
  } catch {
    return emptySave();
  }
}

// 残す。残せなかったら（容量がいっぱい、ブラウザが許していない など）false。
export function writeSave(storage: Pick<Storage, "setItem">, data: SaveData): boolean {
  try {
    storage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearSave(storage: Pick<Storage, "removeItem">) {
  try {
    storage.removeItem(SAVE_KEY);
  } catch {
    // 消せなくても、画面のほうははじめに戻す。
  }
}

// ステージを開くときの文。書き換えた文を残していて、そのときのはじめの文が今と同じなら、それを使う。
export function stageText(data: SaveData, file: string, original: string): string {
  const saved = data.texts[file];
  return saved && saved.base === original ? saved.text : original;
}

// ステージの書き換えた文を覚える。はじめの文と同じなら、覚えていたものを消す。
export function rememberText(data: SaveData, file: string, original: string, text: string) {
  if (text === original) {
    delete data.texts[file];
  } else {
    data.texts[file] = { base: original, text };
  }
}
