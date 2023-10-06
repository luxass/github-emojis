<script setup lang="ts">
import { EMOJI_KEYS, get, getRaw } from "github-emojis";
import Fuse from "fuse.js";

const searchString = ref("");

const emojis = computed(() => {
  const emojis = [];
  for (const key of EMOJI_KEYS) {
    const url = getRaw(key);
    const emoji = get(key);

    if (!url || !emoji) {
      continue;
    }

    emojis.push({
      emojiKey: key,
      emoji,
      emojiUrl: url,
    });
  }
  return emojis;
});

const fuse = computed(() => new Fuse(emojis.value, {
  keys: [
    "emojiKey",
  ],
}));

const filteredEmojis = computed(() => {
  if (!searchString.value) {
    return emojis.value;
  };
  return fuse.value.search(searchString.value).map(i => i.item);
});

const { isSupported } = useClipboard();
</script>

<template>
  <Search v-model="searchString" icon="octicon:search" placeholder="Type to search..." mb8 />
  <div flex="~ 1 col" gap2 pb6>
    <div grid grid-cols-3 gap3 px4>
      <EmojiCard v-for="item of filteredEmojis" :key="item.emojiKey" :emoji="item.emoji" :emoji-key="item.emojiKey"
        :emoji-url="item.emojiUrl" />
    </div>
  </div>
  <p>Is Clipboard Supported: {{ isSupported }}</p>
</template>
