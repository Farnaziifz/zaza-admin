<script setup lang="ts">
import { ref } from 'vue'
import Logo from '../../assets/images/logo.svg'
import { login } from '@/logics/specific/auth.handler'
import router from '@/resources/router'

// import { useRouter } from 'vue-router'

// const router = useRouter()
const username = ref('')
const password = ref('')

const convertToEnglishDigits = (inp: string) => {
  // Define a map of Farsi digits to English digits
  const farsiDigits = '۰۱۲۳۴۵۶۷۸۹'
  const englishDigits = '0123456789'
  // Replace Farsi digits with English digits
  const pn = inp.replace(
    /[۰-۹]/g,
    (w: any) => englishDigits[farsiDigits.indexOf(w)]
  )

  return pn
}

const submitNumber = async () => {
  const res = await login(
    convertToEnglishDigits(username.value),
    password.value
  )
  if (res?.access) {
    router.push('/dashboard')
    localStorage.setItem('adminToken', res.access)
    localStorage.setItem('adminRefresh', res.refresh)
  }
}
</script>
<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="rounded border lg:border-sec-gray p-10 text-center">
      <a href="https://uat.zazakala.com/">
        <img :src="Logo" alt="zaza kala" class="mb-4 w-40 mx-auto" />
      </a>
      <p class="font-[dana-bold] font-xl">ورود به پنل مدیریتی</p>
      <p class="font-[dana-light] mt-3">سلام!</p>
      <p class="font-[dana-light] mt-3">
        لطفا شماره موبایل یا ایمیل خود را وارد کنید
      </p>
      <div class="flex flex-col">
        <input
          v-model="username"
          placeholder="نام کاربری"
          class="px-2 text-right w-[300px] bg-white lg:w-[400px] border-2 border-primary focus:outline-none py-3 mt-4 rounded indent-2"
        />
        <input
          v-model="password"
          placeholder="رمز عبور"
          type="password"
          class="px-2 text-right w-[300px] bg-white lg:w-[400px] border-2 border-primary focus:outline-none py-3 mt-4 rounded indent-2"
        />
        <button
          class="w-[300px] lg:w-[400px] block p-4 bg-primary rounded focus:outline-none text-white mt-10 font-[dana-light]"
          @click="submitNumber"
        >
          ارسال کد تایید
        </button>
      </div>
    </div>
  </div>
</template>
