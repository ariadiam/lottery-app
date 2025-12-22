import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import type { User } from '@supabase/supabase-js'

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

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          this.error = error.message
          throw error
        }

        // user may exist even if session is null (email confirmation)
        this.user = data.user

        return {
          user: data.user,
          needsEmailConfirmation: !data.session,
        }
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          this.error = error.message
          throw error
        }

        this.user = data.user
        return data.user
      } finally {
        this.loading = false
      }
    },

    async loadSession() {
      this.loading = true

      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          this.error = error.message
          throw error
        }

        this.user = data.session?.user ?? null
      } finally {
        this.loading = false
      }
    },
    initAuthListener() {
      supabase.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user ?? null
      })
    },

    async logout() {
      this.loading = true
      this.error = null

      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          this.error = error.message
          throw error
        }

        this.user = null
      } finally {
        this.loading = false
      }
    },
  },
})
