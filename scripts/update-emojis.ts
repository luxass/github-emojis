import process from "node:process";
import {
  isUnicodeUrl,
} from "../src/utils";

const BANNER = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.
// RUN \`npm run update:emojis\` TO UPDATE.
`;

async function run() {
  const emojiUrls: Record<string, string> = await fetch("https://api.github.com/emojis", {
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "github-emojis (https://github.com/luxass/github-emojis)",
    },
  }).then((res) => res.json());

  // const categories = getCategories(fullEmojiList);
  // console.log(categories);

  // const emojiUrlEntries = Object.entries(emojiUrls);

  // await Bun.write("./emoji-urls.json", `${JSON.stringify(emojiUrls, null, 2)}\n`);

  // const typesString = `${BANNER}
  //   export type EmojiKey = ${Object.keys(emojiUrls).map((name) => `"${name}"`).join("\n | ")} | (string & {});

  //   export type EmojiCategory = ${categories.map((category) => `"${category}"`).join("\n | ")} | (string & {});

  //   export interface Emoji {
  //     name: string
  //     emoji: string
  //     url: string
  //     category: EmojiCategory
  //   }
  // `;

  // await Bun.write("./src/types.ts", typesString);

  // const constantsString = `${BANNER}
  //   import type { EmojiKey } from "./types";

  //   export const EMOJI_KEYS = [
  //     ${emojiUrlEntries.map(([name]) => `"${name}"`).join(",\n      ")}
  //   ] as readonly EmojiKey[];
  // `;

  // await Bun.write("./src/constants.ts", constantsString);

  // const readmeFile = Bun.file("./README.md");
  // const readme = await readmeFile.text();

  // const tableStart = readme.indexOf("<!-- table start -->");

  // const tableEnd = readme.indexOf("<!-- table end -->");

  // const table = readme.slice(tableStart, tableEnd + "<!-- table end -->".length);

  // let newTable = `${`<!-- table start -->
  // | Name | Emoji | Name | Emoji |
  // |------|-------|------|-------|
  // `.split("\n").map((line) => line.trim()).join("\n")}`;

  // const emojis = emojiUrlEntries;

  // for (let i = 0; i < emojis.length; i += 2) {
  //   const firstEmoji = emojis[i];
  //   const secondEmoji = emojis[i + 1];

  //   newTable += `| ${firstEmoji ? firstEmoji[0] : ""} | ${firstEmoji ? !isUnicodeUrl(firstEmoji[1]) ? `<img width="20" height="20" src="${firstEmoji[1]}" loading="lazy" />` : getEmojiFromUnicodeUrl(firstEmoji[1]) : ""} `;
  //   newTable += `| ${secondEmoji ? secondEmoji[0] : ""} | ${secondEmoji ? !isUnicodeUrl(secondEmoji[1]) ? `<img width="20" height="20" src="${secondEmoji[1]}" loading="lazy" />` : getEmojiFromUnicodeUrl(secondEmoji[1]) : ""} |\n`;
  // }

  // newTable += "<!-- table end -->";

  // await Bun.write("./README.md", readme.replace(table, newTable));

  // Bun.spawn(["npx", "prettier", "./src", "-w"], {
  //   onExit(_, __, ___, error) {
  //     if (error) {
  //       console.error(error);
  //       process.exit(1);
  //     }
  //     Bun.spawn(["npx", "eslint", "--fix", "./src"]);
  //   },
  // });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

function getEmojiFromUnicodeUrl(arg0: string) {
  console.log(arg0);
  return "🤷‍♂️";
}
