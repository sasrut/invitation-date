<script setup lang="ts">
defineProps<{ step: number }>()
const labels = ['You', 'Menu', 'Date', 'Send']
</script>

<template>
  <div class="flex items-center justify-center gap-1">
    <template v-for="(label, i) in labels" :key="label">
      <div class="flex flex-col items-center gap-0.5">
        <div
          class="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold font-display transition-all duration-300"
          :class="step >= i + 1 ? 'bg-rose-400 text-white shadow-soft' : 'bg-rose-50 text-rose-300'"
        >
          {{ i + 1 }}
        </div>
        <span
          class="text-[8px] font-medium transition-colors duration-300"
          :class="step >= i + 1 ? 'text-rose-500' : 'text-ink/30'"
        >{{ label }}</span>
      </div>
      <div
        v-if="i < labels.length - 1"
        class="mb-3 h-[1.5px] w-3 rounded-full transition-all duration-300"
        :class="step > i + 1 ? 'bg-rose-400' : 'bg-rose-200'"
      />
    </template>
  </div>
</template>
