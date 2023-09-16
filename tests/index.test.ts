import { describe, expect, expectTypeOf, test } from "vitest";
import { EMOJI_KEYS, type Emoji, emojis, exists, get, getRaw, parse } from "../src";

test("should return true for existing emoji", () => {
  expect(exists("grinning")).toBe(true);
});

test("should return false for non-existing emoji", () => {
  expect(exists("non-existing-emoji")).toBe(false);
});

test("should be an object with Emoji keys and string values", () => {
  expect(typeof emojis).toBe("object");
  expect(Object.keys(emojis)).toEqual(EMOJI_KEYS);
  expect(Object.values(emojis)).toEqual(expect.arrayContaining([expect.any(String)]));

  expectTypeOf(emojis).toEqualTypeOf<Record<Emoji, string>>();
  expectTypeOf(emojis["+1"]).toEqualTypeOf<string>();
});

test("should return the correct Unicode character for existing emoji", () => {
  expect(get("denmark")).toBe("🇩🇰");
});

test("should return undefined for a non unicode emoji", () => {
  expect(get("accessibility")).toBeUndefined();
});

test("should return undefined for non-existing emoji", () => {
  expect(get("non-existing-emoji")).toBeUndefined();
});

test("should return the correct URL for existing emoji", () => {
  expect(getRaw("grinning")).toBe("https://github.githubassets.com/images/icons/emoji/unicode/1f600.png?v8");
});

test("should return undefined for non-existing emoji", () => {
  expect(getRaw("non-existing-emoji")).toBeUndefined();
});

test("should replace emoji codes with Unicode characters", () => {
  expect(parse(":grinning:")).toBe("😀");
  expect(parse(":heart_eyes:")).toBe("😍");
  expect(parse(":sunglasses:")).toBe("😎");
});

test("should leave non-existing emoji codes unchanged", () => {
  expect(parse(":non-existing-emoji:")).toBe(":non-existing-emoji:");
});

test("should replace multiple emoji codes in a string", () => {
  expect(parse(":grinning: is my favorite emoji! :heart_eyes:")).toBe("😀 is my favorite emoji! 😍");
});

test("should ignore double colons in the middle of a word", () => {
  expect(parse("::grinning:")).toBe(":😀");
  expect(parse(":grinning::")).toBe("😀:");
  expect(parse("::grinning::")).toBe(":😀:");
  expect(parse("::")).toBe("::");
});
