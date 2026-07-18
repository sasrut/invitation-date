<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from 'vue';
import { FOOD_ITEMS, useInvitation, type FoodItem } from '~/composables/useInvitation'

const { state, addFood, removeFood, isFoodSelected, MAX_FOODS } = useInvitation()

const emit = defineEmits<{ next: [] }>()

const basketRef = ref<HTMLElement | null>(null)
const dragging = ref<FoodItem | null>(null)
const pointer = reactive({ x: 0, y: 0 })
const basketActive = ref(false)
const shake = ref(false)
let startPos = { x: 0, y: 0 }
let moved = false
let pendingItem: FoodItem | null = null
let dragTimer: ReturnType<typeof setTimeout> | null = null

function pointInBasket (x: number, y: number) {
  if (!basketRef.value) return false
  const r = basketRef.value.getBoundingClientRect()
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
}

function cleanupHold() {
  if (dragTimer) { clearTimeout(dragTimer); dragTimer = null }
  window.removeEventListener('pointermove', onHoldMove)
  window.removeEventListener('pointerup', onHoldUp)
}

function onHoldMove(e: PointerEvent) {
  if (Math.abs(e.clientX - startPos.x) > 6 || Math.abs(e.clientY - startPos.y) > 6) {
    cleanupHold()
    pendingItem = null
  }
}

function onHoldUp(_e: PointerEvent) {
  cleanupHold()
  if (pendingItem) {
    tryAdd(pendingItem)
    pendingItem = null
  }
}

function onPointerDown (e: PointerEvent, item: FoodItem) {
  if (isFoodSelected(item.id)) return
  pendingItem = item
  startPos = { x: e.clientX, y: e.clientY }
  moved = false

  window.addEventListener('pointermove', onHoldMove)
  window.addEventListener('pointerup', onHoldUp)

  dragTimer = setTimeout(() => {
    cleanupHold()
    dragging.value = pendingItem
    pointer.x = e.clientX
    pointer.y = e.clientY
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }, 300)
}

function onPointerMove (e: PointerEvent) {
  pointer.x = e.clientX
  pointer.y = e.clientY
  if (Math.abs(e.clientX - startPos.x) > 6 || Math.abs(e.clientY - startPos.y) > 6) moved = true
  basketActive.value = pointInBasket(e.clientX, e.clientY)
}

function tryAdd (item: FoodItem) {
  const ok = addFood(item)
  if (!ok && state.value.foods.length >= MAX_FOODS) {
    shake.value = true
    setTimeout(() => (shake.value = false), 500)
  }
}

function onPointerUp (e: PointerEvent) {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  const item = dragging.value
  dragging.value = null
  basketActive.value = false
  pendingItem = null
  if (!item) return

  if (!moved) {
    tryAdd(item)
    return
  }
  if (pointInBasket(e.clientX, e.clientY)) {
    tryAdd(item)
  }
}

onBeforeUnmount(() => {
  cleanupHold()
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div>
    <div class="text-center">
      <h2 class="font-display text-2xl font-bold text-ink">What would make you smile? 🍽️</h2>
      <p class="mt-1 text-xs text-ink/50">
        Drag/Click to Choose up to {{ MAX_FOODS }} dishes you'd enjoy sharing with me.
      </p>
    </div>

    <div class="mt-5 grid grid-cols-4 gap-x-1 gap-y-3">
      <UiFoodBubble
        v-for="item in FOOD_ITEMS"
        :key="item.id"
        :emoji="item.emoji"
        :label="item.label"
        :selected="isFoodSelected(item.id)"
        :disabled="isFoodSelected(item.id)"
        @pointerdown="onPointerDown($event, item)"
      />
    </div>

    <div class="mt-6" :class="{ 'animate-[wiggle_0.4s_ease-in-out]': shake }">
      <div ref="basketRef">
        <UiBasket :items="state.foods" :max="MAX_FOODS" :active="basketActive" @remove="removeFood" />
      </div>
    </div>

    <button
      type="button"
      :disabled="state.foods.length === 0"
      class="mt-6 w-full rounded-2xl bg-rose-400 py-3 font-display text-sm font-bold text-white shadow-elegant-md transition-all duration-200 disabled:opacity-30 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-elegant-lg"
      @click="emit('next')"
    >
      Next: pick a date
    </button>

    <Teleport to="body">
      <div
        v-if="dragging"
        class="ghost-pulse pointer-events-none fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-elegant-lg"
        :style="{ left: pointer.x - 28 + 'px', top: pointer.y - 28 + 'px' }"
      >
        <UiEmoji :e="dragging.emoji" size="h-8 w-8" />
      </div>
    </Teleport>
  </div>
</template>
