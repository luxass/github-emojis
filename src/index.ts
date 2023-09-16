import emojiJson from "../emojis.json";
import type { Emoji } from "./types";

export type {
  Emoji,
};

export const emojis = emojiJson satisfies Record<Emoji, string> as Record<Emoji, string>;

export const EMOJI_KEYS = Object.keys(emojis) as readonly Emoji[];

export function exists(emoji: Emoji): boolean {
  return emoji in emojis;
}

export function get(emoji: Emoji): string | undefined {
  const url = emoji in emojis ? emojis[emoji] : undefined;
  if (!url) return;

  const urlMatch = url.match(/(?<=unicode\/).*(?=\.png)/);

  if (!urlMatch) {
    // some emojis are not unicode, and therefor don't have a codepoint
    return undefined;
  }

  const splittedCodepoints = urlMatch[0].split("-");

  const codepoints = splittedCodepoints.map((codepoint) => Number.parseInt(codepoint, 16));

  return String.fromCodePoint(...codepoints);
}

export function getRaw(emoji: Emoji): string | undefined {
  return emoji in emojis ? emojis[emoji] : undefined;
}

export function parse(str: string): string {
  return str.replace(/:\w+:/gm, (match) => {
    const emoji = match.slice(1, -1);
    return get(emoji) || match;
  });
}
