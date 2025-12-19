import { create, NButton, NInput, NForm, NFormItem, NCard, NMessageProvider } from 'naive-ui'

export function createNaiveUI() {
  return create({
    components: [NButton, NInput, NForm, NFormItem, NCard, NMessageProvider],
  })
}
