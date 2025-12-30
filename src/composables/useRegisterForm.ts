import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

export function useRegisterForm() {
  const loading = ref(false)
  const message = useMessage()

  async function submit(email: string, password: string) {
    loading.value = true

    try {
      await useAuthStore().register(email, password)
      message.success('Registration successful! Please log in.')
      router.push('/login')
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message)
      } else {
        message.error('An error occurred. Please try again.')
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    submit,
  }
}
