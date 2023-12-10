export function isUnicodeEmoji(emojiUrl: string) {
  const urlMatch = emojiUrl.match(/\/unicode\/[0-9a-fA-F]{4}(?:-[0-9a-fA-F]{4})?/);

  if (!urlMatch) {
    // some emojis are not unicode, and therefor don't have a codepoint
    return false;
  }

  return true;
}

export function getEmojiFromUnicodeUrl(url: string) {
  const urlMatch = url.match(/(?<=unicode\/).*(?=\.png)/);

  if (!urlMatch) {
    // some emojis are not unicode, and therefor don't have a codepoint
    return undefined;
  }

  let splittedCodepoints = urlMatch[0].split("-");

  if (splittedCodepoints.length > 1) {
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
