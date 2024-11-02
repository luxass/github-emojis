import type { EmojiKey } from "./types";
import emojiUrls from "../emoji-urls.json" with { type: "json" };
import allEmojis from "../emojis.json" with { type: "json" };
import { EMOJI_KEYS } from "./constants";

import { isUnicodeEmoji, isUnicodeUrl } from "./utils";

export { EMOJI_KEYS };

type Intellisense<T> = T | (string & {});

export type { EmojiKey };

export { isUnicodeEmoji, isUnicodeUrl };

export const urls = emojiUrls satisfies Record<EmojiKey, string> as Record<
  EmojiKey,
  string
>;

export const emojis = allEmojis satisfies Record<EmojiKey, string> as Record<
  EmojiKey,
  string
>;

/**
 * Checks if an emoji exists in the `urls` object.
 * @param {Intellisense<EmojiKey>} emoji - The emoji key to check.
 * @returns {boolean} Returns `true` if the emoji exists, `false` otherwise.
 */
export function exists(emoji: Intellisense<EmojiKey>): boolean {
  return emoji in emojis;
}

/**
 * Retrieves the corresponding emoji string for the given emoji key.
 * @param {Intellisense<EmojiKey>} emoji - The emoji key to retrieve the emoji string for.
 * @returns {string | undefined} The emoji string if found, otherwise undefined.
 *
 * NOTE:
 * If the emoji isn't an unicode emoji, undefined is returned.
 * You can find a list of the non unicode emojis [here](https://github-emojis.luxass.dev/non-unicode)
 *
 * @example
 * ```ts
 * import { get } from "github-emojis";
 *
 * get("smile"); // 😄
 * get("accessibility"); // undefined
 * ```
 *
 */
export function get(emoji: Intellisense<EmojiKey>): string | undefined {
  const emojiOrUrl = emoji in emojis ? emojis[emoji as EmojiKey] : undefined;

  if (emojiOrUrl?.startsWith("https://github.githubassets.com/images/icons/emoji/")) {
    return undefined;
  }

  return emojiOrUrl;
}

/**
 * Returns the URL of the specified emoji.
 * @param {Intellisense<EmojiKey>} emoji - The key of the emoji.
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
