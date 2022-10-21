<script lang="ts" setup>
import { Bar, Pie, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'
import { computed } from 'vue'
import { chartProps } from '@/core/types/chart.type'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
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
