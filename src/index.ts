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

  if (!urlMatch[0].includes("-")) {
    return String.fromCodePoint(Number.parseInt(urlMatch[0], 16));
  }

  let splittedCodepoints = urlMatch[0].split("-");

  if (splittedCodepoints.length > 1) {
    // some emojis should have the 200D inserted at different locations.. and some emojis doesn't have it at all.
    splittedCodepoints = splittedCodepoints.flatMap((codepoint, index) => {
      if (index === 0) {
        return [codepoint];
      }

      return ["200D", codepoint];
    });
  }

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
