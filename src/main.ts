// ねこと の入口。上でステージのゲームを動かし、下の文を書き換えると始め直す。クリアしたら次のステージへ。

import {
  check,
  CheckError,
  CheckErrors,
  createGame,
  cssVariables,
  type GameState,
  keyWordOf,
  type Point,
  parse,
  readSettings,
  render,
  type Settings,
  STEP_SECONDS,
  step,
  tokenize,
} from "wokoto";
import { createCodeEditor } from "./editor";
import { handleSounds, imageOf, setVolume, stopAllSounds } from "./media";
import { chosenStage, MENU_TEXT, SETTINGS_TEXT, STAGES } from "./stages";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const start = document.querySelector<HTMLButtonElement>("#start")!;
const fileName = document.querySelector<HTMLElement>("#file-name")!;
const tab = document.querySelector<HTMLElement>("#tab")!;
const problems = document.querySelector<HTMLUListElement>("#problems")!;
const statusProblems = document.querySelector<HTMLElement>("#status-problems")!;
const statusStage = document.querySelector<HTMLElement>("#status-stage")!;
const resetButton = document.querySelector<HTMLButtonElement>("#reset")!;
const cleared = document.querySelector<HTMLElement>("#cleared")!;
const menuButton = document.querySelector<HTMLButtonElement>("#menu")!;
const nextButton = document.querySelector<HTMLButtonElement>("#next")!;
const ctx = canvas.getContext("2d")!;

// ---- 設定（見た目と音の大きさ） ----
// 設定の文（ゲーム/画面/設定.wokoto）を、つなぎの設定と同じく をこと で読む。色は、つなぎのテーマと同じ CSS の変数。

const settingsDialog = document.querySelector<HTMLElement>("#settings")!;
const settingsProblems = document.querySelector<HTMLUListElement>("#settings-problems")!;
// 今の設定の文（設定の画面で書き換えたもの）。
let settingsText = SETTINGS_TEXT;
// 設定の画面を開いている間は、ゲームを止める。
let settingsOpen = false;

function applySettings(settings: Settings) {
  for (const [name, value] of Object.entries(cssVariables(settings))) {
    document.documentElement.style.setProperty(name, value);
  }
  setVolume(settings.musicVolume / 100, settings.soundVolume / 100);
}

// 設定の文を読んで効かせる。間違いがあれば、前の設定のまま理由を出す。
function applySettingsText(text: string) {
  try {
    applySettings(readSettings(text));
    settingsText = text;
    settingsProblems.hidden = true;
  } catch (error) {
    const errors = error instanceof CheckErrors ? error.all : error instanceof CheckError ? [error] : [];
    const lineOf = (at: number) => text.slice(0, at).split("\n").length;
    settingsProblems.replaceChildren(
      ...(errors.length > 0 ? errors.map((each) => `${lineOf(each.start)}行目：${each.message}`) : [String(error)]).map((line) => {
        const li = document.createElement("li");
        li.textContent = line;
        return li;
      }),
    );
    settingsProblems.hidden = false;
  }
}
applySettingsText(settingsText);

let settingsTimer: number | undefined;
const settingsEditor = createCodeEditor(
  document.querySelector<HTMLElement>("#settings-code")!,
  () => {
    window.clearTimeout(settingsTimer);
    settingsTimer = window.setTimeout(function apply() {
      if (settingsEditor.composing()) {
        settingsTimer = window.setTimeout(apply, 300);
        return;
      }
      applySettingsText(settingsEditor.text());
    }, 300);
  },
  "設定",
);

function openSettings() {
  settingsOpen = true;
  settingsDialog.hidden = false;
  settingsEditor.load(settingsText);
}

function closeSettings() {
  // 打ちかけの書き換えも効かせてから閉じる。
  window.clearTimeout(settingsTimer);
  applySettingsText(settingsEditor.text());
  settingsOpen = false;
  settingsDialog.hidden = true;
  canvas.focus();
}

document.querySelector("#close-settings")!.addEventListener("click", closeSettings);
document.querySelector("#open-settings")!.addEventListener("click", openSettings);

// ---- ゲームの画面の幅 ----
// 高さは文で決めた高さのまま、見える横幅を窓に合わせて広げる（黒い余りを出さない）。世界より広くはしない。

