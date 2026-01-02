import { defineStore } from 'pinia'

const MAX_NUMBERS = 5

type BetState = {
  selectedNumbers: number[]
  drawInProgress: boolean
}

export const useBetStore = defineStore('bet', {
  state: (): BetState => ({
    selectedNumbers: [],
    drawInProgress: false,
  }),

  getters: {
    hasBet: (state) => state.selectedNumbers.length === MAX_NUMBERS,
    hasReachedLimit: (state) => state.selectedNumbers.length >= MAX_NUMBERS,
  },

  actions: {
    addNumber(number: number) {
      if (this.selectedNumbers.length < MAX_NUMBERS && !this.selectedNumbers.includes(number)) {
        this.selectedNumbers.push(number)
      }
    },

    removeNumber(number: number) {
      this.selectedNumbers = this.selectedNumbers.filter((n) => n !== number)
    },

    toggleNumber(number: number) {
      if (this.selectedNumbers.includes(number)) {
        this.removeNumber(number)
      } else {
        this.addNumber(number)
      }
    },

    submitBet() {
      // later: send to Supabase
    },

    clearBet() {
      this.selectedNumbers = []
    },

    startDraw() {
      this.drawInProgress = true
    },

    endDraw() {
      this.drawInProgress = false
    },

    reset() {
      this.clearBet()
      this.drawInProgress = false
    },
  },
})
