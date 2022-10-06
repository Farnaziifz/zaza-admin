<script lang="ts" setup>
import CustomerScor from '/src/presentation/components/specific/Customer/CustomerIncentive/score.vue'
import { ref } from 'vue'
const radioValue = ref<string>('score')

//api call must to move in parent but for deadline its ignore

</script>
<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
  >
    <a-typography-title :level="4"> مشوق ها</a-typography-title>
    <a-radio-group v-model:value="radioValue" button-style="solid">
      <a-radio-button value="score">امتیازهای دریافتی</a-radio-button>
      <a-radio-button value="price">جایزه</a-radio-button>
      <a-radio-button value="cash">هدیه اعتباری</a-radio-button>
      <a-radio-button value="discount">کد تخفیف</a-radio-button>
      <a-radio-button value="cashback">کش‌بک</a-radio-button>
      <a-radio-button value="coupon">کوپن</a-radio-button>
    </a-radio-group>
    <div v-if="radioValue === 'score'"><CustomerScor /></div>
    <div v-if="radioValue === 'b'">bbb</div>
  </a-card>
</template>
