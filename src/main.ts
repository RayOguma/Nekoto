// ねこと の入口。上でステージのゲームを動かし、下の文を書き換えると始め直す。クリアしたら次のステージへ。

import { check, CheckError, CheckErrors, createGame, type GameState, keyWordOf, parse, render, STEP_SECONDS, step, tokenize } from "wokoto";
import { createCodeEditor } from "./editor";
import { handleSounds, imageOf, stopAllSounds } from "./media";
import { STAGES } from "./stages";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const start = document.querySelector<HTMLButtonElement>("#start")!;
const message = document.querySelector<HTMLElement>("#message")!;
const stageTitle = document.querySelector<HTMLElement>("#stage-title")!;
const resetButton = document.querySelector<HTMLButtonElement>("#reset")!;
const cleared = document.querySelector<HTMLElement>("#cleared")!;
const nextButton = document.querySelector<HTMLButtonElement>("#next")!;
const ctx = canvas.getContext("2d")!;

// ---- 文からゲームを作る ----

let game: GameState | null = null;
// 今のゲームを作った文（間違いの行の番号を数えるため）。
let gameText = "";
let stageIndex = 0;
// クリアしたか（クリアのあとは、ゲームを進めたまま「つぎへ」を出す）。
let isCleared = false;
// はじめのクリックが済んだか（済むまでゲームを進めず、音も鳴らさない）。
let started = false;

function showProblem(text: string, error: unknown) {
  const errors = error instanceof CheckErrors ? error.all : error instanceof CheckError ? [error] : [];
  const lineOf = (at: number) => text.slice(0, at).split("\n").length;
  message.textContent =
    errors.length > 0 ? errors.map((each) => `${lineOf(each.start)}行目：${each.message}`).join("\n") : String(error);
  message.hidden = false;
}

// 文からゲームを作り直す。間違いがあれば、前のゲームを動かしたまま理由を出す。
function build(text: string) {
  try {
    const next = createGame(check(parse(tokenize(text), text)));
    game = next;
    gameText = text;
    isCleared = false;
    cleared.hidden = true;
    message.hidden = true;
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
});

function openStage(index: number) {
  stageIndex = index;
  const stage = STAGES[index];
  stageTitle.textContent = `ステージ ${index + 1}：${stage.title}`;
  nextButton.textContent = index + 1 < STAGES.length ? "つぎのステージへ" : "さいごのステージでした";
  nextButton.disabled = index + 1 >= STAGES.length;
  editor.load(stage.text);
  build(stage.text);
}

resetButton.addEventListener("click", () => {
  openStage(stageIndex);
  canvas.focus();
});
nextButton.addEventListener("click", () => {
  if (stageIndex + 1 < STAGES.length) {
    openStage(stageIndex + 1);
    canvas.focus();
  }
});

openStage(0);

// ---- 入力 ----
// 下の文を打っているときのキーは、文が受け取る（ゲームには渡さない）。

const held = new Set<string>();
const pressedSinceStep = new Set<string>();
const typingInCode = (event: Event) => event.target instanceof Element && event.target.closest("#code") !== null;

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
  if (game && started) {
    let steps = 0;
    while (stored >= STEP_SECONDS && steps < 5) {
      const input = { keys: [...new Set([...held, ...pressedSinceStep])] };
      pressedSinceStep.clear();
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
      // 名前「クリア」が 真 になったら、クリア。
      if (!isCleared && game.variables.get("クリア") === true) {
        isCleared = true;
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
    render(ctx, game, { selected: null, linked: [], selectedText: null, linkedTexts: [], editing: null, pointer: null }, false, imageOf);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
