import {
  emojis, get,
} from "github-emojis";

export default defineEventHandler(() => {
  return Object.fromEntries(
    Object.entries(emojis).map(([key]) => [key, get(key)]),
  );
});
