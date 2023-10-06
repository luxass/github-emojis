<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    icon?: string
    placeholder?: string
    disabled?: boolean
    type?: string
  }>(),
  {
    modelValue: "",
    type: "text",
  },
);
const emit = defineEmits<{ (...args: any): void }>();
const input = useVModel(props, "modelValue", emit, { passive: true });

const router = useRouter();

watch(input, (value) => {
  if (value) {
    router.push({ query: { q: value } });
  } else {
    router.push({ query: {} });
  }
});
</script>

<template>
  <div class="flex flex items-center border border-base rounded py-1 pl-1 pr-2 focus-within:(ring-2 ring-context/50) focus-within:border-context bg-base">
    <slot name="icon">
      <Icon v-if="icon" :name="icon" class="ml-0.3em mr-0.1em text-1.1em op50" />
    </slot>
    <input
      v-model="input"
      v-bind="$props as any"
      class="ml-0.4em w-full flex-auto bg-base !outline-none"
    >
  </div>
</template>
