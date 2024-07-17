// @ts-check

import {
  luxass,
} from "@luxass/eslint-config";

export default luxass({
  formatters: true,
  ignores: [
    // this directory will be linted by the www config
    "www",
    "test.json",
    "emojis.json",
  ],
});
