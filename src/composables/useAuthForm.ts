import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

export function useAuthForm() {
  const loading = ref(false)
  const message = useMessage()

  async function submit(
    // action: () => Promise<void>,
    // onSuccess: () => void,
    // successMessage: string,
    email: string,
    password: string,
  ) {
    loading.value = true

    try {
      // await action()
      // message.success(successMessage)
      // onSuccess()
      await useAuthStore().login(email, password)
      message.success('Login successful!')
      router.push('/home')
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
