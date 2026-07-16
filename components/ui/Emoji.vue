<script setup lang="ts">
const props = defineProps<{
  e: string
  size?: string
}>()

const failed = ref(false)

// Convert an emoji character (or simple sequence) to the hex codepoint
// filename twemoji uses, e.g. "🍔" -> "1f354"
function toCodePoints (str: string): string {
  const points: string[] = []
  for (const char of Array.from(str)) {
    const cp = char.codePointAt(0)
    if (cp) points.push(cp.toString(16))
  }
  // twemoji filenames drop the variation-selector-16 (fe0f) except when it's the only codepoint
  const filtered = points.length > 1 ? points.filter(p => p !== 'fe0f') : points
  return filtered.join('-')
}

const src = computed(() => `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${toCodePoints(props.e)}.svg`)
</script>

<template>
  <img
    v-if="!failed"
    :src="src"
    :alt="e"
    draggable="false"
    crossorigin="anonymous"
    class="inline-block select-none align-middle"
    :class="size || 'h-6 w-6'"
    @error="failed = true"
  >
  <span v-else class="leading-none align-middle" :class="size">{{ e }}</span>
</template>
