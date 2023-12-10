<script setup lang="ts">
const props = defineProps<{
  emojiKey: string
  emoji?: string
  emojiUrl?: string
}>();

const formattedEmojiKey = ref(`:${props.emojiKey}:`);

const { copy } = useClipboard({ source: formattedEmojiKey });
</script>

<template>
  <div border="~ base" rounded bg-base shadow-sm p4 flex="~ col gap2" justify-between items-center
    @click="copy(formattedEmojiKey)">
    <img v-if="emojiUrl && !isUnicodeEmoji(emojiUrl)" :src="emojiUrl" width="32px" height="32px" :alt="`GitHub Emoji for ${formattedEmojiKey}`">
    <p v-else class="text-3xl w-32px h-32px">
      {{ emoji }}
    </p>
    <p>{{ formattedEmojiKey }}</p>
  </div>
</template>
