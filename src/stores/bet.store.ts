import { defineStore } from 'pinia'

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
    hasBet: (state) => state.selectedNumbers.length === 5,
  },

  actions: {
    submitBet(numbers: number[]) {
      this.selectedNumbers = numbers
    },

    // clearBet() {
    //   this.selectedNumbers = []
    // },

    startDraw() {
      this.drawInProgress = true
    },

    endDraw() {
      this.drawInProgress = false
    },

    // reset() {
    //     this.selectedNumbers = []
    //     this.drawInProgress = false
    // }
  },
})
