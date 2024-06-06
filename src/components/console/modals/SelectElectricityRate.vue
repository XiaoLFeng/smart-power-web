<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SelectElectricityRate",
  props: {
    showModal: Boolean,
    getRate: {} as RateEntity,
  },
  data() {
    return {
      open: false,
      rate: {} as RateEntity,
    }
  },
  watch: {
    showModal(val) {
      this.open = val;
    },
    getRate(val) {
      this.rate = val;
    },
    open(val) {
      this.open = val
      this.$emit("updateModal", val);
    }
  }
});
</script>

<template>
  <a-modal v-model:open="open" title="电价详情">
    <div class="gap-3 flow-root pt-6">
      <dl class="-my-3 divide-y divide-gray-100 text-sm">
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">电价ID</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ rate.id }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">电价周期</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ rate.periodAt }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">单位谷电价</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ rate.valleyRate }} 元/度</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">单位峰电价</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ rate.peakRate }} 元/度</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">创建时间</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ rate.createdAt }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">修改时间</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ rate.updatedAt }}</dd>
        </div>
      </dl>
    </div>
    <template #footer>
      <button key="back" class="mt-3 transition border border-blue-400 text-blue-400 px-4 py-1 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow"
              @click="open = false">
        关闭
      </button>
    </template>
  </a-modal>
</template>

<style scoped>

</style>
