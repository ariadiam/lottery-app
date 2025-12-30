<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type FormInst, type FormRules } from 'naive-ui'
import { useAuthForm } from '@/composables/useAuthForm'

const router = useRouter()
const { loading, submit } = useAuthForm()

const formRef = ref<FormInst | null>(null)

const form = ref({
  email: '',
  password: '',
})

const rules: FormRules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Invalid email format', trigger: 'blur' },
  ],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      return
    }
    submit(form.value.email, form.value.password)
  })
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <n-card title="Sign In" style="max-width: 400px; margin: 4rem auto">
    <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
      <n-form-item label="Email" path="email">
        <n-input v-model:value="form.email" placeholder="Email" />
      </n-form-item>
      <n-form-item label="Password" path="password">
        <n-input v-model:value="form.password" type="password" placeholder="Password" />
      </n-form-item>
      <n-button type="primary" block :loading="loading" @click="handleSubmit"> Sign In </n-button>
    </n-form>
    <div style="text-align: center; margin-top: 1rem">
      <span>Don’t have an account?</span>
      <n-button text type="primary" style="margin-left: 0.5rem" @click="goToRegister">
        Register now
      </n-button>
    </div>
  </n-card>
</template>
