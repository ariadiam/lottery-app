import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import type { User } from '@supabase/supabase-js/dist/index.cjs'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async register(email: string, password: string) {
      this.loading = true
      this.error = null

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        this.error = error.message
      } else {
        this.user = data.user
      }

      this.loading = false
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        this.error = error.message
      } else {
        this.user = data.user
      }

      this.loading = false
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },
  },
})
