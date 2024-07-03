<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import inputWithHadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import { ref, Ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  blogAdd,
  getBlog,
  //   updateBrand,
} from '@/logics/specific/blog.handler'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'
import { type blog } from '@/core/types/blog.type'
import { initPageHandler } from '@/logics/specific/category.handler'
import {} from '@/logics/specific/blog.handler'
import { type categoryList } from '@/core/types/category.type'

const route = useRoute()
const router = useRouter()
const titleValue = ref('')
const seoSlug = ref('')
const seoDescription = ref('')
const seoTitle = ref('')
const descirption = ref('')
const postCategorySelected = ref()
const selectedFile = ref<File | null>(null)
const imageUrl = ref<string | undefined>(undefined)
const editMode = ref(false)

const serverData: Ref<blog> = ref({
  title: '',
  seo_slug: '',
  seo_description: '',
  seo_title: '',
  body: '',
  thumbnail: '',
})
const categoryListData: Ref<categoryList> = ref({
  total_pages: 0,
  next: 0,
  previous: 0,
  current_page: 0,
  results: [],
  count: 0,
})

onBeforeMount(async () => {
  categoryListData.value = await initPageHandler()
  if (route.query.mode === 'edit') editMode.value = true
  const id = route.query.id
  if (editMode.value === true) serverData.value = await getBlog(id as string)
})

watch(
  serverData,
  (newData) => {
    titleValue.value = newData.title
    seoSlug.value = newData.seo_slug
    seoDescription.value = newData.seo_description
    seoTitle.value = newData.seo_title
    descirption.value = newData.body
    imageUrl.value = newData.thumbnail
  },
  { immediate: true }
)

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
    imageUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

const onAddBrand = async () => {
  console.log(postCategorySelected.value)
  const formData = new FormData()
  formData.append('title', titleValue.value)
  formData.append('body', descirption.value)
  formData.append('thumbnail', selectedFile.value as Blob)
  formData.append('seo_title', seoTitle.value)
  formData.append('seo_description', seoDescription.value)
  formData.append('seo_slug', seoSlug.value)
  formData.append('category', postCategorySelected.value)

  const res = await blogAdd(formData)
  if (res.id) {
    router.push('/dashboard/blog/list')
  }
}

const onUpdateBrand = async () => {
  const formData = new FormData()
  formData.append('title', titleValue.value)
  formData.append('description', descirption.value)
  formData.append('description', descirption.value)
  formData.append('image', selectedFile.value as Blob)
  formData.append('seo_title', seoTitle.value)
  formData.append('seo_description', seoDescription.value)
  formData.append('seo_slug', seoSlug.value)
  //   const res = await updateBrand(route.query.id, formData)
  //   console.log(res)
}
</script>

<template>
  <content-layout place-return-button>
    <template #content-title> افزودن پست </template>
    <template #content-body>
      <p class="mb-1">عکس پست</p>
      <div
        class="w-full rounded border border-sec-gray mt-4 flex py-2 justify-between mb-3"
      >
        <label
          for=""
          class="border-l border-sec-gray px-2 text-xs py-2 w-[100px]"
          >عکس پست</label
        >
        <input type="file" class="w-full mr-2" @change="onFileChange" />
      </div>
      <img v-if="imageUrl" :src="imageUrl" alt="" class="w-[200px] h-[200px]" />

      <div v-if="editMode === true">
        <inputWithHadline
          v-if="titleValue.length"
          v-model:value="titleValue"
          type="text"
          placeholder=" عنوان پست را وارد کنید"
          headline="عنوان پست "
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

        <p class="mb-1">توضیجات پست</p>
        <QuillEditor
          v-if="descirption.length"
          v-model:content="descirption"
          theme="snow"
          content-type="html"
          toolbar="full"
        />
      </div>
      <div v-else>
        <inputWithHadline
          v-model:value="titleValue"
          type="text"
          placeholder=" عنوان پست را وارد کنید"
          headline="عنوان پست "
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
        <p>دسته بندی پست</p>
        <a-select
          v-model:value="postCategorySelected"
          style="width: 100%"
          placeholder="انتخاب دسته بندی"
          option-label-prop="label"
          :options="
            categoryListData.results.map((el) => {
              return {
                value: el.id,
                label: el.title_main,
                icon: el.thumbnail_main,
              }
            })
          "
        >
          <template #option="{ value: val, label, icon }">
            <div class="flex justify-between items-center">
              <span role="img" :aria-label="val">{{ label }}</span>
              <img :src="icon" alt="" class="w-14 h-10" />
            </div>
          </template>
        </a-select>

        <p class="mb-1">توضیجات پست</p>
        <QuillEditor
          v-model:content="descirption"
          theme="snow"
          content-type="html"
          toolbar="full"
        />
      </div>
      <div class="mt-4 w-full flex justify-end" v-if="!editMode">
        <a-button type="primary" @click="onAddBrand">افزودن</a-button>
      </div>
      <div class="mt-4 w-full flex justify-end" v-else>
        <a-button type="primary" @click="onUpdateBrand">ویرایش</a-button>
      </div>
    </template>
  </content-layout>
</template>

<style lang="scss"></style>
