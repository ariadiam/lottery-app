import { ref } from 'vue'
import { useMessage } from 'naive-ui'

export function useAuthForm() {
  const loading = ref(false)
  const message = useMessage()

  async function submit(
    action: () => Promise<void>,
    onSuccess: () => void,
    successMessage: string,
  ) {
    loading.value = true

    try {
      await action()
      message.success(successMessage)
      onSuccess()
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
