const EMOJI_REGEX = /\p{Emoji_Presentation}/gu;

/**
 * Checks if the given emoji is a unicode emoji
 * @param {string} str The emoji to check
 * @returns {boolean} Whether the emoji is a unicode emoji
 */
export function isUnicodeEmoji(str?: string): boolean {
  if (!str) return false;
  return EMOJI_REGEX.test(str);
}

/**
 * Checks if the given emoji url is a unicode emoji
 * @param {string} emojiUrl The emoji to check
 * @returns {boolean} Whether the emoji url is a unicode emoji
 */
export function isUnicodeUrl(emojiUrl?: string): boolean {
  if (!emojiUrl) return false;
  const urlMatch = emojiUrl.match(
    /\/unicode\/[0-9a-fA-F]{4}(?:-[0-9a-fA-F]{4})?/,
  );

  if (!urlMatch) {
    // some emojis are not unicode, and therefor don't have a codepoint
    return false;
  }

  return true;
}
