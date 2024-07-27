import { describe, expect, expectTypeOf, it } from "vitest";
import type { EmojiKey } from "../src";
import { EMOJI_KEYS, exists, get, getUrl, isUnicodeEmoji, isUnicodeUrl, parse, removeEmojis, urls } from "../src";

it("should return true for existing emoji", () => {
  expect(exists("grinning")).toBe(true);
});

it("should return false for non-existing emoji", () => {
  expect(exists("non-existing-emoji")).toBe(false);
});

it("should be an object with emoji keys and urls", () => {
  expect(typeof urls).toBe("object");
  expect(Object.keys(urls)).toEqual(EMOJI_KEYS);
  expect(Object.values(urls)).toEqual(expect.arrayContaining([expect.any(String)]));

  expectTypeOf(urls).toEqualTypeOf<Record<EmojiKey, string>>();
  expectTypeOf(urls["+1"]).toEqualTypeOf<string>();
});

it("should be an object with emoji keys and emojis", () => {
  // TODO: Fix..
  expect(typeof urls).toBe("object");
  expect(Object.keys(urls)).toEqual(EMOJI_KEYS);
  expect(Object.values(urls)).toEqual(expect.arrayContaining([expect.any(String)]));

  expectTypeOf(urls).toEqualTypeOf<Record<EmojiKey, string>>();
  expectTypeOf(urls["+1"]).toEqualTypeOf<string>();
});

it("should return the correct Unicode character for existing emoji", () => {
  expect(get("denmark")).toBe("🇩🇰");
});

it("should return undefined for a non unicode emoji", () => {
  expect(get("accessibility")).toBeUndefined();
});

it("should return undefined for non-existing emoji", () => {
  expect(get("non-existing-emoji")).toBeUndefined();
});

it("should return the correct URL for existing emoji", () => {
  expect(getUrl("grinning")).toBe("https://github.githubassets.com/images/icons/emoji/unicode/1f600.png?v8");
});

it("should replace emoji keys with unicode characters", () => {
  expect(parse(":grinning:")).toBe("😀");
  expect(parse(":heart_eyes:")).toBe("😍");
  expect(parse(":sunglasses:")).toBe("😎");
});

it("should remove emoji keys", () => {
  expect(removeEmojis(":grinning: This is an emoji thats smiling!")).toBe("This is an emoji thats smiling!");
  expect(removeEmojis(":heart_eyes: This is an emoji thats in love!")).toBe("This is an emoji thats in love!");
  expect(removeEmojis(":sunglasses: This is a cool emoji!")).toBe("This is a cool emoji!");
});

it("should leave non-existing emoji codes unchanged", () => {
  expect(parse(":non-existing-emoji:")).toBe(":non-existing-emoji:");
});

it("should replace multiple emoji codes in a string", () => {
  expect(parse(":grinning: is my favorite emoji! :heart_eyes:")).toBe("😀 is my favorite emoji! 😍");
});

it("should ignore double colons in the middle of a word", () => {
  expect(parse("::grinning:")).toBe(":😀");
  expect(parse(":grinning::")).toBe("😀:");
  expect(parse(":grinning:::")).toBe("😀::");
  expect(parse("::grinning::")).toBe(":😀:");
  expect(parse("::")).toBe("::");
});

it("check if str is a unicode emoji", () => {
  expect(isUnicodeEmoji("😀")).toBe(true);
  expect(isUnicodeEmoji("🇩🇰")).toBe(true);
  expect(isUnicodeEmoji("hello!")).toBe(false);
});

it("check if str is a unicode emoji url", () => {
  expect(isUnicodeUrl("https://github.githubassets.com/images/icons/emoji/unicode/1f600.png?v8")).toBe(true);
  expect(isUnicodeUrl("https://github.githubassets.com/images/icons/emoji/unicode/1f1e9-1f1ea.png?v8")).toBe(true);
  expect(isUnicodeEmoji("not-an-emoji")).toBe(false);
  expect(isUnicodeUrl(getUrl("atom"))).toBe(false);
});

describe("exists", () => {
  it("should return true when the emoji exists", () => {
    expect(exists("grinning")).toBe(true);
  });

  it("should return false when the emoji does not exist", () => {
    expect(exists("non-existing-emoji")).toBe(false);
  });

  it("should return false when the input is an empty string", () => {
    expect(exists("")).toBe(false);
  });

  it("should return false when the emoji is a unicode character that does not exist", () => {
    expect(exists("non-existing-unicode")).toBe(false);
  });
});

describe("parse", () => {
  it("should replace emoji keys with unicode characters", () => {
    expect(parse(":grinning:")).toBe("😀");
    expect(parse(":heart_eyes:")).toBe("😍");
    expect(parse(":sunglasses:")).toBe("😎");
  });

  it("should leave non-existing emoji codes unchanged", () => {
    expect(parse(":non-existing-emoji:")).toBe(":non-existing-emoji:");
  });

  it("should replace multiple emoji codes in a string", () => {
    expect(parse(":grinning: is my favorite emoji! :heart_eyes:")).toBe("😀 is my favorite emoji! 😍");
  });

  it("should ignore double colons in the middle of a word", () => {
    expect(parse("::grinning:")).toBe(":😀");
    expect(parse(":grinning::")).toBe("😀:");
    expect(parse(":grinning:::")).toBe("😀::");
    expect(parse("::grinning::")).toBe(":😀:");
    expect(parse("::")).toBe("::");
  });

  it("should return the original string if emoji key does not exist", () => {
    expect(parse(":non-existing-emoji:")).toBe(":non-existing-emoji:");
  });

  it("should return the original string if emoji key exists but cannot be replaced", () => {
    expect(parse(":accessibility:")).toBe(":accessibility:");
  });

  it("should replace emoji keys with unicode characters if emoji key exists", () => {
    expect(parse(":grinning:")).toBe("😀");
    expect(parse(":heart_eyes:")).toBe("😍");
    expect(parse(":sunglasses:")).toBe("😎");
  });
});
