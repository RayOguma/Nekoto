// 組み立てたインストーラーを、GitHub の Releases（RayOguma/Nekoto）に上げる（npm run release の後半）。
// electron-builder にも上げる仕組みがあるが、Releases を2回同時に作ろうとして失敗することがあるので、gh で1回だけ上げる。
// 上げるもの：インストーラー（.exe）、その差分の表（.blockmap）、新しい版を知らせるファイル（latest.yml。自動更新が読む）。
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("package.json", "utf-8"));
const tag = `v${version}`;
const files = [`release/nekoto-setup-${version}.exe`, `release/nekoto-setup-${version}.exe.blockmap`, "release/latest.yml"];

for (const file of files) {
  if (!existsSync(file)) {
    throw new Error(`${file} がありません。先に組み立ててください（npm run dist）。`);
  }
}
// latest.yml が、今の版のものか確かめる（古いものを上げると、自動更新が壊れる）。
if (!readFileSync("release/latest.yml", "utf-8").includes(`version: ${version}`)) {
  throw new Error(`release/latest.yml が ${version} のものではありません。組み立て直してください。`);
}

execFileSync("gh", ["release", "create", tag, ...files, "-R", "RayOguma/Nekoto", "--title", `ねこと ${version}`, "--notes", `ねこと ${version}`], {
  stdio: "inherit",
});
console.log(`${tag} を上げました。`);
