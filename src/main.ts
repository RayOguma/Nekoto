// ねこと の入口。今はステージ1を、上の画面で動かすだけ（骨組み）。

import { check, CheckError, CheckErrors, createGame, type GameState, keyWordOf, parse, render, STEP_SECONDS, step, tokenize } from "wokoto";
import { handleSounds, imageOf, stopAllSounds } from "./media";
import { STAGES } from "./stages";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const start = document.querySelector<HTMLButtonElement>("#start")!;
const message = document.querySelector<HTMLElement>("#message")!;
const code = document.querySelector<HTMLElement>("#code")!;
const ctx = canvas.getContext("2d")!;

// ---- 文からゲームを作る ----

let game: GameState | null = null;
let text = "";

function showProblem(error: unknown) {
  const errors = error instanceof CheckErrors ? error.all : error instanceof CheckError ? [error] : [];
  const lineOf = (at: number) => text.slice(0, at).split("\n").length;
  message.textContent =
    errors.length > 0 ? errors.map((each) => `${lineOf(each.start)}行目：${each.message}`).join("\n") : String(error);
  message.hidden = false;
}

function load(source: string) {
  text = source;
  code.textContent = source;
  stopAllSounds();
  try {
    game = createGame(check(parse(tokenize(source), source)));
    message.hidden = true;
  } catch (error) {
    showProblem(error);
  }
}

load(STAGES[0].text);

// ---- 入力 ----

const held = new Set<string>();
const pressedSinceStep = new Set<string>();

window.addEventListener("keydown", (event) => {
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

// ---- 始める ----
// ブラウザは、クリックするまで音を鳴らさないので、はじめに一度クリックしてもらう（あとでタイトル画面にする）。

let started = false;
start.addEventListener("click", () => {
  started = true;
  start.hidden = true;
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
        // 遊んでいる途中の間違い（0 で割った など）。止めて、知らせる。
        started = false;
        stopAllSounds();
        showProblem(error);
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
