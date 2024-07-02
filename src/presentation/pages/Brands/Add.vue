<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
// import { useRoute } from 'vue-router'
import inputWithHadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { addBrand } from '@/logics/specific/brands.handler'
import { useRouter } from 'vue-router'

const router = useRouter()
const titleValue = ref('')
const seoSlug = ref('')
const seoDescription = ref('')
const seoTitle = ref('')
const descirption = ref('')
const selectedFile = ref<File | null>(null)

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

const onAddBrand = async () => {
  const formData = new FormData()
  formData.append('title', titleValue.value)
  formData.append('description', descirption.value)
  formData.append('description', descirption.value)
  formData.append('image', selectedFile.value as Blob)
  formData.append('seo_title', seoTitle.value)
  formData.append('seo_description', seoDescription.value)
  formData.append('seo_slug', seoSlug.value)
  const res = await addBrand(formData)
  if (res.id) {
    router.push('/dashboard/brands/list')
  }
}
</script>

<template>
  <content-layout place-return-button>
    <template #content-title> افزودن برند </template>
    <template #content-body>
      <p class="mb-1">عکس برند</p>
      <div
        class="w-full rounded border border-sec-gray mt-4 flex py-2 justify-between mb-3"
      >
        <label
          for=""
          class="border-l border-sec-gray px-2 text-xs py-2 w-[100px]"
          >عکس برند</label
        >
        <input type="file" class="w-full mr-2" @change="onFileChange" />
      </div>
      <img :src="selectedFile" alt="" />
      <inputWithHadline
        v-model:value="titleValue"
        type="text"
        placeholder=" عنوان برند را وارد کنید"
        headline="عنوان برند "
        class="mb-2"
      />
      <inputWithHadline
        v-model:value="seoSlug"
        type="text"
        placeholder="Seo Slug"
        headline="Seo Slug"
        class="mb-2"
      />
      <inputWithHadline
        v-model:value="seoTitle"
        type="text"
        placeholder="Seo Title"
        headline="Seo Title"
        class="mb-2"
      />
      <inputWithHadline
        v-model:value="seoDescription"
        type="text"
        placeholder="Seo Description"
        headline="Seo Description"
        class="mb-2"
      />

      <p class="mb-1">توضیجات برند</p>
      <QuillEditor
        v-model:content="descirption"
        theme="snow"
        content-type="html"
        toolbar="full"
      />
      <div class="mt-4 w-full flex justify-end">
        <a-button type="primary" @click="onAddBrand">افزودن</a-button>
      </div>
    </template>
  </content-layout>
</template>

<style lang="scss"></style>
