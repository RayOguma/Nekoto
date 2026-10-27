// ねこと の窓を作る係（Electron）。組み立てた画面（dist/index.html）を開くだけ。
// ファイルの読み書きはしない（ステージ・絵・音は、組み立てるときに画面の中に入っている。セーブは画面の localStorage）。

import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

// クリックする前でも曲を鳴らせるようにする（ブラウザと違い、アプリなので）。
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 560,
    title: "ねこと",
    // アイコンは、.exe のアイコン（build/icon.png から作る）がそのまま使われる。
    autoHideMenuBar: true,
    backgroundColor: "#000000",
  });
  window.setMenuBarVisibility(false);
  window.loadFile(path.join(here, "..", "dist", "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
