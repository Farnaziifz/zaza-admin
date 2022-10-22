<script lang="ts" setup>
import { chartVariant } from '@/core/enums/chartType.enum'
import { Bar, Line, Pie } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
} from 'chart.js'
import { computed } from 'vue'

type chartProps = {
  chartType: chartVariant
  customId?: string
  dataSetIdKey?: string
  width?: number
  height?: number
  cssClasses?: string
  plugins?: string
  chartData: {
    labels?: string[]
    dataset?: [{ data: string[] | number[] }]
  } & object
  chartOptions: { responsive?: boolean } & object
}

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
)

const charts = {
  Bar,
  Pie,
  Line,
}
const props = defineProps<chartProps>()
const chartType = computed(() => charts[props.chartType])
</script>

<template>
  <component
    :is="chartType"
    :chart-options="props.chartOptions"
    :chart-data="props.chartData"
  ></component>
</template>
