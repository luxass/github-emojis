import { writeFile } from "node:fs/promises";
import process from "node:process";
import { z } from "zod";

const ORDERED_EMOJI_REGEX = /.+\s;\s(?<version>[0-9.]+)\s#\s(?<emoji>\S+)\s(?<name>[^:]+)(?::\s)?(?<desc>.+)?/;
const currentEmoji: string | null = null;
const VARIATION_16 = String.fromCodePoint(0xFE0F);
const SKIN_TONE_VARIATION_DESC = /\sskin\stone(?:,|$)/;

const emojiComponents: Record<string, string> = {};

const GROUP_REGEX = /^#\sgroup:\s(?<name>.+)/;
const EMOJI_REGEX = /^(?<unicode>(?:\S+\s)*\S+)\s+;\s*(?<type>[\w-]+)\s*#\s*(?<emoji>\S+)\s*E(?<version>\d+\.\d)\s*(?<description>.+)/;

const BANNER = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.
// RUN \`npm run update:emojis\` TO UPDATE.
`;

const EMOJI_URLS_SCHEMA = z.record(z.string());

async function run() {
  const emojiUrlsRaw = await fetch("https://api.github.com/emojis", {
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "github-emojis (https://github.com/luxass/github-emojis)",
    },
  }).then((res) => res.json());

  const emojiUrls = EMOJI_URLS_SCHEMA.parse(emojiUrlsRaw);

  await writeFile("emoji-urls.json", JSON.stringify(emojiUrls, null, 2));

  const typesString = `${BANNER}
    export type EmojiKey = ${Object.keys(emojiUrls).map((name) => `"${name}"`).join("\n | ")} | (string & {});
  `;

  await writeFile("emoji-types.ts", typesString);

  const constantsString = `${BANNER}
    import type { EmojiKey } from "./types";

    export const EMOJI_KEYS = [
      ${Object.entries(emojiUrls).map(([name]) => `"${name}"`).join(",\n      ")}
    ] as readonly EmojiKey[];
  `;

  await writeFile("emoji-constants.ts", constantsString);

  const emojiTestList = await fetch("https://unicode.org/Public/emoji/latest/emoji-test.txt").then((res) => res.text());

  let currentGroup: string | undefined;

  const lines = emojiTestList.split("\n");
  const emojis: Record<string, unknown> = {};

  for (const line of lines) {
    const groupMatch = line.match(GROUP_REGEX);
    if (groupMatch) {
      currentGroup = groupMatch.groups?.name;
    } else {
      const emojiMatch = line.match(EMOJI_REGEX);
      if (!emojiMatch) continue;
      const groups = emojiMatch.groups;

      if (!groups?.emoji) throw new Error("No emoji found");
      if (groups?.type === "fully-qualified") {
        if (line.match(SKIN_TONE_VARIATION_DESC)) continue;
        emojis[groups.emoji] = {
          name: null,
          slug: null,
          group: currentGroup,
          emoji_version: groups?.version,
          unicode: groups?.unicode,
        };
      } else if (groups?.type === "component") {
        emojiComponents[slugify(groups?.description)] = groups?.emoji;
      }
    }
  }

  const ordered = await fetch("https://unicode.org/emoji/charts/emoji-ordering.txt").then((res) => res.text());

  ordered.split("\n").forEach((line) => {
    if (line.length === 0) return;
    const match = line.match(ORDERED_EMOJI_REGEX);
    if (!match) return;

    const { groups: { version, emoji, name, desc } } = match;
    const isSkinToneVariation = desc && !!desc.match(SKIN_TONE_VARIATION_DESC);
    const fullName = desc && !isSkinToneVariation ? [name, desc].join(" ") : name;
    if (isSkinToneVariation) {
      emojis[currentEmoji!].skin_tone_support = true;
      emojis[currentEmoji!].skin_tone_support_unicode_version = version;
    } else {
      const emojiWithOptionalVariation16 = emojis[emoji] ? emoji : emoji + VARIATION_16;
      const emojiEntry = emojis[emojiWithOptionalVariation16];
      if (!emojiEntry) {
        if (Object.values(emojiComponents).includes(emoji)) return;
        throw `${emoji} entry from emoji-order.txt match not found in emoji-group.txt`;
      }
      currentEmoji = emojiWithOptionalVariation16;
      emojis[currentEmoji].name = fullName;
      emojis[currentEmoji].slug = slugify(fullName);
    }
  });

  await writeFile("emojis.json", JSON.stringify(emojis, null, 2));
}

function slugify(str?: string): string {
  if (!str) throw new Error("No string provided to slugify");
  const SLUGIFY_REPLACEMENT: Record<string, string> = {
    "*": "asterisk",
    "#": "number sign",
  };

  for (const key in SLUGIFY_REPLACEMENT) {
    str = str.replace(key, SLUGIFY_REPLACEMENT[key] || "");
  }

  return str.normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/\(.+\)/g, "")
    .trim()
    .replace(/[\W_]+/g, "_").toLowerCase();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
