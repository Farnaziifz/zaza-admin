<script lang="ts" setup>
// import type { TreeProps } from 'ant-design-vue'
// import { onMounted } from 'vue'
// import _ from 'lodash'
// import { ref, watch } from 'vue'

const props = defineProps({
  categoryData: {
    type: Object,
  },
})
</script>

<template>
  <p>{{ props.categoryData }}</p>
</template>
