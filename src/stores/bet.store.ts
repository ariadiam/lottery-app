import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'

const MAX_NUMBERS = 5

type BetState = {
  selectedNumbers: number[]
  drawInProgress: boolean
  drawNumbers: number[]
  winningCount: number
  totalWinnings: number
}

const WIN_TABLE: Record<number, number> = {
  3: 5,
  4: 10,
  5: 20,
}

export const useBetStore = defineStore('bet', {
  state: (): BetState => ({
    selectedNumbers: [],
    drawInProgress: false,
    drawNumbers: [],
    winningCount: 0,
    totalWinnings: 0,
  }),

  getters: {
    hasBet: (state) => state.selectedNumbers.length === MAX_NUMBERS,
    hasReachedLimit: (state) => state.selectedNumbers.length >= MAX_NUMBERS,
    isWinningBet: (state) => state.winningCount >= 3,
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

    clearBet() {
      this.selectedNumbers = []
      this.drawNumbers = []
      this.winningCount = 0
      this.totalWinnings = 0
    },

    startDraw() {
      this.drawInProgress = true
      this.drawNumbers = []
      this.winningCount = 0
      this.totalWinnings = 0
    },

    endDraw() {
      this.drawInProgress = false
    },

    reset() {
      this.clearBet()
      this.drawInProgress = false
    },

    updateDrawNumber(number: number) {
      if (!this.drawNumbers.includes(number)) {
        this.drawNumbers.push(number)

        const matches = this.selectedNumbers.filter((n) => this.drawNumbers.includes(n)).length
        this.winningCount = matches

        this.totalWinnings = WIN_TABLE[matches] || 0
      }
    },

    async saveDrawToHistory() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) {
        throw new Error('User not authenticated')
      }

      const { error } = await supabase.from('draw_history').insert({
        user_id: user.id,
        bet_numbers: this.selectedNumbers,
        draw_numbers: this.drawNumbers,
        winnings: this.totalWinnings,
      })

      if (error) {
        throw error
      }
    },
  },
})
