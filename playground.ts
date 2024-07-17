import {
  exists,
  get,
  getUrl,
  isUnicodeEmoji,
  isUnicodeUrl,
  parse,
  removeEmojis,
} from "./src";

console.log(exists("grinning"));
console.log(get("denmark"));
console.log(getUrl("grinning"));
console.log(parse(":grinning:"));
console.log(removeEmojis(":grinning: This is an emoji thats smiling!"));
console.log(removeEmojis("😀 This is an emoji thats smiling!"));
console.log(isUnicodeEmoji("😀"));
console.log(isUnicodeUrl("https://github.githubassets.com/images/icons/emoji/unicode/1f600.png?v8"));
