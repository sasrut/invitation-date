<script setup lang="ts">
import type { FoodItem } from '~/composables/useInvitation'

defineProps<{
  items: FoodItem[]
  max: number
  active?: boolean
}>()

const emit = defineEmits<{ remove: [id: string] }>()
</script>

<template>
  <div
    class="relative mx-auto flex w-full max-w-xs flex-col items-center gap-2 rounded-3xl border-2 border-dashed p-4 transition-all duration-200"
    :class="active ? 'border-rose-400 bg-rose-50/60 scale-[1.02]' : 'border-rose-200 bg-white/80 paper-texture'"
  >
    <div class="flex items-center gap-2 text-xs font-semibold text-rose-600">
      <UiEmoji e="🧺" size="h-5 w-5" />
      <span>Your basket</span>
      <span class="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-600">{{ items.length }}/{{ max }}</span>
    </div>

    <div class="flex min-h-[56px] w-full items-center justify-center gap-3">
      <p v-if="items.length === 0" class="text-center text-[12px] text-ink/30">
        Drag up to {{ max }} favorites here 👆
      </p>
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        title="Tap to remove"
        class="animate-fade-in flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-elegant transition-all duration-150 active:scale-90 hover:-translate-y-0.5"
        @click="emit('remove', item.id)"
      >
        <UiEmoji :e="item.emoji" size="h-6 w-6" />
      </button>
    </div>
  </div>
</template>
