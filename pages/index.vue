<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useInvitation } from '~/composables/useInvitation'

const { state } = useInvitation()

const introPhase = ref<'text' | 'bouquet' | 'envelope' | 'done'>('text')

onMounted(() => {
  setTimeout(() => { introPhase.value = 'bouquet' }, 2000)
  setTimeout(() => { introPhase.value = 'envelope' }, 6200)
  setTimeout(() => { introPhase.value = 'done' }, 9000)
})
</script>

<template>
  <div class="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6">

    <!-- Text intro -->
    <Transition name="text-fade">
      <div
        v-if="introPhase === 'text'"
        class="fixed inset-0 z-50 flex items-center justify-center bg-cream"
      >
        <span class="font-hand text-5xl text-rose-400 animate-fade-in select-none pointer-events-none" style="animation-delay:.3s">
          this one for you
        </span>
      </div>
    </Transition>

    <!-- Bouquet overlay -->
    <Transition name="bouquet-fade">
      <div
        v-if="introPhase === 'bouquet'"
        class="fixed inset-0 z-50 flex items-center justify-center bg-cream"
      >
        <span class="text-7xl animate-bouquet-in select-none pointer-events-none">💐</span>
      </div>
    </Transition>

    <!-- Envelope reveal -->
    <Transition name="reveal">
      <div
        v-if="introPhase === 'envelope' || introPhase === 'done'"
        class="animate-reveal-in relative w-full max-w-sm sm:max-w-md"
        style="padding-top:88px"
      >
        <div
          class="envelope-back absolute inset-x-0 top-[88px] bottom-0 overflow-hidden rounded-b-[32px] rounded-t-[18px] shadow-elegant-xl"
          style="margin: 8px -10px -12px -10px;"
        >
          <div class="halftone text-rose-300 absolute bottom-3 right-3 h-16 w-16 opacity-15 rotate-12" />
          <div class="halftone text-rose-300 absolute bottom-3 left-3 h-12 w-12 opacity-15 -rotate-12" />
        </div>

        <div class="envelope-flap animate-unfold" />

        <div class="envelope-card p-6 overflow-y-scroll max-h-[600px] relative overflow-hidden rounded-b-[24px] rounded-t-[10px] shadow-elegant-lg paper-texture linen">
          <div class="scrollbar-none relative max-h-[88vh] overflow-y-auto px-5 pt-7 pb-6 sm:px-7 ruled-lines">
            <UiStepDots :step="state.step" />

            <Transition name="slide" mode="out-in">
              <StepsNameStep
                v-if="state.step === 1"
                key="step1"
                @next="state.step = 2"
              />
              <StepsFoodPicker
                v-else-if="state.step === 2"
                key="step2"
                @next="state.step = 3"
              />
              <StepsDatePicker
                v-else-if="state.step === 3"
                key="step3"
                @back="state.step = 2"
                @next="state.step = 4"
              />
              <StepsOverview
                v-else-if="state.step === 4"
                key="step4"
                @back="state.step = 3"
              />
            </Transition>
          </div>

          <div class="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[10px] text-gray-300 select-none">
            ✨ by github.com/sasrut
          </div>
        </div>

        <div class="wax-seal animate-seal-press absolute z-20 flex h-12 w-12 items-center justify-center rounded-full" style="top:0; left:50%; transform:translate(-50%,-50%)">
          <span class="text-sm leading-none heartbeat">💌</span>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.text-fade-leave-active {
  transition: opacity .8s ease;
}
.text-fade-leave-to {
  opacity: 0;
}

.bouquet-fade-enter-active,
.bouquet-fade-leave-active {
  transition: opacity .5s ease;
}
.bouquet-fade-leave-to {
  opacity: 0;
}

.reveal-enter-active {
  transition: opacity .6s ease;
}
.reveal-enter-from {
  opacity: 0;
}
</style>
