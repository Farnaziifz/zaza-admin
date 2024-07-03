<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import inputWithHadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import { ref, Ref, watch } from 'vue'
import { addTags, getTag, updateTags } from '@/logics/specific/blog.handler'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'
import { type tag } from '@/core/types/tags.type'

const route = useRoute()
const router = useRouter()
const titleValue = ref('')
const seoSlug = ref('')
const seoDescription = ref('')
const seoTitle = ref('')
const editMode = ref(false)

const serverData: Ref<tag> = ref({
  title: '',
  seo_slug: '',
  seo_description: '',
  seo_title: '',
})

onBeforeMount(async () => {
  if (route.query.mode === 'edit') editMode.value = true
  const id = route.query.id
  if (editMode.value === true) serverData.value = await getTag(id as string)
})

watch(
  serverData,
  (newData) => {
    titleValue.value = newData.title
    seoSlug.value = newData.seo_slug
    seoDescription.value = newData.seo_description
    seoTitle.value = newData.seo_title
  },
  { immediate: true }
)

const onAddtags = async () => {
  const model = {
    title: titleValue.value,
    seo_slug: seoSlug.value,
    seo_description: seoDescription.value,
    seo_title: seoTitle.value,
  }

  const res = await addTags(model)
  if (res.id) {
    router.push('/dashboard/blog/tag-list')
  }
}

const onUpdateTags = async () => {
  const model = {
    title: titleValue.value,
    seo_slug: seoSlug.value,
    seo_description: seoDescription.value,
    seo_title: seoTitle.value,
  }
  const res = await updateTags(route.query.id as string, model)
  if (res) {
    router.push({ name: 'blog-tags-list' })
  }
}
</script>

<template>
  <content-layout place-return-button>
    <template #content-title> افزودن تگ </template>
    <template #content-body>
      <div v-if="editMode === true">
        <inputWithHadline
          v-if="titleValue.length"
          v-model:value="titleValue"
          type="text"
          placeholder=" عنوان تگ را وارد کنید"
          headline="عنوان تگ "
          class="mb-2"
        />
        <inputWithHadline
          v-if="seoSlug.length"
          v-model:value="seoSlug"
          type="text"
          placeholder="Seo Slug"
          headline="Seo Slug"
          class="mb-2"
        />

        <inputWithHadline
          v-if="seoTitle.length"
          v-model:value="seoTitle"
          type="text"
          placeholder="Seo Title"
          headline="Seo Title"
          class="mb-2"
        />
        <inputWithHadline
          v-if="seoDescription.length"
          v-model:value="seoDescription"
          type="text"
          placeholder="Seo Description"
          headline="Seo Description"
          class="mb-2"
        />
      </div>
      <div v-else>
        <inputWithHadline
          v-model:value="titleValue"
          type="text"
          placeholder=" عنوان تگ را وارد کنید"
          headline="عنوان تگ "
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
      </div>
      <div class="mt-4 w-full flex justify-end" v-if="!editMode">
        <a-button type="primary" @click="onAddtags">افزودن</a-button>
      </div>
      <div class="mt-4 w-full flex justify-end" v-else>
        <a-button type="primary" @click="onUpdateTags">ویرایش</a-button>
      </div>
    </template>
  </content-layout>
</template>

<style lang="scss"></style>
