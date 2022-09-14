import CollapsableIcon from './CollapsableIcon.vue'

type collapsableIconPropsType = {
  isCollapsed: boolean
}

export default {
  title: 'MainLayout/CollapsableIcon',
  component: CollapsableIcon,
}

const Template = (args: collapsableIconPropsType) => ({
  components: {
    CollapsableIcon,
  },

  setup() {
    return args
  },

  template:
    '<collapsable-icon :is-collapsed="isCollapsed" @changeCollapse="isCollapsed = !isCollapsed"  />',
})

export const IconTest = Template.bind({})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
IconTest.args = {
  isCollapsed: false,
}
