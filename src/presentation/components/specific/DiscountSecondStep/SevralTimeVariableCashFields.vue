<script lang="ts" setup>
import { ref, computed, Ref } from 'vue'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import _ from 'lodash'
type varibelItem = {
  id: string
  price: string
}
const minPayPriceInput = ref('')
const discountPriceInput = ref('')
const visibleeModal = ref<boolean>(false)
const varibalePrice = ref('')
const varibleCount = ref(0)
const varibleItem: Ref<varibelItem[]> = ref([])

const openVaribaleModal = () => {
  visibleeModal.value = true
}

const btnVaribleDisable = computed(() => {
  if (minPayPriceInput.value && discountPriceInput.value) {
    return false
  }
  return true
})
const confirmModal = async () => {
  if (varibleItem.value.length === 0) {
    varibleItem.value.push({
      id: _.toString(varibleCount.value + 1),
      price: varibalePrice.value,
    })
  } else {
    if (
      varibalePrice.value + checkSumPriceInArray(varibleItem.value) >
      discountPriceInput.value
    ) {
      console.log('nmishe agha jooon')
    } else {
      varibleItem.value.push({
        id: _.toString(varibleCount.value + 1),
        price: varibalePrice.value,
      })
    }
  }

  varibleCount.value++
  varibalePrice.value = ''
  visibleeModal.value = false
}
const checkSumPriceInArray = (arr: { id: string; price: string }[]) => {
  const sumPriceItem = arr
    .map((a) => {
      return a.price
    })
    .reduce((a, b) => {
      return _.toNumber(a) + _.toNumber(b)
    }, 0)
  return sumPriceItem
}
</script>

<template>
  <div>
    <div class="flex mt-4 items-end">
      <div>
        <div class="flex flex-wrap items-center mt-6">
          <input-with-headline-and-unit
            headline="حداقل مبلغ پرداختی"
            placeholder="حداقل مبلغ پرداختی را وارد کنید"
            unit="تومان"
            style="max-width: 256px"
            v-model:value="minPayPriceInput"
          />
          <input-with-headline-and-unit
            headline="مبلغ تخفیف"
            placeholder="مبلغ تخفیف را وارد کنید"
            unit="تومان"
            style="max-width: 256px"
            v-model:value="discountPriceInput"
            class="mr-4"
          />
        </div>
      </div>
      <a-button
        type="primary"
        style="padding: 0 56px"
        class="button-secondary mr-4"
        @click="openVaribaleModal"
        :disabled="btnVaribleDisable"
      >
        افزودن مرتبه
      </a-button>
      <a-modal
        v-model:visible="visibleeModal"
        title="افزودن مرتبه"
        ok-text="افزودن"
        cancel-text="بستن"
        @ok="confirmModal"
      >
        <div class="flex flex-wrap items-center">
          <input-with-headline-and-unit
            headline="مبلغ تخفیف"
            unit="تومان"
            v-model:value="discountPriceInput"
            :disabled="true"
            style="width: 220px"
            placeholder="مبلغ تخفیف را وارد کنید"
          />
          <input-with-headline-and-unit
            :headline="`مبلغ مرتبه ${varibleCount + 1}`"
            unit="تومان"
            v-model:value="varibalePrice"
            style="width: 220px"
            class="mr-4"
            placeholder="مبلغ مرتبه"
          />
        </div>
      </a-modal>
    </div>
    <div class="varibale-item-container mt-4 flex items-center">
      <a-card v-for="item in varibleItem" :key="item.id" class="ml-4">
        {{ item }}
      </a-card>
    </div>
  </div>
</template>