function fitScreen(state: GameState) {
  const box = canvas.parentElement!.getBoundingClientRect();
  const shownHeight = canvas.getBoundingClientRect().height || box.height;
  const height = state.screen.height;
  const width = Math.max(1, Math.min(Math.round((height * box.width) / shownHeight), state.world.width));
  if (state.screen.width !== width) {
    state.screen = { width, height };
  }
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

// ---- 文からゲームを作る ----

let game: GameState | null = null;
// 今のゲームを作った文（間違いの行の番号を数えるため）。
let gameText = "";
let stageIndex = 0;
// クリアしたか（クリアのあとは、ゲームを進めたまま「つぎへ」を出す）。
let isCleared = false;
// はじめのクリックが済んだか（済むまでゲームを進めず、音も鳴らさない）。
let started = false;
// 今の画面。メニュー（タイトルとステージ選択。窓いっぱい）か、ステージ（上にゲーム、下に文）。
let mode: "メニュー" | "ステージ" = "メニュー";
// クリアしたステージの番号（0 から）。
const clearedStages = new Set<number>();

// 間違いを、下の問題の一覧と帯に出す。行を押すと、その行へ行く。
function showProblem(text: string, error: unknown) {
  const errors = error instanceof CheckErrors ? error.all : error instanceof CheckError ? [error] : [];
  const lineOf = (at: number) => text.slice(0, at).split("\n").length;
  problems.replaceChildren();
  const items = errors.length > 0 ? errors.map((each) => ({ text: each.message, at: each.start as number | null })) : [{ text: String(error), at: null }];
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item.text;
    if (item.at !== null) {
      const line = document.createElement("span");
      line.className = "line";
      line.textContent = `${lineOf(item.at)}行目`;
      li.append(line);
      li.addEventListener("click", () => editor.goTo(item.at!));
    }
    problems.append(li);
  }
  problems.hidden = false;
  statusProblems.textContent = `✖ 問題 ${items.length}`;
  statusProblems.classList.add("bad");
}

function clearProblems() {
  problems.hidden = true;
  problems.replaceChildren();
  statusProblems.textContent = "✔ 問題なし";
  statusProblems.classList.remove("bad");
}

// 文からゲームを作り直す。間違いがあれば、前のゲームを動かしたまま理由を出す。
function build(text: string) {
  try {
    const next = createGame(check(parse(tokenize(text), text)));
    game = next;
    gameText = text;
    isCleared = false;
    cleared.hidden = true;
    clearProblems();
    stopAllSounds();
    if (started) {
      handleSounds(game.sounds.splice(0));
    }
  } catch (error) {
    showProblem(text, error);
  }
}

// 書き換えて少し止まったら始め直す。日本語の変換中は待つ。
let timer: number | undefined;
const editor = createCodeEditor(document.querySelector<HTMLElement>("#code")!, () => {
  window.clearTimeout(timer);
  timer = window.setTimeout(function rebuild() {
    if (editor.composing()) {
      timer = window.setTimeout(rebuild, 300);
      return;
    }
    build(editor.text());
  }, 300);
  tab.classList.toggle("changed", editor.text() !== STAGES[stageIndex].text);
});

function openStage(index: number) {
  stageIndex = index;
  const stage = STAGES[index];
  fileName.textContent = stage.file;
  statusStage.textContent = `ステージ ${index + 1} / ${STAGES.length}：${stage.title}`;
  tab.classList.remove("changed");
  nextButton.textContent = index + 1 < STAGES.length ? "つぎのステージへ ▶" : "メニューへ ▶";
  mode = "ステージ";
  document.body.classList.remove("menu");
  editor.load(stage.text);
  build(stage.text);
}

// メニューを開く。ステージの名前と、クリアしたかの並びを、名前「ステージ名」「クリアした」に入れて渡す。
function openMenu() {
  mode = "メニュー";
  document.body.classList.add("menu");
  build(MENU_TEXT);
  game?.variables.set(
    "ステージ名",
    STAGES.map((stage) => stage.title),
  );
  game?.variables.set(
    "クリアした",
    STAGES.map((_, index) => clearedStages.has(index)),
  );
}

// メニューの をこと の文が、名前「遊ぶ」「設定を開く」に入れたものを見て、ステージや設定を開く。
function watchMenu(state: GameState) {
  // 見えている横の長さを、名前「画面の幅」で渡す（真ん中にそろえる計算は、をこと の文の中でする）。
  state.variables.set("画面の幅", state.screen.width);
  const choice = state.variables.get("遊ぶ");
  if (choice !== null && choice !== undefined) {
    state.variables.set("遊ぶ", null);
    const index = chosenStage(choice, clearedStages);
    if (index !== null) {
      openStage(index);
      canvas.focus();
    }
  }
  if (state.variables.get("設定を開く") === true) {
    state.variables.set("設定を開く", false);
    openSettings();
  }
}

