// @vitest-environment jsdom
import { test } from "vitest";
import { createCodeEditor } from "./editor";
import { SETTINGS_TEXT, STAGES } from "./stages";
test("e", () => {
  const out: string[] = [];
  for (const mode of ["ステージ", "設定"] as const) {
    const parent = document.createElement("div");
    document.body.append(parent);
    try {
      const editor = createCodeEditor(parent, () => {}, mode);
      editor.load(mode === "ステージ" ? STAGES[0].text : SETTINGS_TEXT);
      out.push(mode + " ok");
    } catch (e) {
      out.push(mode + " ERROR: " + (e as Error).message + "\n" + (e as Error).stack?.split("\n").slice(0, 6).join("\n"));
    }
  }
  console.log(out.join("\n"));
});
