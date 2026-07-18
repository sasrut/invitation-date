<script setup lang="ts">
import { computed } from 'vue';
import { useInvitation } from '~/composables/useInvitation';
const { state, formattedDate, formattedTime } = useInvitation()

const emit = defineEmits<{ next: [], back: [] }>()

const today = new Date().toISOString().split('T')[0]

const canContinue = computed(() => !!state.value.date && !!state.value.time)
</script>

<template>
  <div>
    <div class="text-center">
      <div class="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-elegant">
        <UiEmoji e="📅" size="h-7 w-7" />
      </div>
      <h2 class="font-display text-2xl font-bold text-ink">Whenever You're Ready 💫</h2>
      <p class="mt-1 text-sm text-ink/50">
        Choose a day that suits you best. I'm happy whenever you're free.
      </p>
    </div>

    <div class="mt-6 rounded-3xl bg-white p-5 shadow-elegant-md paper-texture">
      <label class="block">
        <span class="mb-1.5 block text-xs font-semibold text-rose-600">Pick the day 🗓️</span>
        <input
          v-model="state.date"
          type="date"
          :min="today"
          class="input-glow w-full rounded-2xl border-2 border-rose-200 bg-rose-50/50 px-4 py-3 text-sm font-medium text-ink outline-none transition-colors"
        >
      </label>

      <label class="mt-4 block">
        <span class="mb-1.5 block text-xs font-semibold text-rose-600">Pick the time ⏰</span>
        <input
          v-model="state.time"
          type="time"
          class="input-glow w-full rounded-2xl border-2 border-rose-200 bg-rose-50/50 px-4 py-3 text-sm font-medium text-ink outline-none transition-colors"
        >
      </label>

      <Transition name="fade">
        <div v-if="canContinue" class="mt-4 rounded-2xl bg-gold-100/60 px-4 py-3 text-center">
          <p class="font-hand text-xl leading-none text-ink">
            {{ formattedDate }}, at {{ formattedTime }} ✨
          </p>
        </div>
      </Transition>
    </div>

    <div class="mt-6 flex gap-3">
      <button
        type="button"
        class="rounded-2xl bg-white px-5 py-3 font-display text-sm font-bold text-rose-500 shadow-elegant transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5"
        @click="emit('back')"
      >
        ← Back
      </button>
      <button
        type="button"
        :disabled="!canContinue"
        class="flex-1 rounded-2xl bg-rose-400 py-3 font-display text-sm font-bold text-white shadow-elegant-md transition-all duration-200 disabled:opacity-30 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-elegant-lg"
        @click="emit('next')"
      >
        Next: review invite
      </button>
    </div>
  </div>
</template>
