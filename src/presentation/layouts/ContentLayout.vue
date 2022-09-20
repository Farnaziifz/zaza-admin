<script setup lang="ts"></script>

<template>
  <div class="px-6 py-10 background-color-pure-white">
    <div class="content-header-container">
      <h1 class="mb-6">
        <slot name="content-title"></slot>
      </h1>
      <div class="content-actions">
        <slot name="content-actions"></slot>
      </div>
    </div>
    <slot name="content-body"></slot>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/assets/styles/contentLayout.scss';
</style>
