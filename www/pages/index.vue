<script setup lang="ts">
const isDark = useDark();
</script>

<template>
  <nav flex items-center justify-between flex-wrap>
    <div class="flex gap-2 items-center">
      <Icon name="octicon:mark-github" size="32" />
      <h1>GitHub Emojis</h1>
    </div>

    <button
      title="Toggle Dark Mode"
      ml1 text-lg op50 hover:op75
      @click="isDark = !isDark"
    >
      <Icon :name="isDark ? 'carbon:sun' : 'carbon:moon'" size="24" />
    </button>
  </nav>

  <main class="mt-8 flex flex-col">
    <EmojiList />
  </main>
</template>
