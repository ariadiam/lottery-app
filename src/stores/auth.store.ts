import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'
import type { User } from '@supabase/supabase-js'

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
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
        console.debug('supabase signUp response:', { data, error })

        if (error) {
          this.error = error.message
          throw error
        }

        if (data.session) {
          await supabase.auth.signOut()
        }

        this.user = null

        return {
          success: true,
          // needsEmailConfirmation: !data.session,
        }
      } catch (err) {
        console.error('Registration error:', err)
        // return { success: false, error: this.error || 'Registration failed. Please try again.' }
        throw err
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

        // Returning user after successful login
        this.user = data.user
        return data.user
      } catch (err) {
        console.error('Login error:', err)
        // return { error: this.error || 'Login failed. Please try again.' }
        throw err
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

        // Setting user from session if available
        this.user = data.session?.user ?? null
      } catch (err) {
        console.error('Load session error:', err)
      } finally {
        this.loading = false
      }
    },

    initAuthListener() {
      // Listening for authentication state changes (useful for session persistence)
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
      } catch (err) {
        console.error('Logout error:', err)
      } finally {
        this.loading = false
      }
    },
  },
})