resetButton.addEventListener("click", () => {
  openStage(stageIndex);
  canvas.focus();
});
nextButton.addEventListener("click", () => {
  if (stageIndex + 1 < STAGES.length) {
    openStage(stageIndex + 1);
  } else {
    openMenu();
  }
  canvas.focus();
});
menuButton.addEventListener("click", () => {
  openMenu();
  canvas.focus();
});

openMenu();

// ---- 入力 ----
// 下の文を打っているときのキーは、文が受け取る（ゲームには渡さない）。

const held = new Set<string>();
const pressedSinceStep = new Set<string>();
let clicks: Point[] = [];
let mouse: Point | undefined;
const MOUSE_KEY = "マウス";

// 画面の上の位置を、ゲームの中の位置（canvas の画素）にする。
function pointOf(event: MouseEvent): Point {
  const rect = canvas.getBoundingClientRect();
  return { x: ((event.clientX - rect.left) * canvas.width) / rect.width, y: ((event.clientY - rect.top) * canvas.height) / rect.height };
}
canvas.addEventListener("pointermove", (event) => {
  mouse = pointOf(event);
});
canvas.addEventListener("pointerdown", (event) => {
  const at = pointOf(event);
  mouse = at;
  clicks.push(at);
  held.add(MOUSE_KEY);
  pressedSinceStep.add(MOUSE_KEY);
});
window.addEventListener("pointerup", () => held.delete(MOUSE_KEY));
const typingInCode = (event: Event) => event.target instanceof Element && event.target.closest("#code, #settings") !== null;

window.addEventListener("keydown", (event) => {
  if (typingInCode(event)) {
    return;
  }
  const word = keyWordOf(event.key);
  if (word) {
    event.preventDefault();
    held.add(word);
    pressedSinceStep.add(word);
  }
});
window.addEventListener("keyup", (event) => {
  const word = keyWordOf(event.key);
  if (word) {
    held.delete(word);
  }
});
window.addEventListener("blur", () => held.clear());
// 文を打ち始めたら、押しっぱなしのキーを放したことにする。
document.querySelector("#code")!.addEventListener("focusin", () => held.clear());
// ゲームの画面をクリックしたら、文から離れてゲームを操作する。
canvas.addEventListener("pointerdown", () => {
  (document.activeElement as HTMLElement | null)?.blur();
  canvas.focus();
});

// ---- 始める ----
// ブラウザは、クリックするまで音を鳴らさないので、はじめに一度クリックしてもらう（あとでタイトル画面にする）。

start.addEventListener("click", () => {
  started = true;
  start.hidden = true;
  canvas.focus();
  if (game) {
    handleSounds(game.sounds.splice(0));
  }
});

// ---- 時間に合わせて進めて描く ----

let stored = 0;
let last: number | null = null;

function frame(now: number) {
  if (last !== null) {
    stored += (now - last) / 1000;
  }
  last = now;
  if (game && started && !settingsOpen) {
    let steps = 0;
    while (stored >= STEP_SECONDS && steps < 5) {
      const input = { keys: [...new Set([...held, ...pressedSinceStep])], clicks, mouse };
      pressedSinceStep.clear();
      clicks = [];
      try {
        step(game, input);
        handleSounds(game.sounds.splice(0));
      } catch (error) {
        // 遊んでいる途中の間違い（0 で割った など）。このゲームは止めて、知らせる。
        game = null;
        stopAllSounds();
        showProblem(gameText, error);
        break;
      }
      if (mode === "メニュー") {
        watchMenu(game);
        if (mode !== "メニュー") {
          break;
        }
      } else if (!isCleared && game.variables.get("クリア") === true) {
        // 名前「クリア」が 真 になったら、クリア。
        isCleared = true;
        clearedStages.add(stageIndex);
        cleared.hidden = false;
      }
      stored -= STEP_SECONDS;
      steps += 1;
    }
    if (steps === 5) {
      stored = 0;
    }
  } else {
    stored = 0;
  }
  if (game) {
    fitScreen(game);
    render(ctx, game, { selected: null, linked: [], selectedText: null, linkedTexts: [], editing: null, pointer: null }, false, imageOf);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
