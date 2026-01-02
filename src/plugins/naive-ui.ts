import {
  create,
  NInput,
  NForm,
  NFormItem,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  NButton,
  NAvatar,
  NCard,
  NIcon,
  NMessageProvider,
  NGrid,
  NGi,
  NTag,
} from 'naive-ui'

export function createNaiveUI() {
  return create({
    components: [
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NMenu,
      NButton,
      NAvatar,
      NCard,
      NInput,
      NForm,
      NFormItem,
      NIcon,
      NMessageProvider,
      NGrid,
      NGi,
      NTag,
    ],
  })
}
