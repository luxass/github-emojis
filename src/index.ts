import emojiUrls from "../emoji-urls.json";
import type { EmojiCategory, EmojiKey } from "./types";
import { isUnicodeEmoji, isUnicodeUrl } from "./utils";
import {} from "./categories";

import { EMOJI_KEYS } from "./constants";

export { EMOJI_KEYS };

export type { EmojiKey, EmojiCategory };

export { isUnicodeEmoji, isUnicodeUrl };

export const urls = emojiUrls satisfies Record<EmojiKey, string> as Record<
  EmojiKey,
  string
>;

export function exists(emoji: EmojiKey): boolean {
  return emoji in urls;
}

export function get(emoji: EmojiKey): string | undefined {
  const url = emoji in urls ? urls[emoji] : undefined;
  if (!url) return;

  const urlMatch = url.match(/(?<=unicode\/).*(?=\.png)/);

  if (!urlMatch) {
    // some emojis are not unicode, and therefor don't have a codepoint
    return undefined;
  }

  const splittedCodepoints = urlMatch[0].split("-");

  const codepoints = splittedCodepoints.map((codepoint) =>
    Number.parseInt(codepoint, 16),
  );

  return String.fromCodePoint(...codepoints);
}

export function getUrl(emoji: EmojiKey): string | undefined {
  return emoji in emojiUrls ? urls[emoji] : undefined;
}

export function parse(str: string): string {
  return str.replace(/:\w+:/gm, (match) => {
    const emoji = match.slice(1, -1);
    return get(emoji) || match;
  });
}

export function removeEmojis(str: string): string {
  return str
    .replace(/:\w+:/gm, (match) => {
      const emoji = match.slice(1, -1);
      return exists(emoji) ? "" : match;
    })
    .trim();
}
