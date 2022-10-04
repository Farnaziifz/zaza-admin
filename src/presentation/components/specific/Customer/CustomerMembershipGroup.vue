<script lang="ts" setup>
type CustomerMembershipGroupPropsType = {
  groupData: { title: string }[]
}
const props = defineProps < CustomerMembershipGroupPropsType>()

</script>
<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
    v-if="props.groupData && props.groupData.length"
  >
    <a-typography-title :level="4">دسته بندی های عضو</a-typography-title>
    <div class="key">نام دسته بندی‌ها</div>
    <ul>
      <li v-for="(item, index) in props.groupData" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </a-card>
</template>

<style lang="scss" scoped>
.key {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #6d6d6d;
  margin-top: 24px;
}
li {
  list-style: disc;
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  margin-right: 16px;
}
</style>