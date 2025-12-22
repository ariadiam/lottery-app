import { defineStore } from 'pinia'

export const useBetStore = defineStore('bet', {
  state: () => ({
    selectedNumbers: [] as number[],
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
