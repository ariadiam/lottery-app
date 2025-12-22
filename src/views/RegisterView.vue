<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
import { type FormInst, type FormRules } from 'naive-ui'
import { useAuthForm } from '@/composables/useAuthForm'

const authStore = useAuthStore()
const router = useRouter()
const { submit } = useAuthForm()
const formRef = ref<FormInst | null>(null)

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

const rules: FormRules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Invalid email format', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password', trigger: 'blur' },
    {
      validator: (_rule, value) => {
        return value === form.value.password
      },
      message: 'Passwords do not match',
      trigger: ['blur', 'input'],
    },
  ],
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      return
    }

    submit(
      async () => {
        await authStore.register(form.value.email, form.value.password)
      },
      () => {
        router.push('/login')
      },
      'Registration successful! Please log in.',
    )
  })
}
</script>

<template>
  <n-card title="Register" style="max-width: 400px; margin: 4rem auto">
    <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
      <n-form-item label="Email" path="email">
        <n-input v-model:value="form.email" placeholder="Email" />
      </n-form-item>
      <n-form-item label="Password" path="password">
        <n-input v-model:value="form.password" type="password" placeholder="Password" />
      </n-form-item>
      <n-form-item label="Confirm Password" path="confirmPassword">
        <n-input
          v-model:value="form.confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
      </n-form-item>
      <n-button type="primary" block :loading="authStore.loading" @click="handleSubmit">
        Sign up
      </n-button>
    </n-form>
  </n-card>
</template>
