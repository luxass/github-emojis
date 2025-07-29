import { writeFile } from "node:fs/promises";
import process from "node:process";
import { z } from "zod";
import { isUnicodeUrl } from "../src/utils";

const EMOJI_REGEX = /^(?<unicode>(?:\S+\s)*\S+)\s+;\s*(?<type>[\w-]+)\s*#\s*(?<emoji>\S+)\s*E(?<version>\d+\.\d)\s*(?<description>.+)/;

const BANNER = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.
// RUN \`npm run update:emojis\` TO UPDATE.
`;

const EMOJI_URLS_SCHEMA = z.record(z.string());

async function run() {
  const res = await fetch("https://api.github.com/emojis", {
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "github-emojis (https://github.com/luxass/github-emojis)",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch emojis: ${res.status} ${res.statusText}`);
  }

  const emojiUrlsRaw = await res.json();

  const emojiUrls = EMOJI_URLS_SCHEMA.parse(emojiUrlsRaw);

  await writeFile("emoji-urls.json", `${JSON.stringify(emojiUrls, null, 2)}\n`);

  const typesString = `${BANNER}
export type EmojiKey = ${Object.keys(emojiUrls).map((name) => `"${name}"`).join("\n  | ")} | (string & {});
`;

  await writeFile("./src/types.ts", typesString);

  const constantsString = `${BANNER}
import type { EmojiKey } from "./types";

export const EMOJI_KEYS = [
  ${Object.entries(emojiUrls).map(([name]) => `"${name}"`).join(",\n  ")},
] as readonly EmojiKey[];
`;

  await writeFile("./src/constants.ts", constantsString);

  const emojiTestList = await fetch("https://unicode.org/Public/emoji/latest/emoji-test.txt").then((res) => res.text());

  const lines = emojiTestList.split("\n").filter((line) => line.includes("fully-qualified"));
  const emojis: Record<string, string> = Object.fromEntries(Object.entries(emojiUrls).map(([key]) => [key, ""]));

  for (const emojiKey of Object.keys(emojis)) {
    const githubUrlUnicodeUrl = emojiUrls[emojiKey];

    if (!isUnicodeUrl(githubUrlUnicodeUrl)) {
      emojis[emojiKey] = githubUrlUnicodeUrl!;
      continue;
    }

    const githubUrlUnicodeString = githubUrlUnicodeUrl!.replace("https://github.githubassets.com/images/icons/emoji/unicode/", "").replace(".png?v8", "");

    const githubUnicodeCodePoints = githubUrlUnicodeString.split("-");

    // find the entry in emojiTestList
    const emojiTestListEntry = lines.find((line) => {
      const match = line.match(EMOJI_REGEX);
      if (!match || match.groups?.unicode == null) return false;

      if (match.groups.type !== "fully-qualified") return false;

      // remove all zero width joiners
      const unicode = match.groups.unicode.replace(/200D/g, "").replace(/FE0F/g, "").trim();
      const codePoints = unicode.split(" ").filter((codePoint) => codePoint !== "");

      if (codePoints.length !== githubUnicodeCodePoints.length) return false;
      // console.log({
      //   unicode,
      //   codePoints,
      //   githubUnicodeCodePoints,
      // });

      for (let i = 0; i < codePoints.length; i++) {
        if (codePoints[i]?.toLowerCase() !== githubUnicodeCodePoints[i]?.toLowerCase()) return false;
      }

      return true;
    });

    emojis[emojiKey] = emojiTestListEntry?.match(EMOJI_REGEX)?.groups?.emoji ?? "";
  }

  await writeFile("emojis.json", `${JSON.stringify(emojis, null, 2)}\n`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
