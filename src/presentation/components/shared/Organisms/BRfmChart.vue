<script lang="ts" setup>
import _ from 'lodash'
import RfmBox from '@/presentation/components/shared/atoms/RfmBox.vue'

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
const heroLoyalAttentionNeedSum =
  props.attentionNeedAmount + props.loyalAmount + props.heroAmount

const heroPercentage = props.heroAmount / heroLoyalAttentionNeedSum
const loyalPercentage = props.loyalAmount / heroLoyalAttentionNeedSum
const heroLoyalPercentageSum = heroPercentage + loyalPercentage
const attentionNeedPercentage =
  props.attentionNeedAmount / heroLoyalAttentionNeedSum

const heroLoyalHeight = heroLoyalPercentageSum * props.height
const attentionNeedHeight = props.height - heroLoyalHeight

const heroWidth = (heroPercentage * props.width) / heroLoyalPercentageSum / 2
const loyalWidth = (loyalPercentage * props.width) / heroLoyalPercentageSum / 2
const attentionNeedWidth = props.width / 2

//----------------------------------------------------
//normal V lazy & churn
const normalLazyChurnSum =
  props.normalAmount + props.lazyAmount + props.churnAmount

const normalPercentage = props.normalAmount / normalLazyChurnSum
const churnPercentage = props.churnAmount / normalLazyChurnSum
const lazyPercentage = props.lazyAmount / normalLazyChurnSum
const lazyChurnPercentageSum = churnPercentage + lazyPercentage

const lazyChurnHeight = lazyChurnPercentageSum * props.height
const lazyWidth = (lazyPercentage * props.width) / lazyChurnPercentageSum / 2
const churnWidth = (churnPercentage * props.width) / lazyChurnPercentageSum / 2

const normalHeight = props.height - lazyChurnHeight
const normalWidth = props.width / 2
</script>
<template>
  <div class="flex flex-row">
    <div class="flex flex-col">
      <div class="flex flex-row" :style="{ height: `${heroLoyalHeight}px` }">
        <rfm-box
          :width="heroWidth"
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
