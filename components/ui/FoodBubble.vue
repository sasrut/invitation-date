<script setup lang="ts">
defineProps<{
  emoji: string
  label: string
  selected?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="select-none group flex flex-col items-center gap-1.5 rounded-2xl p-2 transition-transform"
    :class="disabled ? 'opacity-30 pointer-events-none' : 'active:scale-95'"
  >
    <div
      class="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-elegant transition-all duration-200"
      :class="selected ? 'ring-3 ring-rose-400/40 bg-rose-50' : 'group-hover:-translate-y-1 group-hover:shadow-elegant-md'"
    >
      <UiEmoji :e="emoji" size="h-8 w-8" />
    </div>
    <span class="text-[9px] font-semibold text-ink/60">{{ label }}</span>
  </button>
</template>
