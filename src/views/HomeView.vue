<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBetStore } from '@/stores/bet.store'

const router = useRouter()
const betStore = useBetStore()

const numbers = Array.from({ length: 30 }, (_, index) => index + 1)

// Selected numbers from Pinia store
const selectedNumbers = computed(() => betStore.selectedNumbers)
const canSubmit = computed(() => betStore.hasBet)

const isNumberSelected = (number: number): boolean => {
  return selectedNumbers.value.includes(number)
}

const isNumberDisabled = (number: number): boolean => {
  return !isNumberSelected(number) && betStore.hasReachedLimit
}

const toggleNumber = (number: number) => {
  betStore.toggleNumber(number)
}

const submitBet = () => {
  router.push('/draw')
}
</script>

<template>
  <n-card title="Create your bet">
    <n-grid cols="2" x-gap="24" y-gap="24">
      <!-- LEFT -->
      <n-gi>
        <div class="number-board">
          <n-button
            v-for="number in numbers"
            :key="number"
            :type="isNumberSelected(number) ? 'primary' : 'default'"
            :disabled="isNumberDisabled(number)"
            @click="toggleNumber(number)"
          >
            {{ number }}
          </n-button>
        </div>
      </n-gi>

      <!-- RIGHT -->
      <n-gi>
        <div class="bet-panel">
          <h3>Selected Numbers</h3>

          <div class="selected-numbers">
            <n-tag
              v-for="number in selectedNumbers"
              :key="number"
              closable
              @close="betStore.removeNumber(number)"
            >
              {{ number }}
            </n-tag>
          </div>

          <n-button type="primary" :disabled="!canSubmit" @click="submitBet"> Submit Bet </n-button>
        </div>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<style lang="scss" scoped>
.number-board {
  display: grid;

  grid-template-columns: repeat(6, 1fr);

  gap: 0.5rem;
}

.bet-panel {
  display: flex;

  flex-direction: column;

  gap: 1rem;

  h3 {
    margin: 0;
  }
}

.selected-numbers {
  display: flex;

  flex-wrap: wrap;

  gap: 0.5rem;
}
</style>
