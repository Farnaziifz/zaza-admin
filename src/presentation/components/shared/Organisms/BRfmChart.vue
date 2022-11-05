<script lang="ts" setup>
import _ from 'lodash'
import RfmBox from '@/presentation/components/shared/atoms/RfmBox.vue'
import { computed } from 'vue'

type rfmProps = {
  width?: number
  height?: number
  heroAmount: number
  loyalAmount: number
  attentionNeedAmount: number
  normalAmount: number
  churnAmount: number
  lazyAmount: number
}

const props = withDefaults(defineProps<rfmProps>(), {
  height: 80,
  width: 512,
})
const heroLoyalAttentionNeedSum = computed(
  () => props.attentionNeedAmount + props.loyalAmount + props.heroAmount
)

const heroPercentage = computed(
  () => props.heroAmount / heroLoyalAttentionNeedSum.value
)
const loyalPercentage = computed(
  () => props.loyalAmount / heroLoyalAttentionNeedSum.value
)

const heroLoyalPercentageSum = computed(
  () => heroPercentage.value + loyalPercentage.value
)

const attentionNeedPercentage = computed(
  () => props.attentionNeedAmount / heroLoyalAttentionNeedSum.value
)

const heroLoyalHeight = computed(
  () => heroLoyalPercentageSum.value * props.height
)
const attentionNeedHeight = computed(() => props.height - heroLoyalHeight.value)

const heroWidth = computed(
  () => (heroPercentage.value * props.width) / heroLoyalPercentageSum.value / 2
)
const loyalWidth = computed(
  () => (loyalPercentage.value * props.width) / heroLoyalPercentageSum.value / 2
)
const attentionNeedWidth = props.width / 2

//----------------------------------------------------
const normalLazyChurnSum = computed(
  () => props.normalAmount + props.lazyAmount + props.churnAmount
)

const normalPercentage = computed(
  () => props.normalAmount / normalLazyChurnSum.value
)
const churnPercentage = computed(
  () => props.churnAmount / normalLazyChurnSum.value
)
const lazyPercentage = computed(
  () => props.lazyAmount / normalLazyChurnSum.value
)
const lazyChurnPercentageSum = computed(
  () => churnPercentage.value + lazyPercentage.value
)

const lazyChurnHeight = computed(
  () => lazyChurnPercentageSum.value * props.height
)
const lazyWidth = computed(
  () => (lazyPercentage.value * props.width) / lazyChurnPercentageSum.value / 2
)
const churnWidth = computed(
  () => (churnPercentage.value * props.width) / lazyChurnPercentageSum.value / 2
)

const normalHeight = computed(() => props.height - lazyChurnHeight.value)
const normalWidth = computed(() => props.width / 2)
</script>
<template>
  <div class="flex flex-row">
    <div class="flex flex-col">
      <div class="flex flex-row" :style="{ height: `${heroLoyalHeight}px` }">
        <rfm-box
          :width="heroWidth"
          :height="heroLoyalHeight"
          background-color="#0B4272"
          text-color="#f0f0f0"
          :tooltip-title="`%  قهرمانان: ${_.floor(heroPercentage * 100)} `"
        >
          <template #text>
            قهرمانان
            <br />
            {{ _.floor(heroPercentage * 100) }}%
          </template>
        </rfm-box>

        <rfm-box
          background-color="#1373C6"
          :width="loyalWidth"
          :height="heroLoyalHeight"
          text-color="#f0f0f0"
          :tooltip-title="` % وفادارها: ${_.floor(loyalPercentage * 100)}`"
        >
          <template #text>
            وفادار ها
            <br />
            {{ _.floor(loyalPercentage * 100) }} %
          </template>
        </rfm-box>
      </div>
      <rfm-box
        text-color="#f0f0f0"
        background-color="#74AFFF"
        :width="attentionNeedWidth"
        :height="attentionNeedHeight"
        :tooltip-title="`% نیازمند توجه ها: ${_.floor(
          attentionNeedPercentage * 100
        )}`"
      >
        <template #text>
          نیازمند توجه ها
          {{ _.floor(attentionNeedPercentage * 100) }}
          %
        </template>
      </rfm-box>
    </div>
    <div class="flex flex-col">
      <rfm-box
        background-color="#FF727E"
        :width="normalWidth"
        :height="normalHeight"
        text-color="#fff"
        :tooltip-title="`% معمولی ها: ${_.floor(normalPercentage * 100)}`"
      >
        <template #text>
          معمولی ها
          {{ _.floor(normalPercentage * 100) }}
          %
        </template>
      </rfm-box>

      <div class="flex flex-row" :style="{ height: `${lazyChurnHeight}px` }">
        <rfm-box
          background-color="#C6002F"
          :width="lazyWidth"
          :height="lazyChurnHeight"
          text-color="#fff"
          :tooltip-title="`% خواب آلودها: ${_.floor(lazyPercentage * 100)}`"
        >
          <template #text>
            خواب آلود ها
            <br />
            {{ _.floor(lazyPercentage * 100) }}
            %
          </template>
        </rfm-box>
        <rfm-box
          :tooltip-title="`% از دست رفته ها ${_.floor(churnPercentage * 100)}`"
          background-color="#72001B"
          :width="churnWidth"
          :height="lazyChurnHeight"
          text-color="#fff"
        >
          <template #text>
            از دست رفته ها
            <br />
            {{ _.floor(churnPercentage * 100) }}
            %
          </template>
        </rfm-box>
      </div>
    </div>
  </div>
</template>
