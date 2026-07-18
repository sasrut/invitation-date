<script setup lang="ts">
import { toPng, toBlob } from 'html-to-image'
import { useInvitation } from '~/composables/useInvitation'
import { useState } from '#app';
import { ref, computed, watch } from 'vue';
const { state, formattedDate, formattedTime } = useInvitation()
const emit = defineEmits<{ back: [] }>()

const cardRef = ref<HTMLElement | null>(null)
const EXPORT_WIDTH = 680
const busy = ref<'send' | 'download' | null>(null)
const note = ref('')
const noteType = ref<'success' | 'error' | null>(null)

let noteTimer: ReturnType<typeof setTimeout> | null = null

watch(note, (val) => {
  if (noteTimer) clearTimeout(noteTimer)
  if (val) {
    noteTimer = setTimeout(() => {
      note.value = ''
      noteType.value = null
    }, 5800)
  }
})

const dayNumber = computed(() => state.value.date ? new Date(`${state.value.date}T00:00:00`).getDate() : '')
const monthShort = computed(() => state.value.date ? new Date(`${state.value.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short' }) : '')

function cleanupExport(container: HTMLElement | null) {
  if (container?.parentNode) {
    container.remove()
  }
}

async function renderCard () {
  if (!cardRef.value) return null
  await document.fonts.ready
  const imgs = Array.from(cardRef.value.querySelectorAll('img'))
  await Promise.all(imgs.map(img => img.complete
    ? Promise.resolve()
    : new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
      })))

  const wrapper = document.createElement('div')
  wrapper.style.cssText = `position:fixed;left:-9999px;top:0;width:${EXPORT_WIDTH}px;max-width:none;`

  const clone = cardRef.value.cloneNode(true) as HTMLElement
  clone.style.width = `${EXPORT_WIDTH}px`
  clone.style.maxWidth = `${EXPORT_WIDTH}px`

  wrapper.appendChild(clone)
  document.body.appendChild(wrapper)

  clone.offsetHeight
  await new Promise(r => requestAnimationFrame(r))

  return { element: clone as HTMLElement, wrapper }
}

function triggerDownload (dataUrl: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = `date-invite-${state.value.name.toLowerCase().replace(/\s+/g, '-') || 'card'}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

async function handleDownload () {
  const result = await renderCard()
  if (!result) return
  busy.value = 'download'
  note.value = ''
  noteType.value = null
  try {
    const dataUrl = await toPng(result.element, { pixelRatio: 1, width: EXPORT_WIDTH })
    triggerDownload(dataUrl)
    note.value = 'Yeayy! The card has been downloaded! 💾'
    noteType.value = 'success'
  } catch (err) {
    note.value = 'Hmm, could not create the image. Try again?'
    noteType.value = 'error'
  } finally {
    busy.value = null
    cleanupExport(result.wrapper)
  }
}

async function handleSend () {
  const phone = state.value.crushPhone.replace(/\D/g, '')
  const shareText = `Hi! ${state.value.name || 'Someone'} sent you a little date invitation 💌`
  const waText = encodeURIComponent(`${shareText} I just saved the invite card — attaching it right here!`)
  const waUrl = `https://wa.me/${phone}?text=${waText}`
  window.open(waUrl, '_blank')

  const result = await renderCard()
  if (!result) return
  busy.value = 'send'
  note.value = ''
  noteType.value = null

  try {
    const dataUrl = await toPng(result.element, { pixelRatio: 1, width: EXPORT_WIDTH })
    triggerDownload(dataUrl)
    note.value = 'Yeayy! Card saved — attach it in the WhatsApp chat that just opened 💬'
    noteType.value = 'success'
  } catch (err: any) {
    note.value = 'Could not create the image. Try again?'
    noteType.value = 'error'
  } finally {
    busy.value = null
    cleanupExport(result.wrapper)
  }
}
</script>

<template>
  <div>
    <div class="text-center">
      <h2 class="font-display text-2xl font-bold text-ink">This Is It 💘</h2>
      <p class="mt-1 text-sm text-ink/50">Hi, it's me {{ state.name }}!, Here's how I'd love to spend the day with you. Take one last look before we make it happen.</p>
    </div>

    <div class="mt-6 flex justify-center">
      <div ref="cardRef" class="relative w-full">

          <div class="relative overflow-hidden rounded-3xl border-2 border-rose-100/50 bg-white p-6 shadow-elegant-lg paper-texture linen">

            <!-- Postage stamp badge -->
            <div class="absolute -top-1 -right-1 flex items-center justify-center rounded-md border border-dashed border-rose-300/60 bg-rose-50/80 px-1.5 py-2 rotate-[8deg]">
              <span class="text-[9px] font-bold uppercase tracking-widest text-rose-400 leading-none">You're<br>invited</span>
            </div>

            <!-- Decorative top border -->
            <div class="flex items-center gap-2 mb-4">
              <div class="flex-1 h-px bg-rose-200/60" />
              <span class="text-xs text-rose-300">💌</span>
              <div class="flex-1 h-px bg-rose-200/60" />
            </div>

            <div class="relative flex flex-col items-stretch text-center">

              <p class="font-hand text-3xl leading-tight text-rose-600">
                Dear you ✨,
              </p>

              <!-- Food items -->
              <div class="mt-4 flex items-center justify-center gap-3">
                <div
                  v-for="item in state.foods"
                  :key="item.id"
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50/60 shadow-elegant"
                >
                  <UiEmoji :e="item.emoji" size="h-8 w-8" />
                </div>
              </div>
              <p v-if="state.foods.length" class="mt-1.5 text-[11px] font-medium text-ink/40">
                {{ state.foods.map(f => f.label).join(' · ') }}
              </p>

              <!-- Date card -->
              <div class="mt-4 flex w-full items-center gap-3 rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-blush-50/60 p-3">
                <div class="flex h-14 w-14 flex-none flex-col items-center justify-center rounded-xl bg-white shadow-elegant">
                  <span class="text-[10px] font-bold uppercase text-rose-500">{{ monthShort }}</span>
                  <span class="font-display text-xl font-bold leading-none text-ink">{{ dayNumber }}</span>
                </div>
                <div class="text-left">
                  <p class="font-display text-sm font-bold text-ink">{{ formattedDate }}</p>
                  <p class="text-xs font-semibold text-rose-600"><UiEmoji e="⏰" size="h-3.5 w-3.5" /> {{ formattedTime }}</p>
                </div>
              </div>

              <p class="mt-4 font-hand text-sm text-ink/65">I hope you'll like what I picked for us. 🥹</p>

            </div>

            <!-- Decorative bottom border -->
            <div class="flex items-center gap-2 mt-4">
              <div class="flex-1 h-px bg-rose-200/60" />
              <span class="text-[9px] font-semibold uppercase tracking-[.3em] text-rose-300/80">with love</span>
              <div class="flex-1 h-px bg-rose-200/60" />
            </div>

          </div>
        </div>
    </div>
    <!-- end for downloadable card -->

    <Transition name="alert-pop">
      <div
        v-if="note"
        class="mt-4 flex items-center gap-3 rounded-2xl p-4 shadow-elegant-md animate-fade-in"
        :class="noteType === 'success' ? 'bg-rose-50 text-rose-600' : 'bg-gold-50 text-ink'"
      >
        <span class="text-xl flex-none">{{ noteType === 'success' ? '🎉' : '😅' }}</span>
        <span class="text-sm font-semibold">{{ note }}</span>
      </div>
    </Transition>

    <div class="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        :disabled="busy !== null"
        class="rounded-2xl bg-white py-3 font-display text-sm font-bold text-rose-500 shadow-elegant transition-all duration-200 disabled:opacity-50 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-elegant-md"
        @click="handleDownload"
      >
        {{ busy === 'download' ? 'Saving…' : '⬇ Download' }}
      </button>
      <button
        type="button"
        :disabled="busy !== null"
        class="rounded-2xl bg-rose-400 py-3 font-display text-sm font-bold text-white shadow-elegant-md transition-all duration-200 disabled:opacity-50 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-elegant-lg"
        @click="handleSend"
      >
        {{ busy === 'send' ? 'Sending…' : '💬 Send' }}
      </button>
    </div>

    <button
      type="button"
      class="mt-4 w-full rounded-2xl py-2 text-center text-xs font-semibold text-ink/35 transition-colors hover:text-ink/55"
      @click="emit('back')"
    >
      ← Back to edit the date
    </button>
  </div>
</template>
