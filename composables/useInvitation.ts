export interface FoodItem {
  id: string
  label: string
  emoji: string
}

export const FOOD_ITEMS: FoodItem[] = [
  { id: 'burger', label: 'Burger', emoji: '🍔' },
  { id: 'sushi', label: 'Sushi', emoji: '🍣' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'rice', label: 'Rice Bowl', emoji: '🍚' },
  { id: 'satay', label: 'Satay', emoji: '🍢' },
  { id: 'soup', label: 'Soup', emoji: '🍜' },
  { id: 'dumpling', label: 'Dumpling', emoji: '🥟' },
  { id: 'taco', label: 'Taco', emoji: '🌮' },
  { id: 'pasta', label: 'Pasta', emoji: '🍝' },
  { id: 'shrimp', label: 'Seafood', emoji: '🍤' },
  { id: 'fries', label: 'Fast Food', emoji: '🍟' },
  { id: 'chicken', label: 'Chicken', emoji: '🍗' },
  { id: 'bento', label: 'Bento', emoji: '🍱' },
  { id: 'salad', label: 'Salad', emoji: '🥗' },
  { id: 'donut', label: 'Donut', emoji: '🍩' },
  { id: 'cake', label: 'Cake', emoji: '🍰' },
  { id: 'icecream', label: 'Ice Cream', emoji: '🍦' },
  { id: 'boba', label: 'Boba', emoji: '🧋' },
  { id: 'coffee', label: 'Coffee', emoji: '☕' },
  { id: 'hotpot', label: 'Hot Pot', emoji: '🍲' }
]

export interface InvitationState {
  step: 1 | 2 | 3 | 4
  name: string
  crushPhone: string
  foods: FoodItem[]
  date: string // yyyy-mm-dd
  time: string // HH:mm
}

const MAX_FOODS = 3

export const useInvitation = () => {
  const state = useState<InvitationState>('invitation', () => ({
    step: 1,
    name: '',
    crushPhone: '',
    foods: [],
    date: '',
    time: ''
  }))

  const addFood = (item: FoodItem) => {
    if (state.value.foods.find(f => f.id === item.id)) return false
    if (state.value.foods.length >= MAX_FOODS) return false
    state.value.foods.push(item)
    return true
  }

  const removeFood = (id: string) => {
    state.value.foods = state.value.foods.filter(f => f.id !== id)
  }

  const isFoodSelected = (id: string) => state.value.foods.some(f => f.id === id)

  const formattedDate = computed(() => {
    if (!state.value.date) return ''
    const d = new Date(`${state.value.date}T${state.value.time || '00:00'}`)
    return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  })

  const formattedTime = computed(() => {
    if (!state.value.time) return ''
    const [h, m] = state.value.time.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 === 0 ? 12 : h % 12
    return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
  })

  const reset = () => {
    state.value = { step: 1, name: '', crushPhone: '', foods: [], date: '', time: '' }
  }

  return { state, MAX_FOODS, addFood, removeFood, isFoodSelected, formattedDate, formattedTime, reset }
}
