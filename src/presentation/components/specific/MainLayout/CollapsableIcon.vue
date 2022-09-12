<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { defineProps } from 'vue'

const emit = defineEmits(['changeCollapse'])
const props = defineProps<collapsableIconPropsType>()

type collapsableIconPropsType = {
  isCollapsed: boolean
}

const changeCollapse = () => emit('changeCollapse')
</script>

<template>
  <menu-unfold-outlined
    v-if="!props.isCollapsed"
    class="trigger"
    @click="changeCollapse"
  />
  <menu-fold-outlined v-else class="trigger" @click="changeCollapse" />
</template>
