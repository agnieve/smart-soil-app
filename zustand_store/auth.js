import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  veggies: [],
  login: (userData) => set(() => ({ user: userData })),
  setVeggies: (veggiesFetch) => set(() => ({ veggies: veggiesFetch })),
  logout: () => set(() => ({ user: null })),
//   register: (userData) => set(() => ({ user: userData })),
}))