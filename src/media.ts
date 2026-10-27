// 絵と音。ゲーム/絵/ と ゲーム/音/ のファイルを、名前で引けるようにする。
// 音は、エンジンが出す音の知らせ（SoundEvent）を受け取って鳴らす。BGM（何度も鳴らす音）と効果音（1回の音）で音量を分ける。

import type { SoundEvent } from "wokoto";

// Vite が、組み立てるときにファイルの置き場所（URL）を入れる。
const imageUrls = urlsByName(import.meta.glob<string>("../ゲーム/絵/*", { query: "?url", import: "default", eager: true }));
const soundUrls = urlsByName(import.meta.glob<string>("../ゲーム/音/*", { query: "?url", import: "default", eager: true }));

function urlsByName(found: Record<string, string>): Map<string, string> {
  return new Map(Object.entries(found).map(([path, url]) => [path.split("/").pop()!, url]));
}

// ---- 絵 ----

const images = new Map<string, HTMLImageElement | "読み込み中" | "ない">();

// 名前から絵を返す。まだ読み込んでいなければ読み始めて null（次の絵から描ける）。
export function imageOf(name: string): CanvasImageSource | null {
  const found = images.get(name);
  if (found instanceof HTMLImageElement) {
    return found;
  }
  if (!found) {
    const url = imageUrls.get(name);
    if (!url) {
      images.set(name, "ない");
      return null;
    }
    images.set(name, "読み込み中");
    const img = new Image();
    img.onload = () => images.set(name, img);
    img.onerror = () => images.set(name, "ない");
    img.src = url;
  }
  return null;
}

// ---- 音 ----

// 音量（0〜1）。BGM は何度も鳴らす音、効果音は1回の音。
export const volume = { bgm: 0.3, se: 0.8 };

type Playing = { audio: HTMLAudioElement; name: string; scene: string | null; loop: boolean };
let playing: Playing[] = [];

function stopSounds(match: (item: Playing) => boolean) {
  for (const item of playing.filter(match)) {
    item.audio.pause();
  }
  playing = playing.filter((item) => !match(item));
}

// 鳴っている音を全部止める（ステージを替えたとき、始め直したとき）。
export function stopAllSounds() {
  stopSounds(() => true);
}

// 音量を変える。鳴っている音にもすぐ効かせる。値は 0〜1。
export function setVolume(bgm: number, se: number) {
  volume.bgm = clamp01(bgm);
  volume.se = clamp01(se);
  for (const item of playing) {
    item.audio.volume = item.loop ? volume.bgm : volume.se;
  }
}

function clamp01(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}

// エンジンの音の知らせを処理する。
export function handleSounds(events: SoundEvent[]) {
  for (const event of events) {
    if (event.kind === "鳴らす" || event.kind === "何度も") {
      const loop = event.kind === "何度も";
      const url = soundUrls.get(event.name);
      // 何度も鳴らす音が、もう鳴っていれば重ねない。
      if (!url || (loop && playing.some((item) => item.loop && item.name === event.name))) {
        continue;
      }
      const audio = new Audio(url);
      audio.loop = loop;
      audio.volume = loop ? volume.bgm : volume.se;
      const item: Playing = { audio, name: event.name, scene: event.scene, loop };
      audio.addEventListener("ended", () => {
        playing = playing.filter((other) => other !== item);
      });
      playing.push(item);
      void audio.play().catch(() => {});
    } else if (event.kind === "止める") {
      stopAllSounds();
    } else {
      // 場面の片付け：その場面で何度も鳴らしている音を止める。
      stopSounds((item) => item.loop && item.scene === event.scene);
    }
  }
}
