import { vi, beforeEach } from 'vitest'
import { config } from '@vue/test-utils'

// Create persistent mock implementations
const mockSignUp = vi.fn()
const mockSignInWithPassword = vi.fn()
const mockSignOut = vi.fn()
const mockGetSession = vi.fn()
const mockOnAuthStateChange = vi.fn()

// Mock supabase globally
vi.mock('@/services/supabase', () => ({
  supabase: {
    auth: {
      signUp: mockSignUp,
      signInWithPassword: mockSignInWithPassword,
      signOut: mockSignOut,
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
    },
  },
}))

// Reset mock implementations before each test
beforeEach(() => {
  mockSignUp.mockReset().mockResolvedValue({ data: { user: null, session: null }, error: null })
  mockSignInWithPassword
    .mockReset()
    .mockResolvedValue({ data: { user: null, session: null }, error: null })
  mockSignOut.mockReset().mockResolvedValue({ error: null })
  mockGetSession.mockReset().mockResolvedValue({ data: { session: null }, error: null })
  mockOnAuthStateChange
    .mockReset()
    .mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } })
})

// Globally stub naive-ui components to avoid warnings in tests
config.global.stubs = {
  'n-message-provider': { name: 'n-message-provider', template: '<div><slot /></div>' },
  'n-layout': { name: 'n-layout', template: '<div><slot /></div>' },
  'n-layout-content': { name: 'n-layout-content', template: '<div><slot /></div>' },
  'n-layout-header': { name: 'n-layout-header', template: '<header><slot /></header>' },
  'n-menu': {
    name: 'n-menu',
    template: `
      <nav role="navigation">
        <div
          v-for="option in options"
          :key="option.key"
          v-bind="nodeProps ? nodeProps(option) : {}"
          @click="$emit('update:value', option.key)"
        >
          {{ option.label }}
        </div>
      </nav>
    `,
    props: ['value', 'options', 'nodeProps'],
    emits: ['update:value'],
  },
  'n-avatar': {
    name: 'n-avatar',
    template: '<div class="avatar" v-bind="$attrs"><slot /></div>',
  },
  'n-button': {
    name: 'n-button',
    template: '<button type="button" @click="handleClick"><slot /></button>',
    props: ['type', 'size', 'quaternary'],
    emits: ['click'],
    methods: {
      handleClick() {
        this.$emit('click')
      },
    },
  },
  'n-icon': { name: 'n-icon', template: '<span class="icon"><slot /></span>' },
  'n-card': { name: 'n-card', template: '<div class="card"><slot /></div>' },
  'n-form': { name: 'n-form', template: '<form><slot /></form>' },
  'n-form-item': { name: 'n-form-item', template: '<div class="form-item"><slot /></div>' },
  'n-input': {
    name: 'n-input',
    template: '<input :value="value ?? modelValue ?? ``" v-bind="$attrs" @input="handleInput" />',
    props: ['value', 'modelValue'],
    emits: ['update:value', 'update:modelValue', 'input'],
    methods: {
      handleInput(event: Event) {
        const target = event.target as HTMLInputElement | null
        const nextValue = target?.value ?? ''
        this.$emit('update:value', nextValue)
        this.$emit('update:modelValue', nextValue)
        this.$emit('input', event)
      },
    },
  },
  'n-grid': { name: 'n-grid', template: '<div class="grid"><slot /></div>' },
  'n-gi': { name: 'n-gi', template: '<div class="grid-item"><slot /></div>' },
  'n-tag': { name: 'n-tag', template: '<span class="tag"><slot /></span>' },
  'n-space': { name: 'n-space', template: '<div class="space"><slot /></div>' },
  'n-modal': { name: 'n-modal', template: '<div class="modal"><slot /></div>' },
  'n-alert': { name: 'n-alert', template: '<div class="alert"><slot /></div>' },
}
