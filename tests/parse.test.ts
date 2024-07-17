import { expect, it } from "vitest";
import { parse } from "../src";

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
