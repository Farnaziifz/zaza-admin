import _ from 'lodash'

export const degreeChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'ارزیابی جایگاه مشتریان',
      align: 'end',
      padding: {
        bottom: 24,
      },
      font: {
        size: 16,
        family: 'YekanBakh',
        weight: 500,
      },
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
        textAlign: 'right',
        font: {
          size: 14,
          family: 'YekanBakh',
          weight: 500,
        },
      },
    },
  },
}

export const orderChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'ارزیابی رضایتمندی مشتریان',
      align: 'end',
      padding: {
        bottom: 24,
      },
      font: {
        size: 16,
        family: 'YekanBakh',
        weight: 500,
      },
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
        textAlign: 'right',
        font: {
          size: 14,
          family: 'YekanBakh',
          weight: 500,
        },
      },
    },
  },
}

export const discountCharOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'ارزیابی عملکرد تخفیف‌ها',
      align: 'end',
      padding: {
        bottom: 24,
      },
      font: {
        size: 16,
        family: 'YekanBakh',
        weight: 500,
      },
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
        font: {
          size: 12,
          family: 'YekanBakh',
          weight: 700,
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value: number | string, index: number) => {
          return _.toString(index) + 'م'
        },
      },
    },
  },
}

export const promotionChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'ارزیابی عملکرد هدیه اعتباری',
      align: 'end',
      padding: {
        bottom: 24,
      },
      font: {
        size: 16,
        family: 'YekanBakh',
        weight: 500,
      },
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
        font: {
          size: 12,
          family: 'YekanBakh',
          weight: 700,
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value: number | string, index: number) => {
          return _.toString(index) + 'م'
        },
      },
    },
  },
}

export const cashbackChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'ارزیابی عملکرد کش‌بک',
      align: 'end',
      padding: {
        bottom: 24,
      },
      font: {
        size: 16,

        family: 'YekanBakh',
        weight: 500,
      },
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
        font: {
          size: 12,
          family: 'YekanBakh',
          weight: 700,
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value: number | string, index: number) => {
          return _.toString(index) + 'م'
        },
      },
    },
  },
}
