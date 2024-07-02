<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import inputWithHadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import { ref, Ref, watch } from 'vue'
import { addbanner } from '@/logics/specific/banner.handler'
import { useRouter } from 'vue-router'
// import { useRoute } from 'vue-router'
// import { onBeforeMount } from 'vue'
import { type banner } from '@/core/types/category.type'

// const route = useRoute()
const router = useRouter()
const titleValue = ref('')
const url = ref('')
const selectedFile = ref<File | null>(null)
const imageUrl = ref<string | undefined>(undefined)
const editMode = ref(false)

const serverData: Ref<banner> = ref({
  title: '',
  url: '',
  image: '',
})

// onBeforeMount(async () => {
//   if (route.query.mode === 'edit') editMode.value = true
//   const id = route.query.id
//   if (editMode.value === true) serverData.value = await getTag(id)
// })

watch(
  serverData,
  (newData) => {
    titleValue.value = newData.title
  },
  { immediate: true }
)

const onAddtags = async () => {
  const formData = new FormData()
  formData.append('title', titleValue.value)
  formData.append('url', url.value)
  formData.append('selectedFile', selectedFile.value as Blob)

  const res = await addbanner(formData)
  if (res.id) {
    router.push('/dashboard/banner/list')
  }
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
    imageUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

const onUpdateTags = async () => {
  const formData = new FormData()
  formData.append('title', titleValue.value)
  formData.append('url', url.value)
  formData.append('selectedFile', selectedFile.value as Blob)
  //   const res = await updateTags(route.query.id, model)
  //   console.log(res)
  //   if (res) {
  //     router.push({ name: 'tags-list' })
  //   }
}
</script>

<template>
  <content-layout place-return-button>
    <template #content-title> افزودن بنر </template>
    <template #content-body>
      <p class="mb-1">عکس بنر</p>
      <div
        class="w-full rounded border border-sec-gray mt-4 flex py-2 justify-between mb-3"
      >
        <label
          for=""
          class="border-l border-sec-gray px-2 text-xs py-2 w-[100px]"
          >عکس بنر</label
        >
        <input type="file" class="w-full mr-2" @change="onFileChange" />
      </div>
      <img v-if="imageUrl" :src="imageUrl" alt="" class="w-[200px] h-[200px]" />

      <div v-if="editMode === true">
        <inputWithHadline
          v-if="titleValue.length"
          v-model:value="titleValue"
          type="text"
          placeholder=" عنوان بنر را وارد کنید"
          headline="عنوان بنر "
          class="mb-2"
        />
      </div>
      <div v-else>
        <inputWithHadline
          v-model:value="titleValue"
          type="text"
          placeholder=" عنوان بنر را وارد کنید"
          headline="عنوان بنر "
          class="mb-2"
        />
        <inputWithHadline
          v-model:value="url"
          type="text"
          placeholder="ادرس بنر را وارد کنید"
          headline="ادرس بنر "
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
