import { EMOJI_KEYS, get, getUrl } from "github-emojis";

export const emojis = EMOJI_KEYS.map((key) => ({
  emojiKey: key,
  emoji: get(key),
  emojiUrl: getUrl(key),
}));
