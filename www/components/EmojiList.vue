<script setup lang="ts">
import { EMOJI_KEYS, get, getRaw } from "github-emojis";
import Fuse from "fuse.js";

const router = useRouter();

const searchString = ref(router.currentRoute.value.query.q as string || "");

const emojis = computed(() => {
  const emojis = [];
  for (const key of EMOJI_KEYS) {
    const url = getRaw(key);
    const emoji = get(key);

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
</script>

<template>
  <Search v-model="searchString" icon="octicon:search" placeholder="Type to search..." mb8 />
  <div flex="~ 1 col" gap2 pb6>
    <div grid grid-cols-minmax-200px gap3 px4>
      <EmojiCard v-for="item of filteredEmojis" :key="item.emojiKey" :emoji="item.emoji" :emoji-key="item.emojiKey"
        :emoji-url="item.emojiUrl" />
    </div>
  </div>
</template>
