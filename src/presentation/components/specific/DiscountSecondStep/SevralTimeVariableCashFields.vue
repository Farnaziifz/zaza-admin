<script lang="ts" setup>
import { ref, computed, Ref, onBeforeMount } from 'vue'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import _ from 'lodash'
import { showErrorMessage } from '@/logics/shared/message.handler'
import EditIcon from '/src/presentation/components/shared/atoms/EditIcon.vue'
import DeleteIcon from '/src/presentation/components/shared/atoms/DeleteIcon.vue'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import { promotionStep } from '../../../../core/types/discounts.type'

// TODO: must refactor with v-model (Farnaz Farzipour)
const props = defineProps({
  defaultSteps: {
    default() {
      return []
    },
    type: Array,
  },
  amount: Number,
  minimumAmount: Number,
})

const emits = defineEmits([
  'onChangeRemainingPrice',
  'onUpdatePromotionStep',
  'onChangeMinAmount',
  'onChangeAmount',
])

const minimumAmount = ref()
const amount = ref()
const visibleeModal = ref<boolean>(false)
const visibleEditModal = ref<boolean>(false)
const varibalePrice = ref('')
const varibleCount = ref(0)
const promotionSteps: Ref<promotionStep[]> = ref([])
const itemForEdit = ref({ order: 0, amount: 0 })
const itemForDelete = ref({ order: 0, amount: 0 })
const testKey = ref('')

const openVaribaleModal = () => {
  visibleeModal.value = true
}

onBeforeMount(async () => {
  if (props.defaultSteps.length) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    promotionSteps.value = props.defaultSteps
  }
  if (props.amount) {
    amount.value = props.amount
  }
  if (props.minimumAmount) {
    minimumAmount.value = props.minimumAmount
  }
})

const btnVaribleDisable = computed(() => {
  if (
    minimumAmount.value &&
    amount.value &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    _.toNumber(checkSumPriceInArray(promotionSteps.value)) !==
      _.toNumber(amount.value)
  ) {
    return false
  }
  return true
})

const remainingPrice = computed(() => {
  const remain =
    _.toNumber(amount.value) -
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    _.toNumber(checkSumPriceInArray(promotionSteps.value))
  return remain
})

const confirmModal = async () => {
  if (
    promotionSteps.value.length === 0 &&
    varibalePrice.value <= amount.value
  ) {
    promotionSteps.value.push({
      order: _.toNumber(varibleCount.value + 1),
      amount: _.toNumber(varibalePrice.value),
    })
    emits('onChangeRemainingPrice', remainingPrice.value)

    varibleCount.value++
    varibalePrice.value = ''
  } else {
    if (
      _.toNumber(varibalePrice.value) +
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        _.toNumber(checkSumPriceInArray(promotionSteps.value)) >
      _.toNumber(amount.value)
    ) {
      showErrorMessage('مبلغ مرتبه بیش از مبلغ تخفیف تعیین شده است.')
    } else {
      promotionSteps.value.push({
        order: _.toNumber(varibleCount.value + 1),
        amount: _.toNumber(varibalePrice.value),
      })
      emits('onChangeRemainingPrice', remainingPrice.value)
      varibleCount.value++
      varibalePrice.value = ''
    }
  }
  emits('onUpdatePromotionStep', promotionSteps.value)
  visibleeModal.value = false
}

const checkSumPriceInArray = (arr: { order: number; amount: number }[]) => {
  const sumPriceItem = arr
    .map((a) => {
      return a.amount
    })
    .reduce((a, b) => {
      return _.toNumber(a) + _.toNumber(b)
    }, 0)
  return sumPriceItem
}

const openVariableEditModal = (order: number, amount: number) => {
  itemForEdit.value.order = order
  testKey.value = _.toString(order)
  itemForEdit.value.amount = amount
  visibleEditModal.value = true
}

const confirmEditModal = () => {
  promotionSteps.value.find((el) => {
    if (el.order === _.toNumber(itemForEdit.value.order)) {
      el.amount = _.toNumber(itemForEdit.value.amount)
      visibleEditModal.value = false
    }
  })
  emits('onUpdatePromotionStep', promotionSteps.value)
}

const showDeleteModal = (order: number, amount: number) => {
  itemForDelete.value.order = order
  itemForDelete.value.amount = amount
  Modal.confirm({
    title: 'حذف مرتبه',
    icon: createVNode(ExclamationCircleOutlined),
    content: `آیا از حذف مرتبه ${order} مطمئن هستید؟`,
    onOk() {
      promotionSteps.value = promotionSteps.value.filter(
        (el) => el.order !== order
      )
      emits('onUpdatePromotionStep', promotionSteps.value)
    },
  })
}
const onChangeMimAmount = () => {
  emits('onChangeMinAmount', minimumAmount.value)
}

const onChangeAmount = () => {
  emits('onChangeAmount', amount.value)
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
            v-model:value="minimumAmount"
            @input="onChangeMimAmount"
          />
          <input-with-headline-and-unit
            headline="مبلغ تخفیف"
            placeholder="مبلغ تخفیف را وارد کنید"
            unit="تومان"
            style="max-width: 256px"
            v-model:value="amount"
            class="mr-4"
            :disabled="!!promotionSteps.length"
            @input="onChangeAmount"
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
            v-model:value="amount"
            :disabled="true"
            style="width: 220px"
            placeholder="مبلغ تخفیف را وارد کنید"
          />
          <input-with-headline-and-unit
            :headline="`مبلغ مرتبه ${promotionSteps.length + 1}`"
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
            v-model:value="amount"
            :disabled="true"
            style="width: 220px"
            placeholder="مبلغ تخفیف را وارد کنید"
          />
          <input-with-headline-and-unit
            :headline="`مبلغ مرتبه ${itemForEdit.order}`"
            unit="تومان"
            v-model:value="itemForEdit.amount"
            style="width: 220px"
            class="mr-4"
            placeholder="مبلغ مرتبه"
          />
        </div>
      </a-modal>
    </div>
    <div class="varibale-item-container mt-4 flex items-center flex-wrap">
      <a-card
        v-for="(item, index) in promotionSteps"
        :key="item.order"
        class="item-card"
        style="width: 280px"
      >
        <div class="title-container flex justify-between">
          <div class="title">مرتبه {{ index + 1 }}</div>
          <div class="actions flex">
            <EditIcon
              color="#1894FF"
              class="ml-4"
              @click="
                openVariableEditModal(
                  _.toNumber(item.order),
                  _.toNumber(item.amount)
                )
              "
            />
            <DeleteIcon
              color="#F5222D"
              @click="
                showDeleteModal(_.toNumber(item.order), _.toNumber(item.amount))
              "
            />
          </div>
        </div>
        <div class="price-container mt-4">
          {{ $filters.toPersianCurrency(_.toNumber(item.amount), 'تومان') }}
        </div>
        <div class="hint-container mt-4" v-if="remainingPrice !== 0">
          <a-typography-text type="danger"
            ><span v-if="_.toNumber(index) + 1 === promotionSteps.length">
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
