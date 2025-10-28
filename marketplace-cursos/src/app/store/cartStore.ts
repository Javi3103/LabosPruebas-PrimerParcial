import { create } from 'zustand'

interface Course {
  id: number
  title: string
  instructor: string
  price: string
  rating: number
  category: string
}

interface CartStore {
  cart: Course[]
  addToCart: (course: Course) => void
  removeFromCart: (courseId: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (course) => set((state) => ({ cart: [...state.cart, course] })),
  removeFromCart: (courseId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== courseId)
  })),
  clearCart: () => set({ cart: [] })
}))