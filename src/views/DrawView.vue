<template>
  <div class="draw-page">
    <n-grid cols="2" x-gap="32">
      <n-gi>
        <n-card title="Drawn Numbers" class="draw-card">
          <div class="balls">
            <div v-for="n in betStore.drawNumbers" :key="n" class="ball">
              {{ n }}
            </div>
          </div>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card title="Your Bet" class="bet-card">
          <div class="balls">
            <div
              v-for="n in betStore.selectedNumbers"
              :key="n"
              class="ball"
              :class="{ match: isMatch(n) }"
            >
              {{ n }}
            </div>
          </div>

          <n-alert v-if="betStore.isWinningBet" type="success" class="winning-alert" show-icon>
            Winning bet!
          </n-alert>

          <div class="winnings">
            Total winnings:
            <strong>{{ betStore.totalWinnings }} €</strong>
          </div>
        </n-card>
      </n-gi>
    </n-grid>

    <n-modal
      v-model:show="showModal"
      preset="card"
      title="Draw completed"
      :mask-closable="false"
      :closable="false"
    >
      <n-space vertical size="large">
        <p>
          {{ betStore.totalWinnings > 0 ? 'Congratulations!' : 'Better luck next time!' }}
        </p>

        <p>
          Total won:
          <strong>{{ betStore.totalWinnings }} €</strong>
        </p>

        <n-space justify="end">
          <n-button @click="goBack">Go back</n-button>
          <n-button type="primary" @click="saveToHistory"> Save to history </n-button>
        </n-space>
      </n-space>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBetStore } from '@/stores/bet.store'
import { useDraw } from '@/composables/useDraw'

const betStore = useBetStore()
const { runDraw } = useDraw()
const router = useRouter()

// const showModal = ref(false)

const showModal = computed(() => {
  return !betStore.drawInProgress && betStore.drawNumbers.length === 5
})

const isMatch = (number: number) => betStore.drawNumbers.includes(number)

onMounted(() => {
  runDraw()
})

// watch(
//   () => betStore.drawInProgress,
//   (inProgress) => {
//     if (!inProgress && betStore.drawNumbers.length === 5) {
//       showModal.value = true
//     }
//   },
// )

const goBack = () => {
  betStore.reset()
  router.push('/home')
}

const saveToHistory = async () => {
  try {
    await betStore.saveDrawToHistory()
    betStore.reset()
    router.push('/home')
  } catch (error) {
    console.error('Failed to save draw history', error)
    // optional: show error notification
  }
}
</script>

<style lang="scss" scoped>
.draw-page {
  padding: 2rem;
}

.draw-card,
.bet-card {
  height: 100%;
}

.balls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.ball {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &.match {
    background: #18a058;
    color: #fff;
    transform: scale(1.1);
  }
}

.winning-alert {
  margin-top: 1.5rem;
}

.winnings {
  margin-top: 1.5rem;
  font-size: 1.1rem;
}
</style>
