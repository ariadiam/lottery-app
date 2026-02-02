import { useBetStore } from '@/stores/bet.store'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useDraw() {
  const betStore = useBetStore()

  async function runDraw() {
    if (betStore.drawInProgress) return

    betStore.startDraw()

    await delay(3000)

    for (let i = 0; i < 5; i++) {
      const number = generateUniqueNumber(betStore.drawNumbers)
      betStore.updateDrawNumber(number)
      await delay(4000)
    }

    betStore.endDraw()
  }

  function generateUniqueNumber(existing: number[]): number {
    let num
    do {
      num = Math.floor(Math.random() * 30) + 1
    } while (existing.includes(num))
    return num
  }

  return {
    runDraw,
  }
}
