<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import inputWithHadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import { ref, Ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  addcategory,
  getcategory,
  updatecategory,
} from '@/logics/specific/category.handler'
import { initPageHandler } from '@/logics/specific/banner.handler'

import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'
import { type category, bannerList } from '@/core/types/category.type'

const route = useRoute()
const router = useRouter()
const title_main = ref('')
const short_description_main = ref('')
const description_main = ref('')
const seoSlug = ref('')
const seoDescription = ref('')
const seoTitle = ref('')
const descirption = ref('')
const title_blog = ref('')
const title_service = ref('')
const title_product = ref('')
const bannerSelectedList = ref([])
const selectedFile = ref<File | null>(null)
const imageUrl = ref<string | undefined>(undefined)
const editMode = ref(false)

const serverData: Ref<category> = ref({
  title_main: '',
  short_description_main: '',
  description_main: '',
  thumbnail_main: '',
  title_blog: '',
  title_service: '',
  title_product: '',
  is_special: false,
  seo_slug: '',
  seo_title: '',
  seo_description: '',
  banner_main: [],
  children: [],
})

const bannerData: Ref<bannerList> = ref({
  total_pages: 0,
  next: 0,
  previous: 0,
  current_page: 0,
  results: [],
  count: 0,
})

onBeforeMount(async () => {
  bannerData.value = await initPageHandler()
  if (route.query.mode === 'edit') editMode.value = true
  const id = route.query.id
  if (editMode.value === true) serverData.value = await getcategory(id as string)
})

watch(
  serverData,
  (newData) => {
    title_main.value = newData.title_main
    short_description_main.value = newData.short_description_main
    description_main.value = newData.description_main
    seoSlug.value = newData.seo_slug
    seoDescription.value = newData.seo_description
    seoTitle.value = newData.seo_title
    imageUrl.value = newData.thumbnail_main
    title_blog.value = newData.title_blog
    title_service.value = newData.title_service
    title_product.value = newData.title_product
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

const onAddcategory = async () => {
  console.log(bannerSelectedList.value)
  const formData = new FormData()
  formData.append('title_main', title_main.value)
  formData.append('short_description_main', short_description_main.value)
  formData.append('description_main', description_main.value)
  formData.append('thumbnail_main', selectedFile.value as Blob)
  formData.append('title_blog', title_blog.value)
  formData.append('title_service', title_service.value)
  formData.append('seo_title', seoTitle.value)
  formData.append('seo_description', seoDescription.value)
  formData.append('title_product', title_product.value)
  formData.append('seo_slug', seoSlug.value)
  bannerSelectedList.value.forEach((banner, index) => {
    formData.append(`banner_main[${index}]`, banner)
  })
  const res = await addcategory(formData)
  if (res.id) {
    router.push('/dashboard/category/list')
  }
}

const onUpdatecategory = async () => {
  const formData = new FormData()

  formData.append('title_main', title_main.value)
  formData.append('short_description_main', short_description_main.value)
  formData.append('description_main', description_main.value)
  formData.append('title_blog', title_blog.value)
  formData.append('thumbnail_main', selectedFile.value as Blob)
  formData.append('title_service', title_service.value)
  formData.append('seo_title', seoTitle.value)
  formData.append('seo_description', seoDescription.value)
  formData.append('seo_slug', seoSlug.value)
  const res = await updatecategory(route.query.id as string, formData)
  console.log(res)
}
</script>

<template>
  <content-layout place-return-button>
    <template #content-title> افزودن دسته بندی </template>
    <template #content-body>
      <p class="mb-1">عکس دسته بندی</p>
      <div
        class="w-full rounded border border-sec-gray mt-4 flex py-2 justify-between mb-3"
      >
        <label
          for=""
          class="border-l border-sec-gray px-2 text-xs py-2 w-[100px]"
          >عکس دسته بندی</label
        >
        <input type="file" class="w-full mr-2" @change="onFileChange" />
      </div>
      <img v-if="imageUrl" :src="imageUrl" alt="" class="w-[200px] h-[200px]" />

      <div v-if="editMode === true">
        <inputWithHadline
          v-if="title_main.length"
          v-model:value="title_main"
          type="text"
          placeholder=" عنوان دسته بندی را وارد کنید"
          headline="عنوان دسته بندی "
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

        <p class="mb-1">توضیجات دسته بندی</p>
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
          v-model:value="title_main"
          type="text"
          placeholder=" عنوان اصلی دسته بندی را وارد کنید"
          headline="عنوان دسته بندی "
          class="mb-2"
        />
        <inputWithHadline
          v-model:value="short_description_main"
          type="text"
          placeholder=" یک توضیج کوتاه برای دسته بندی  وارد کنید"
          headline="توضیج کوتاه دسته بندی "
          class="mb-2"
        />

        <inputWithHadline
          v-model:value="short_description_main"
          type="text"
          placeholder=" یک توضیج کامل برای دسته بندی  وارد کنید"
          headline="توضیج کامل دسته بندی "
          class="mb-2"
        />
        <inputWithHadline
          v-model:value="title_blog"
          type="text"
          placeholder="عنوان دسته بندی برای مجله"
          headline="عنوان دسته بندی برای مجله"
          class="mb-2"
        />
        <inputWithHadline
          v-model:value="title_product"
          type="text"
          placeholder="عنوان دسته بندی برای محصول"
          headline="عنوان دسته بندی برای محصول"
          class="mb-2"
        />
        <inputWithHadline
          v-model:value="title_service"
          type="text"
          placeholder="عنوان دسته بندی برای خدمات"
          headline="عنوان دسته بندی برای خدمات"
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
        <p>انتخاب بنر</p>
        <a-select
          v-model:value="bannerSelectedList"
          mode="multiple"
          style="width: 100%"
          placeholder="select one country"
          option-label-prop="label"
          :options="
            bannerData.results.map((el) => {
              return {
                value: el.id,
                label: el.title,
                icon: el.image,
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
      </div>
      <div class="mt-4 w-full flex justify-end" v-if="!editMode">
        <a-button type="primary" @click="onAddcategory">افزودن</a-button>
      </div>
      <div class="mt-4 w-full flex justify-end" v-else>
        <a-button type="primary" @click="onUpdatecategory">ویرایش</a-button>
      </div>
    </template>
  </content-layout>
</template>

<style lang="scss"></style>
