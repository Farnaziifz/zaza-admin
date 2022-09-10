<script setup lang="ts"></script>

<template>
  <div class="px-6 pt-10">
    <h1 class="mb-6">
      <slot name="content-title"></slot>
    </h1>

    <slot name="content-body"></slot>
  </div>
</template>