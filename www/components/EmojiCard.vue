<script setup lang="ts">
const props = defineProps<{
  emojiKey: string
  emoji: string
  emojiUrl: string
}>();

const formattedEmojiKey = ref(`:${props.emojiKey}:`);

const { copy, copied, isSupported } = useClipboard({ source: formattedEmojiKey });
</script>

<template>
  <div border="~ base" rounded bg-base shadow-sm p4 flex="~ col gap2" justify-between items-center @click="copy(formattedEmojiKey)">
    <img :src="emojiUrl" width="32px" height="32px" :alt="`GitHub Emoji for ${formattedEmojiKey}`">
    <p>{{ formattedEmojiKey }}</p>
  </div>
</template>
