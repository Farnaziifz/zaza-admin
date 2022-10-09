<script lang="ts" setup>
import { ref } from 'vue'

const serverData = ref()
</script>

<template>
  <div>
    <a-card style="margin: 8px 0; background-color: #f6f6f6">
      <div class="flex justify-between">
        <h2>فعال سازی کش‌بک</h2>
        <a-switch :checked-value="serverData.isActive" />
        <!--            @click="openSubmissionModal"-->
      </div>
    </a-card>
  </div>
</template>
