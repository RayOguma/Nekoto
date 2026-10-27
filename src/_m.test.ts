import { check, createGame, parse, step, tokenize } from "wokoto";
import { test } from "vitest";
import { MENU_TEXT, STAGES, openedPages, pageCount, playable } from "./stages";
function trial(width: number, cleared: Set<number>, unlockAll: boolean, stageIndex: number) {
  const g = createGame(check(parse(tokenize(MENU_TEXT), MENU_TEXT)));
  g.screen = { width, height: 450 };
  g.variables.set("ステージ名", STAGES.map((s) => s.title));
  g.variables.set("クリアした", STAGES.map((_, i) => cleared.has(i)));
  g.variables.set("遊べる", STAGES.map((_, i) => playable(i, cleared, unlockAll)));
  const opened = openedPages(cleared, unlockAll);
  g.variables.set("ページ数", pageCount());
  g.variables.set("ひらけたページ", opened);
  g.variables.set("ページ", Math.min(Math.floor(stageIndex / 10) + 1, opened));
  const log: string[] = [];
  try {
    for (let i = 0; i < 400; i++) {
      g.variables.set("画面の幅", g.screen.width);
      const mid = width / 2;
      const clicks = i === 30 ? [{ x: mid, y: 450 - 90 - 30 }] : i === 90 ? [{ x: mid - 335 + 55, y: 450 - 255 - 55 }] : [];
      step(g, { keys: [], clicks, mouse: { x: (i * 7) % width, y: (i * 3) % 450 } });
      const choice = g.variables.get("遊ぶ");
      if (choice !== null && choice !== undefined) { log.push(`frame ${i} 遊ぶ=${String(choice)}`); g.variables.set("遊ぶ", null); }
    }
    log.push("ok scene=" + (g.scene?.name ?? "-"));
  } catch (e) {
    log.push("ERROR: " + (e as Error).message);
  }
  return log.join(" | ");
}
test("m", () => {
  console.log([
    trial(800, new Set(), false, 0),
    trial(1400, new Set(), false, 0),
    trial(1400, new Set([0, 1, 2]), false, 3),
    trial(1400, new Set(Array.from({ length: 10 }, (_, i) => i)), false, 12),
    trial(1700, new Set(), true, 15),
  ].join("\n"));
});
