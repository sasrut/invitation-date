<script setup lang="ts">
import { ref, computed } from 'vue';
import { useInvitation } from '~/composables/useInvitation';

const { state } = useInvitation() 

const name = ref(state.value.name)
const touched = ref(false)

const nameError = computed(() => touched.value && !name.value.trim() ? 'Tell us what to call you 🥺' : '')

const canSubmit = computed(() => name.value.trim().length > 0)

const emit = defineEmits<{ next: [] }>()

function submit () {
  touched.value = true
  if (!canSubmit.value) return
  state.value.name = name.value.trim()
  emit('next')
}
</script>

<template>
  <div>
    <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 shadow-soft">
      <UiEmoji e="💌" size="h-8 w-8" />
    </div>
    <h1 class="text-center font-display text-2xl font-bold text-ink">
      I Hope You'll Say Yes
    </h1>
    <p class="mt-1 text-center text-xs text-ink/55">
      Just a quick detail before I ask if you'd like to spend some time with me.
    </p>

    <form class="mt-5 flex flex-col gap-4" @submit.prevent="submit">
      <label class="block">
        <span class="mb-1 block text-xs font-semibold text-rose-600">What do i call you?</span>
        <input
          v-model="name"
          type="text"
          placeholder="e.g. Sasha"
          class="input-glow w-full rounded-2xl border-2 border-rose-200 bg-rose-50/50 px-4 py-3 text-sm font-medium text-ink placeholder:text-ink/25 outline-none transition-colors"
        >
        <span v-if="nameError" class="mt-1 block text-xs text-rose-500">{{ nameError }}</span>
      </label>

      <button
        type="submit"
        class="mt-1 w-full rounded-2xl bg-rose-400 py-3 font-display text-sm font-bold text-white shadow-elegant-md transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-elegant-lg"
      >
        Let's go
      </button>
    </form>
  </div>
</template>
