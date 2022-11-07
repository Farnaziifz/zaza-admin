<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import { onMounted, Ref, ref } from 'vue'
import {
  getCoupons,
  initHandler,
} from '@/logics/specific/reportCouponList.handler'
import { t } from 'vui18n'
import { composePaginationData } from '@/presentation/factory/shared/paginationComputedProp.factory'
import { goToPath } from '@/logics/shared/route.handler'
import EmptyLayout from '@/presentation/layouts/EmptyLayout.vue'
import { couponsList } from '@/core/types/coupons.type'
import { CouponsRewardsType } from '@/core/enums/couponsType.enum'
import _ from 'lodash'
import { SearchOutlined } from '@ant-design/icons-vue'
import { queryType, querySearch, queryList } from '@/logics/shared/queryBuilder'
import { CouponsTypesType } from '@/core/enums/couponsType.enum'

const typeFilter = (() => {
  const f = []
  for (const key in CouponsTypesType) {
    f.push({
      text: t(`types.couponTypeEnum.${key}`),
      value: key,
    })
  }
  return f
})()

const couponListColumn = [
  {
    title: 'عنوان کوپن',
    key: 'title',
    dataIndex: 'title',
    customFilterDropdown: true,
  },
  {
    title: 'نوع کوپن',
    key: 'type',
    dataIndex: 'type',
    filters: typeFilter,
  },
  {
    title: 'پاداش',
    key: 'reward',
    dataIndex: 'reward',
  },
  {
    title: 'تعداد مشتریان دریافت کننده کوپن',
    key: 'visit',
    dataIndex: 'visit',
  },
  {
    title: 'تعداد  مشتریان مصرف کرده',
    key: 'numberOfUsed',
    dataIndex: 'numberOfUsed',
  },
  {
    title: 'نرخ انتخاب',
    key: 'selectionRate',
    dataIndex: 'selectionRate',
  },
]

const serverData: Ref<couponsList | undefined> = ref()

onMounted(async () => {
  const res = await initHandler()
  serverData.value = res.data
})
const pagination = composePaginationData(serverData)
const onChangePagination = async (
  paginationData: { current: number },
  filters: object
) => {
  const q: queryList = []
  if (filters) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    filters?.type?.forEach((el) => {
      q.push({
        type: queryType.FILTER,
        data: {
          field: 'Type',
          operand: '==',
          value: el,
        },
      })
    })
  }
  const res = await getCoupons(paginationData.current, q)
  serverData.value = res.data
}

const search = async (selectedKeys: querySearch[]) => {
  const searchQueries = selectedKeys.map((el) => {
    el.keyword = decodeURI(el.keyword)
    return {
      type: queryType.SEARCH,
      data: el,
    }
  })
  const res = await getCoupons(1, searchQueries)
  if (res.data) serverData.value = res.data
}
const reset = async () => {
  const res = await getCoupons(pagination.value.current)

  if (res.data) serverData.value = res.data
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const searchInputChange = (e, setSelectedKeys, column) => {
  setSelectedKeys(
    e.target.value
      ? [
          {
            keyword: e.target.value,
            field: _.upperFirst(column.dataIndex),
          },
        ]
      : []
  )
}
</script>

<template>
  <content-layout>
    <template #content-title> گزارش کوپن‌ها</template>
    <template v-if="serverData" #content-body>
      <a-table
        :columns="couponListColumn"
        :data-source="serverData?.items"
        :pagination="pagination"
        @change="onChangePagination"
      >
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'type'">
            {{ t(`types.couponTypeEnum.${record.type}`) }}
          </span>
          <span v-if="column.key === 'reward'">
            <template v-if="record.reward === CouponsRewardsType.FREE_SHIPPING">
              {{ t(`types.couponRewardEnum.${record.reward}`) }}
            </template>
            <template v-if="record.reward === CouponsRewardsType.DISCOUNT">
              {{
                `${t('types.couponRewardEnum.' + record.reward)}
                 ${record.rewardValue.discountPercentage} درصدی`
              }}
              <template v-if="record.rewardValue.discountMaximumPrice">
                {{
                  `تا سقف
                  ${_.floor(record.rewardValue.discountMaximumPrice / 10)}
                  تومان`
                }}
              </template>
            </template>
            <template v-if="record.reward === CouponsRewardsType.CREDIT">
              {{ `${_.floor(record.rewardValue.amount / 10)} تومان اعتبار` }}
            </template>
            <template v-if="record.reward === CouponsRewardsType.PRODUCT">
              {{ `${record.rewardValue.title}` }}
            </template>
            <template v-if="record.reward === CouponsRewardsType.SCORE">
              {{ `${record.rewardValue.amount} امتیاز` }}
            </template>
          </span>
          <span v-if="column.key === 'visit'">
            {{ `${record.visit} مشتری` }}
          </span>
          <span v-if="column.key === 'numberOfUsed'">
            {{ `${record.numberOfUsed} مشتری` }}
          </span>
          <span v-if="column.key === 'selectionRate'">
            {{ `${record.selectionRate} درصد` }}
          </span>
        </template>

        <template
          #customFilterDropdown="{ setSelectedKeys, selectedKeys, column }"
        >
          <div style="padding: 8px">
            <a-input
              ref="searchInput"
              :placeholder="`جستجو در نام مشتری`"
              :value="selectedKeys[0]?.keyword"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="searchInputChange($event, setSelectedKeys, column)"
            />
            <a-button
              type="primary"
              size="small"
              style="width: 90px"
              class="ml-2"
              @click="search(selectedKeys)"
            >
              <template #icon>
                <SearchOutlined />
              </template>
              جستجو
            </a-button>
            <a-button
              size="small"
              style="width: 90px"
              @click="
                () => {
                  reset()
                  setSelectedKeys([])
                }
              "
            >
              پاک کردن
            </a-button>
          </div>
        </template>
        <template #customFilterIcon="{ filtered }">
          <search-outlined
            :style="{ color: filtered ? '#108ee9' : undefined }"
          />
        </template>
      </a-table>
    </template>

    <template v-else #content-body>
      <empty-layout>
        <template #empty-text> کوپنی یافت نشد.</template>
        <template #empty-action>
          <a-button
            class="button-secondary"
            type="primary"
            block
            @click="goToPath('/coupons/add')"
          >
            ساخت کوپن
          </a-button>
        </template>
      </empty-layout>
    </template>
  </content-layout>
</template>
