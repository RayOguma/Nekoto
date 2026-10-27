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
import { clearSave, emptySave, loadSave, rememberText, stageText, writeSave } from "./save";
import { chosenStage, MENU_TEXT, openedPages, PAGE_SIZE, pageCount, playable, SETTINGS_TEXT, STAGES } from "./stages";

// ---- セーブ ----
// 進み・ステージごとに書き換えた文・設定の文を、このブラウザ（localStorage）に自動で残す。設定の画面からも残せて、消せる。

const storage = (() => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
})();
const save = storage ? loadSave(storage) : emptySave();

// 今のセーブを残す。残せたか。
function persist(): boolean {
  return storage ? writeSave(storage, save) : false;
}

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
// 今の設定の文（設定の画面で書き換えたもの）。セーブにあれば、それ。
let settingsText = save.settings ?? SETTINGS_TEXT;
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
    // 読めた設定だけを残す（はじめの設定と同じなら、残さない）。
    const next = text === SETTINGS_TEXT ? null : text;
    if (save.settings !== next) {
      save.settings = next;
      persist();
    }
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

// 設定の画面の「セーブ」「セーブを消す」。
const saveNote = document.querySelector<HTMLElement>("#save-note")!;
let noteTimer: number | undefined;
function note(text: string) {
  saveNote.textContent = text;
  window.clearTimeout(noteTimer);
  noteTimer = window.setTimeout(() => (saveNote.textContent = ""), 2500);
}

document.querySelector("#save-now")!.addEventListener("click", () => {
  window.clearTimeout(settingsTimer);
  applySettingsText(settingsEditor.text());
  note(persist() ? "セーブしました" : "セーブできませんでした（このブラウザでは残せません）");
});

// 全部ひらく：前のステージをクリアしていなくても、どのステージでも遊べるようにする（発表のときなど）。もう一度押すと戻す。
const unlockButton = document.querySelector<HTMLButtonElement>("#unlock-all")!;
function showUnlock() {
  unlockButton.textContent = save.unlockAll ? "🔒 順番にひらく" : "🔓 全部ひらく";
}
showUnlock();
unlockButton.addEventListener("click", () => {
  save.unlockAll = !save.unlockAll;
  persist();
  showUnlock();
  note(save.unlockAll ? "全部のステージを遊べるようにしました" : "前のステージをクリアするまで、選べないようにしました");
  if (mode === "メニュー") {
    openMenu();
  }
});

document.querySelector("#erase-save")!.addEventListener("click", () => {
  if (!window.confirm("クリアした記録・書き換えた文・設定を、全部消してはじめに戻しますか？（元に戻せません）")) {
    return;
  }
  if (storage) {
    clearSave(storage);
  }
  Object.assign(save, emptySave());
  clearedStages.clear();
  showUnlock();
  settingsEditor.load(SETTINGS_TEXT);
  applySettingsText(SETTINGS_TEXT);
  // 開いている画面も、はじめの形にする。
  if (mode === "ステージ") {
    openStage(stageIndex);
  } else {
    openMenu();
  }
  note("セーブを消しました");
});

// ---- ゲームの画面の幅 ----
// 高さは文で決めた高さのまま、見える横幅を窓に合わせて広げる（黒い余りを出さない）。世界より広くはしない。

// 描く紙（canvas）は、表示する大きさ × 画面の細かさ（devicePixelRatio）で用意する。
// ゲームの中の大きさ（縦 450）のまま描いて引き伸ばすと、ぼやけるため。描くときは、この倍率をかけて描く。
let drawScale = 1;

function fitScreen(state: GameState) {
  const box = canvas.parentElement!.getBoundingClientRect();
  const shownHeight = canvas.getBoundingClientRect().height || box.height;
  const height = state.screen.height;
  const width = Math.max(1, Math.min(Math.round((height * box.width) / shownHeight), state.world.width));
  if (state.screen.width !== width) {
    state.screen = { width, height };
  }
  drawScale = Math.max(1, (shownHeight * (window.devicePixelRatio || 1)) / height);
  const pixelWidth = Math.round(width * drawScale);
  const pixelHeight = Math.round(height * drawScale);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
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
// クリアしたステージの番号（0 から）。セーブには、ファイル名で残している。
const clearedStages = new Set<number>(STAGES.flatMap((stage, index) => (save.cleared.includes(stage.file) ? [index] : [])));

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
    // 書き換えた文を残す（はじめの文に戻したなら、残していた文を消す）。
    rememberText(save, STAGES[stageIndex].file, STAGES[stageIndex].text, editor.text());
    persist();
  }, 300);
  tab.classList.toggle("changed", editor.text() !== STAGES[stageIndex].text);
});

