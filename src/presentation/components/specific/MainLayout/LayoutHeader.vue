<script setup lang="ts">
import LayoutHeaderItem from './LayoutHeaderItem.vue'
import LayoutHeaderItemGroup from './LayoutHeaderItemGroup.vue'
</script>

<template>
  <a-layout-header style="background-color: #ff003d">
    <layout-header-item-group>
      <layout-header-item>
        <slot name="collapseIcon" />
        <slot name="businessName" />
      </layout-header-item>
      <layout-header-item>
        <slot name="adminName" />
      </layout-header-item>
    </layout-header-item-group>
  </a-layout-header>
</template>

<style scoped lang="sass"></style>
