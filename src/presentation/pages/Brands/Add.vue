<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
// import { useRoute } from 'vue-router'
import inputWithHadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import { ref } from 'vue'

// const route = useRoute()
const titleValue = ref('')
const descirption = ref('')
</script>

<template>
  <content-layout place-return-button>
    <template #content-title> افزودن برند </template>
    <template #content-body>
      <inputWithHadline
        v-model:value="titleValue"
        type="text"
        placeholder=" عنوان برند را وارد کنید"
        headline="عنوان برند "
      />
      <a-textarea
        v-model:value="descirption"
        placeholder="توضیجات برند را "
        auto-size
      />
    </template>
  </content-layout>
</template>

<style lang="scss"></style>
