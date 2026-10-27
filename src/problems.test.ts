import { check, parse, tokenize } from "wokoto";
import { expect, test } from "vitest";
import { lineOf, problemsOf } from "./problems";

function errorOf(text: string): unknown {
  try {
    check(parse(tokenize(text), text));
  } catch (error) {
    return error;
  }
  throw new Error("間違いになりませんでした");
}

test("読み取りの間違い（スペースの字下げ）も、位置つきで出す", () => {
  const text = "ずっと：\n  x を 1 に する。";
  const [problem] = problemsOf(errorOf(text));
  expect(problem.message).toContain("字下げはタブで書きます");
  expect(problem.message).not.toMatch(/^Error/);
  expect(problem.at).not.toBeNull();
  expect(lineOf(text, problem.at!)).toBe(2);
});

test("意味の間違いは、全部出す", () => {
  const problems = problemsOf(errorOf("x を y に する。\nz を w に する。"));
  expect(problems).toHaveLength(2);
  expect(problems.every((each) => each.at !== null)).toBe(true);
});

test("そのほかの間違いは、位置なしで文だけ", () => {
  expect(problemsOf(new Error("思わぬ間違い"))).toEqual([{ message: "思わぬ間違い", at: null }]);
});
