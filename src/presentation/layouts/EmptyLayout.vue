<script setup lang="ts"></script>
<template>
  <div class="empty-layout-container">
    <div class="px-6 pt-10">
      <div class="empty-img-container">
        <img src="../../assets/static/empty-image.svg" alt="" />
      </div>
      <div class="empty-text">
        <p>
          <slot name="empty-text"></slot>
        </p>
      </div>
      <div class="action-container">
        <slot name="empty-action"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'src/assets/styles/emptyLayout.scss';
</style>
