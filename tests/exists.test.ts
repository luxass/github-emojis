import { expect, it } from "vitest";
import { exists } from "../src";

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
