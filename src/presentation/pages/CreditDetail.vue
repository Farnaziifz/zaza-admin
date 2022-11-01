<script lang="ts" setup>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import { useRoute } from 'vue-router'
import { onMounted, Ref } from 'vue'
import { initHandler } from '@/logics/specific/creditDetail.handler'
import { ref } from 'vue'
import { groupTitle } from '@/core/types/group.type'
import { credit } from '@/core/types/credits.type'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import pd from 'persian-date'
//TODO => create a route so you can read the credit id from it

//TODO => make an api call with the id you've read from route params
/*
 *TODO => create the second api call with response of the first one
 * to do this you need to make a query builder in order to send the query to it
 */

const serverData: Ref<
  { creditDetails: credit; groupDetails: groupTitle } | undefined
> = ref()
onMounted(async () => {
  const creditId = useRoute().params.id as string
  serverData.value = await initHandler(creditId)
})

//TODO => show the data in the application as you wanted to.
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>جزئیات اعتبار</template>
    <template #layout-content>
      <a-card
        :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="coupon-info-card"
      >
        <div>
          <span style="font-weight: 700; font-size: 20px; color: #1894ff">
            اطلاعات اعتبار
          </span>
        </div>
        <div class="flex flex-row flex-wrap items-center mt-6">
          <div class="flex flex-col ml-16">
            <span style="font-weight: 400; font-size: 16px"> مبلغ اعتبار </span>
            <span style="font-weight: 500; font-size: 18px">
              {{ serverData?.creditDetails.amount }} تومان
            </span>
          </div>

          <div class="flex flex-col ml-16">
            <span style="font-weight: 400; font-size: 16px"> مدت </span>
            <span style="font-weight: 500; font-size: 18px">
              {{ serverData?.creditDetails.hasPeriod ? 'دارد' : 'ندارد' }}
            </span>
          </div>

          <div
            v-if="serverData?.creditDetails.hasPeriod"
            class="flex flex-col ml-16"
          >
            <span style="font-weight: 400; font-size: 16px">
              تاریخ و زمان شروع
            </span>
            <span style="font-weight: 500; font-size: 18px">
              {{
                new pd(serverData?.creditDetails.startAt)
                  .toLocale('fa')
                  .format('DD')
              }}
              {{
                new pd(serverData?.creditDetails.startAt)
                  .toLocale('fa')
                  .format('MMMM')
              }}
              {{
                new pd(serverData?.creditDetails.startAt)
                  .toLocale('fa')
                  .format('YYYY')
              }}
            </span>
          </div>

          <div
            v-if="serverData?.creditDetails.hasPeriod"
            class="flex flex-col ml-16"
          >
            <span style="font-weight: 400; font-size: 16px">
              تاریخ و زمان پایان
            </span>
            <span style="font-weight: 500; font-size: 18px">
              {{
                new pd(serverData?.creditDetails.expireAt)
                  .toLocale('fa')
                  .format('DD')
              }}
              {{
                new pd(serverData?.creditDetails.expireAt)
                  .toLocale('fa')
                  .format('MMMM')
              }}
              {{
                new pd(serverData?.creditDetails.expireAt)
                  .toLocale('fa')
                  .format('YYYY')
              }}
            </span>
          </div>
        </div>
      </a-card>

      <a-card
        :body-style="{
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          marginTop: '8px',
        }"
        :bordered="false"
        class="coupon-info-card"
      >
        <div>
          <span style="font-weight: 700; font-size: 20px; color: #1894ff">
            اطلاعات مشتریان هدف
          </span>
        </div>

        <div class="flex flex-row flex-wrap items-center mt-6">
          <div class="flex flex-col ml-16">
            <span style="font-weight: 400; font-size: 16px"> دسته‌بندی </span>
            <span
              v-for="d in serverData?.groupDetails.items"
              :key="d.groupId"
              style="font-weight: 500; font-size: 18px"
            >
              {{ d.title }}
            </span>
          </div>

          <div class="flex flex-col ml-16">
            <span style="font-weight: 400; font-size: 16px">
              تعداد مشتریان
            </span>
            <span
              v-for="d in serverData?.groupDetails.items"
              :key="d.groupId"
              style="font-weight: 500; font-size: 18px"
            >
              {{ d.customersCount }} مشتری
            </span>
          </div>
        </div>
      </a-card>
    </template>
  </IncentiveDetailLayout>
</template>
