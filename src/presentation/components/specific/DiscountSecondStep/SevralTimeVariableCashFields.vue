<script lang="ts" setup>
import { ref, computed, Ref } from 'vue'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import _ from 'lodash'
import { showErrorMessage } from '@/logics/shared/message.handler'
import EditIcon from '/src/presentation/components/shared/atoms/EditIcon.vue'
import DeleteIcon from '/src/presentation/components/shared/atoms/DeleteIcon.vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'

type varibelItem = {
  id: string
  price: string
}
const emits = defineEmits(['onChangeRemainingPrice'])

const minPayPriceInput = ref('')
const discountPriceInput = ref('')
const visibleeModal = ref<boolean>(false)
const visibleEditModal = ref<boolean>(false)
const varibalePrice = ref('')
const varibleCount = ref(0)
const varibleItem: Ref<varibelItem[]> = ref([])
const itemForEdit = ref({ id: '', price: '' })
const itemForDelete = ref({ id: '', price: '' })
const openVaribaleModal = () => {
  visibleeModal.value = true
}

const btnVaribleDisable = computed(() => {
  if (
    minPayPriceInput.value &&
    discountPriceInput.value &&
    _.toNumber(checkSumPriceInArray(varibleItem.value)) !==
      _.toNumber(discountPriceInput.value)
  ) {
    return false
  }
  return true
})
const remainingPrice = computed(() => {
  const remain =
    _.toNumber(discountPriceInput.value) -
    _.toNumber(checkSumPriceInArray(varibleItem.value))
  return remain
})

const confirmModal = async () => {
  if (
    varibleItem.value.length === 0 &&
    varibalePrice.value <= discountPriceInput.value
  ) {
    varibleItem.value.push({
      id: _.toString(varibleCount.value + 1),
      price: varibalePrice.value,
    })
    emits('onChangeRemainingPrice', remainingPrice.value)

    varibleCount.value++
    varibalePrice.value = ''
  } else {
    if (
      _.toNumber(varibalePrice.value) +
        _.toNumber(checkSumPriceInArray(varibleItem.value)) >
      _.toNumber(discountPriceInput.value)
    ) {
      showErrorMessage('مبلغ مرتبه بیش از مبلغ تخفیف تعیین شده است.')
    } else {
      varibleItem.value.push({
        id: _.toString(varibleCount.value + 1),
        price: varibalePrice.value,
      })
      emits('onChangeRemainingPrice', remainingPrice.value)
      varibleCount.value++
      varibalePrice.value = ''
    }
  }

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

const testKey = ref('')
const openVariableEditModal = (id: string, price: string) => {
  itemForEdit.value.id = id
  testKey.value = id
  itemForEdit.value.price = price
  visibleEditModal.value = true
}

const confirmEditModal = () => {
  varibleItem.value.find((el) => {
    if (el.id === itemForEdit.value.id) {
      el.price = itemForEdit.value.price
      visibleEditModal.value = false
    }
  })
}

const showDeleteModal = (id: string, price: string) => {
  itemForDelete.value.id = id
  itemForDelete.value.price = price
  Modal.confirm({
    title: 'حذف مرتبه',
    icon: createVNode(ExclamationCircleOutlined),
    content: `آیا از حذف مرتبه ${id} مطمئن هستید؟`,
    onOk() {
      varibleItem.value = varibleItem.value.filter((el) => el.id !== id)
    },
  })
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
            :disabled="!!varibleItem.length"
          />
        </div>
      </div>
      <a-button
        type="dashed"
        style="padding: 0 56px"
        class="mr-4"
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
            :headline="`مبلغ مرتبه ${varibleItem.length + 1}`"
            unit="تومان"
            v-model:value="varibalePrice"
            style="width: 220px"
            class="mr-4"
            placeholder="مبلغ مرتبه"
          />
        </div>
        <div class="mt-4">
          <a-typography-text type="primary" class="varible-hint"
            >{{ $filters.toPersianCurrency(remainingPrice, 'تومان') }} از مبلغ
            تخفیف باقی مانده است.</a-typography-text
          >
        </div>
      </a-modal>
      <a-modal
        v-model:visible="visibleEditModal"
        title="ویرایش مرتبه"
        ok-text="ویرایش"
        cancel-text="بستن"
        @ok="confirmEditModal"
        :key="testKey"
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
            :headline="`مبلغ مرتبه ${itemForEdit.id}`"
            unit="تومان"
            v-model:value="itemForEdit.price"
            style="width: 220px"
            class="mr-4"
            placeholder="مبلغ مرتبه"
          />
        </div>
      </a-modal>
    </div>
    <div class="varibale-item-container mt-4 flex items-center flex-wrap">
      <a-card
        v-for="(item, index) in varibleItem"
        :key="item.id"
        class="item-card"
        style="width: 280px"
      >
        <div class="title-container flex justify-between">
          <div class="title">مرتبه {{ index + 1 }}</div>
          <div class="actions flex">
            <EditIcon
              color="#1894FF"
              class="ml-4"
              @click="openVariableEditModal(item.id, item.price)"
            />
            <DeleteIcon
              color="#F5222D"
              @click="showDeleteModal(item.id, item.price)"
            />
          </div>
        </div>
        <div class="price-container mt-4">
          {{ $filters.toPersianCurrency(_.toNumber(item.price), 'تومان') }}
        </div>
        <div class="hint-container mt-4" v-if="remainingPrice !== 0">
          <a-typography-text type="danger"
            ><span v-if="_.toNumber(index) + 1 === varibleItem.length">
              {{ $filters.toPersianCurrency(remainingPrice, 'تومان') }}
              باقی‌مانده
            </span></a-typography-text
          >
        </div>
      </a-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.varible-hint {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #1894ff;
}
.title {
  color: #1894ff;
}
.hint-container {
  height: 24px;
}
.item-card {
  margin-left: 16px;
  margin-bottom: 16px;
}
</style>