// ステージを開く。セーブに書き換えた文があれば、その続きから。
function openStage(index: number) {
  if (index !== stageIndex || mode !== "ステージ") {
    hintsShown = 0;
    hintPanel.hidden = true;
  }
  stageIndex = index;
  const stage = STAGES[index];
  const text = stageText(save, stage.file, stage.text);
  fileName.textContent = stage.file;
  statusStage.textContent = `ステージ ${index + 1} / ${STAGES.length}：${stage.title}`;
  tab.classList.toggle("changed", text !== stage.text);
  nextButton.textContent = index + 1 < STAGES.length ? "つぎのステージへ ▶" : "メニューへ ▶";
  mode = "ステージ";
  document.body.classList.remove("menu");
  editor.load(text);
  build(text);
  // はじめてステージを開いたら、あそびかたを出す。
  if (!save.tutorialSeen && !tutorialOpen) {
    openTutorial();
  }
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
  game?.variables.set(
    "遊べる",
    STAGES.map((_, index) => playable(index, clearedStages, save.unlockAll)),
  );
  // ステージ選択のページ。今まで遊んでいたステージのページから見せる（ひらけたページまで）。
  const opened = openedPages(clearedStages, save.unlockAll);
  game?.variables.set("ページ数", pageCount());
  game?.variables.set("ひらけたページ", opened);
  game?.variables.set("ページ", Math.min(Math.floor(stageIndex / PAGE_SIZE) + 1, opened));
}

// メニューの をこと の文が、名前「遊ぶ」「設定を開く」に入れたものを見て、ステージや設定を開く。
function watchMenu(state: GameState) {
  // 見えている横の長さを、名前「画面の幅」で渡す（真ん中にそろえる計算は、をこと の文の中でする）。
  state.variables.set("画面の幅", state.screen.width);
  const choice = state.variables.get("遊ぶ");
  if (choice !== null && choice !== undefined) {
    state.variables.set("遊ぶ", null);
    const index = chosenStage(choice, clearedStages, save.unlockAll);
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

// ---- あそびかた（チュートリアル） ----
// はじめてステージを開いたときに出す（見たことはセーブに残す）。「？ あそびかた」で、いつでも見られる。

const tutorial = document.querySelector<HTMLElement>("#tutorial")!;
const tutorialPages = [...tutorial.querySelectorAll<HTMLElement>(".page")];
const tutorialPage = document.querySelector<HTMLElement>("#tutorial-page")!;
const tutorialBack = document.querySelector<HTMLButtonElement>("#tutorial-back")!;
const tutorialNext = document.querySelector<HTMLButtonElement>("#tutorial-next")!;
let tutorialAt = 0;
let tutorialOpen = false;

function showTutorialPage(at: number) {
  tutorialAt = at;
  tutorialPages.forEach((page, i) => (page.hidden = i !== at));
  tutorialPage.textContent = `${at + 1} / ${tutorialPages.length}`;
  tutorialBack.hidden = at === 0;
  tutorialNext.textContent = at + 1 < tutorialPages.length ? "つぎへ ▶" : "はじめる ▶";
}

function openTutorial() {
  tutorialOpen = true;
  tutorial.hidden = false;
  showTutorialPage(0);
  tutorialNext.focus();
}

function closeTutorial() {
  tutorialOpen = false;
  tutorial.hidden = true;
  if (!save.tutorialSeen) {
    save.tutorialSeen = true;
    persist();
  }
  canvas.focus();
}

tutorialBack.addEventListener("click", () => showTutorialPage(Math.max(0, tutorialAt - 1)));
tutorialNext.addEventListener("click", () => {
  if (tutorialAt + 1 < tutorialPages.length) {
    showTutorialPage(tutorialAt + 1);
  } else {
    closeTutorial();
  }
});
document.querySelector("#open-tutorial")!.addEventListener("click", openTutorial);

// ---- ヒント ----
// 「💡 ヒント」を押すたびに、そのステージのヒントを1つずつ増やして見せる（やさしい順）。ステージを開き直すと、はじめから。

const hintPanel = document.querySelector<HTMLElement>("#hint-panel")!;
const hintList = document.querySelector<HTMLOListElement>("#hint-list")!;
const hintMore = document.querySelector<HTMLButtonElement>("#hint-more")!;
let hintsShown = 0;

function showHints() {
  const hints = STAGES[stageIndex].hints;
  hintList.replaceChildren(
    ...hints.slice(0, hintsShown).map((hint) => {
      const li = document.createElement("li");
      li.textContent = hint;
      return li;
    }),
  );
  hintPanel.hidden = hintsShown === 0;
  hintMore.hidden = hintsShown >= hints.length;
}

function moreHint() {
  const hints = STAGES[stageIndex].hints;
  if (hints.length === 0) {
    hintList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "このステージには、ヒントがありません。" }));
    hintPanel.hidden = false;
    hintMore.hidden = true;
    return;
  }
  hintsShown = Math.min(hintsShown + 1, hints.length);
  showHints();
}

