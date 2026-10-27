// ねこと の窓を作る係（Electron）。組み立てた画面（dist/index.html）を開くだけ。
// ファイルの読み書きはしない（ステージ・絵・音は、組み立てるときに画面の中に入っている。セーブは画面の localStorage）。
// 起動したときに、GitHub の Releases（RayOguma/Nekoto）に新しい版がないかを見て、あれば入れ替える（自動更新）。

import { app, BrowserWindow, dialog, shell } from "electron";
import updater from "electron-updater";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const { autoUpdater } = updater;

// クリックする前でも曲を鳴らせるようにする（ブラウザと違い、アプリなので）。
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 560,
    title: "ねこと",
    // アイコンは、.exe のアイコン（build/icon.png から作る）がそのまま使われる。
    autoHideMenuBar: true,
    backgroundColor: "#000000",
  });
  mainWindow.setMenuBarVisibility(false);
  // 画面の中のリンク（「をこと の書き方」など）は、この窓ではなく、ふだんのブラウザで開く。
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://")) {
      void shell.openExternal(url);
    }
    return { action: "deny" };
  });
  mainWindow.loadFile(path.join(here, "..", "dist", "index.html"));
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// ---- 自動更新 ----
// 新しい版があれば、遊んでいる裏で取ってくる。取れたら「今すぐ入れ替えるか」を聞く。
// 入れ替えなければ、次に閉じたときに入れ替わる。セーブ（localStorage）はそのまま残る。
// 組み立てる前（npm run app）や、つながらないときは、何もしない。

function checkForUpdates() {
  if (!app.isPackaged) {
    return;
  }
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on("update-downloaded", async (info) => {
    const options = {
      type: "info" as const,
      title: "ねこと",
      message: `新しい ねこと（${info.version}）を取ってきました。`,
      detail: "今すぐ入れ替えて、起動し直しますか？（あとにすると、次に閉じたときに入れ替わります。セーブはそのまま残ります）",
      buttons: ["今すぐ入れ替える", "あとで"],
      defaultId: 0,
      cancelId: 1,
    };
    const { response } = mainWindow ? await dialog.showMessageBox(mainWindow, options) : await dialog.showMessageBox(options);
    if (response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
  autoUpdater.on("error", () => {
    // つながらない、Releases がない など。遊ぶのには関係ないので、黙って続ける。
  });
  void autoUpdater.checkForUpdates().catch(() => {});
}

app.whenReady().then(() => {
  createWindow();
  checkForUpdates();
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
