<script lang="ts" setup>
import LogoIcon from "/src/presentation/components/shared/atoms/logoIcon.vue"
import {ref, watch} from "vue";

const props = defineProps(
    {
      collapsed: {
        required: true,
        type: Boolean,
      }
    }
)

watch(props, (newProp) => {
  collapsed.value = newProp.collapsed
}, {deep: true})

const collapsed = ref(props.collapsed)
</script>

<template>
  <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      breakpoint="sm"
      reverse-arrow
      :trigger="null"
      collapsed-width="0"
      theme="light"
      class="shadow-[0px_2px_8px_rgba(0,0,0,0.15)]"
  >
    <logo-icon class="mt-4"/>
  </a-layout-sider>
</template>

<style scoped lang="sass">

</style>