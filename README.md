# github-emojis

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![jsr version][jsr-version-src]][jsr-version-href]

All GitHub's emojis in one place.

## 📦 Installation

```sh
npm install github-emojis
```

## 📚 Usage

```ts
import { emojis, exists, get, getUrl, parse } from "github-emojis";

// Get all emojis
console.log(emojis);

// Check if an emoji exists
console.log(exists("100")); // true

// Get an emoji by name
console.log(get("100")); // 💯

// Get an emoji url by name
console.log(getUrl("100")); // https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png?v8

// Parse a string with emojis
console.log(parse("Hello :smile:")); // Hello 😄
```

> If you only want to get the emoji urls, you can directly import the `emojis` object.

```ts
import emojis from "github-emojis/emojis";
```

## All emojis

> [!NOTE]
> You can view all on [github-emojis.luxass.dev](https://github-emojis.luxass.dev) or directly below.

## 📄 License

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/github-emojis?style=flat&colorA=18181B&colorB=4169E1
[npm-version-href]: https://npmjs.com/package/github-emojis
[npm-downloads-src]: https://img.shields.io/npm/dm/github-emojis?style=flat&colorA=18181B&colorB=4169E1
[npm-downloads-href]: https://npmjs.com/package/github-emojis
[jsr-version-src]: https://jsr.io/badges/@luxass/github-emojis?style=flat&labelColor=18181B&logoColor=4169E1
[jsr-version-href]: https://jsr.io/@luxass/github-emojis
