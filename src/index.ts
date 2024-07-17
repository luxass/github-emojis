import emojiUrls from "../emoji-urls.json";
import type { EmojiCategory, EmojiKey } from "./types";
import { isUnicodeEmoji, isUnicodeUrl } from "./utils";

import { EMOJI_KEYS } from "./constants";

export { EMOJI_KEYS };

type Intellisense<T> = T | (string & {});

export type { EmojiKey, EmojiCategory };

export { isUnicodeEmoji, isUnicodeUrl };

export const urls = emojiUrls satisfies Record<EmojiKey, string> as Record<
  EmojiKey,
  string
>;

/**
 * Checks if an emoji exists in the `urls` object.
 * @param {string} emoji - The emoji key to check.
 * @returns {boolean} Returns `true` if the emoji exists, `false` otherwise.
 */
export function exists(emoji: Intellisense<EmojiKey>): boolean {
  return emoji in urls;
}

export function get(emoji: Intellisense<EmojiKey>): string | undefined {
  const url = emoji in urls ? urls[emoji as EmojiKey] : undefined;
  if (!url) return;

  const urlMatch = url.match(/(?<=unicode\/).*(?=\.png)/);

  if (!urlMatch) {
    // some emojis are not unicode, and therefor don't have a codepoint
    return undefined;
  }

  console.warn(emoji);

  const splittedCodepoints = urlMatch[0].split("-");

  const codepoints = splittedCodepoints.map((codepoint) =>
    Number.parseInt(codepoint, 16),
  );

  return String.fromCodePoint(...codepoints);
}

/**
 * Returns the URL of the specified emoji.
 * @param {string} emoji - The key of the emoji.
 * @returns {string} The URL of the emoji.
 */
export function getUrl(emoji: Intellisense<EmojiKey>): string | undefined {
  return emoji in emojiUrls ? urls[emoji as EmojiKey] : undefined;
}

/**
 * Replaces emoji keys with their respective unicode characters.
 * @param {string} str - The input string.
 * @returns {string} - The string with emoji keys replaced with unicode characters.
 */
export function parse(str: string): string {
  return str.replace(/:\w+:/g, (match) => {
    const emoji = match.slice(1, -1);
    return get(emoji) || match;
  });
}

/**
 * Removes emojis from a given string.
 * @param {string} str - The input string.
 * @returns {string} - The string with emojis removed.
 */
export function removeEmojis(str: string): string {
  return str
    .replace(/:\w+:/g, (match) => {
      const emoji = match.slice(1, -1);
      return exists(emoji) ? "" : match;
    })
    .trim();
}
