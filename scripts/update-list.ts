import process from "node:process";

const BANNER = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.
// RUN \`npm run update:list\` TO UPDATE.
`;

async function run() {
  const emojisObj = await fetch("https://api.github.com/emojis", {
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  }).then((res) => res.json());

  await Bun.write("./emojis.json", `${JSON.stringify(emojisObj, null, 2)}\n`);

  await Bun.write("./src/types.ts", `${BANNER}\n\export type Emoji =\n  | ${Object.keys(emojisObj).map((name) => `"${name}"`).join("\n  | ")};\n`);

  // insert a new updated table into readme
  const readmeFile = Bun.file("./README.md");
  const readme = await readmeFile.text();

  const tableStart = readme.indexOf("<!-- table start -->");

  const tableEnd = readme.indexOf("<!-- table end -->");

  const table = readme.slice(tableStart, tableEnd + "<!-- table end -->".length);

  let newTable = `<!-- table start -->
  | Name | Emoji | Name | Emoji |
  |------|-------|------|-------|
  `;

  const emojis = Object.entries(emojisObj);

  for (let i = 0; i < emojis.length; i += 2) {
    const firstEmoji = emojis[i];
    const secondEmoji = emojis[i + 1];

    newTable += `| ${firstEmoji ? firstEmoji[0] : ""} | <img width="20" src="${firstEmoji ? firstEmoji[1] : ""}">`;
    newTable += `| ${secondEmoji ? secondEmoji[0] : ""} | <img width="20" src="${secondEmoji ? secondEmoji[1] : ""}"> |\n`;
  }

  newTable += "<!-- table end -->";

  await Bun.write("./README.md", readme.replace(table, newTable));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
