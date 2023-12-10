import { describe, expect, expectTypeOf, test } from "vitest";
import type { EmojiKey } from "../src";
import { EMOJI_KEYS, exists, get, getUrl, isUnicodeEmoji, isUnicodeUrl, parse, removeEmojis, urls } from "../src";

test("should return true for existing emoji", () => {
  expect(exists("grinning")).toBe(true);
});

test("should return false for non-existing emoji", () => {
  expect(exists("non-existing-emoji")).toBe(false);
});

test("should be an object with emoji keys and urls", () => {
  expect(typeof urls).toBe("object");
  expect(Object.keys(urls)).toEqual(EMOJI_KEYS);
  expect(Object.values(urls)).toEqual(expect.arrayContaining([expect.any(String)]));

  expectTypeOf(urls).toEqualTypeOf<Record<EmojiKey, string>>();
  expectTypeOf(urls["+1"]).toEqualTypeOf<string>();
});

test("should be an object with emoji keys and emojis", () => {
  // TODO: Fix..
  expect(typeof urls).toBe("object");
  expect(Object.keys(urls)).toEqual(EMOJI_KEYS);
  expect(Object.values(urls)).toEqual(expect.arrayContaining([expect.any(String)]));

  expectTypeOf(urls).toEqualTypeOf<Record<EmojiKey, string>>();
  expectTypeOf(urls["+1"]).toEqualTypeOf<string>();
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
  expect(getUrl("grinning")).toBe("https://github.githubassets.com/images/icons/emoji/unicode/1f600.png?v8");
});

test("should return undefined for non-existing emoji", () => {
  expect(getUrl("non-existing-emoji")).toBeUndefined();
});

test("should replace emoji keys with unicode characters", () => {
  expect(parse(":grinning:")).toBe("😀");
  expect(parse(":heart_eyes:")).toBe("😍");
  expect(parse(":sunglasses:")).toBe("😎");
});

test("should remove emoji keys", () => {
  expect(removeEmojis(":grinning: This is an emoji thats smiling!")).toBe("This is an emoji thats smiling!");
  expect(removeEmojis(":heart_eyes: This is an emoji thats in love!")).toBe("This is an emoji thats in love!");
  expect(removeEmojis(":sunglasses: This is a cool emoji!")).toBe("This is a cool emoji!");
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
  expect(parse(":grinning:::")).toBe("😀::");
  expect(parse("::grinning::")).toBe(":😀:");
  expect(parse("::")).toBe("::");
});

test("check if str is a unicode emoji", () => {
  expect(isUnicodeEmoji("😀")).toBe(true);
  expect(isUnicodeEmoji("🇩🇰")).toBe(true);
  expect(isUnicodeEmoji("hello!")).toBe(false);
});

test("check if str is a unicode emoji url", () => {
  expect(isUnicodeUrl("https://github.githubassets.com/images/icons/emoji/unicode/1f600.png?v8")).toBe(true);
  expect(isUnicodeUrl("https://github.githubassets.com/images/icons/emoji/unicode/1f1e9-1f1ea.png?v8")).toBe(true);
  expect(isUnicodeEmoji("not-an-emoji")).toBe(false);
  expect(isUnicodeUrl(getUrl("atom"))).toBe(false);
});