document.querySelector("#hint")!.addEventListener("click", moreHint);
hintMore.addEventListener("click", moreHint);
document.querySelector("#hint-close")!.addEventListener("click", () => {
  hintPanel.hidden = true;
});

// もとに戻す：書き換えた文を消して、はじめの文に戻す（残していた文も消す）。書き換えていたら、先に確かめる。
resetButton.addEventListener("click", () => {
  const stage = STAGES[stageIndex];
  if (editor.text() !== stage.text && !window.confirm("書き換えた文を消して、はじめの文に戻しますか？")) {
    return;
  }
  window.clearTimeout(timer);
  rememberText(save, stage.file, stage.text, stage.text);
  persist();
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
// 画面の上の位置を、ゲームの中の位置にする（描く紙の画素ではなく、ゲームの中の大きさで数える）。
function pointOf(event: MouseEvent): Point {
  const rect = canvas.getBoundingClientRect();
  const screen = game?.screen ?? { width: canvas.width, height: canvas.height };
  return { x: ((event.clientX - rect.left) * screen.width) / rect.width, y: ((event.clientY - rect.top) * screen.height) / rect.height };
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
  // あそびかたを出している間は、← → でめくる。エンターで次へ、Esc で閉じる。ゲームには渡さない。
  if (tutorialOpen) {
    if (event.key === "ArrowRight" || event.key === "Enter") {
      tutorialNext.click();
    } else if (event.key === "ArrowLeft") {
      showTutorialPage(Math.max(0, tutorialAt - 1));
    } else if (event.key === "Escape") {
      closeTutorial();
    }
    event.preventDefault();
    return;
  }
  // 下の文を打っている途中で Esc を押したら、ゲームの操作に戻る（上の画面をクリックしなくて済むように）。
  // 日本語の変換中の Esc は、変換を取り消すのに使うので、ここでは使わない。
  if (event.key === "Escape" && !event.isComposing && event.target instanceof Element && event.target.closest("#code")) {
    event.preventDefault();
    (document.activeElement as HTMLElement | null)?.blur();
    canvas.focus();
    return;
  }
  // 設定の画面は、Esc で閉じる（変換中を除く）。
  if (event.key === "Escape" && !event.isComposing && settingsOpen) {
    event.preventDefault();
    closeSettings();
    return;
  }
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
// 上の帯とヒントのボタンは、押したらフォーカスを外して、ゲームの操作に戻す。
// フォーカスが残ると、次にスペースでジャンプしたときに、そのボタン（もとに戻す など）がもう一度押されてしまうため。
for (const bar of document.querySelectorAll("#tabs, #hint-panel, #cleared")) {
  bar.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("button") : null;
    if (button && document.activeElement === button) {
      button.blur();
      canvas.focus();
    }
  });
}
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
  // メニューは、はじめのクリックの前から進める（真ん中にそろえる文などを動かすため）。操作と音は、クリックしてから。
  if (game && (started || mode === "メニュー") && !settingsOpen && !tutorialOpen) {
    let steps = 0;
    while (stored >= STEP_SECONDS && steps < 5) {
      const input = started ? { keys: [...new Set([...held, ...pressedSinceStep])], clicks, mouse } : { keys: [] };
      pressedSinceStep.clear();
      clicks = [];
      try {
        step(game, input);
        if (started) {
          handleSounds(game.sounds.splice(0));
        }
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
        if (!save.cleared.includes(STAGES[stageIndex].file)) {
          save.cleared.push(STAGES[stageIndex].file);
          persist();
        }
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
    ctx.setTransform(drawScale, 0, 0, drawScale, 0, 0);
    ctx.imageSmoothingQuality = "high";
    render(ctx, game, { selected: null, linked: [], selectedText: null, linkedTexts: [], editing: null, pointer: null }, false, imageOf);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
