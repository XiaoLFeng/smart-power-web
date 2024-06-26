<script lang="ts">
import {defineComponent, ref} from 'vue'
import {MoneyCollectOutlined, MonitorOutlined} from "@ant-design/icons-vue";
import {ElectricityGetRateAPI} from "@/apis/ElectricityApi";

export default defineComponent({
  name: "DashInfo",
  components: {MoneyCollectOutlined, MonitorOutlined},
  props: {
    electricity: Object
  },
  data() {
    return {
      getElectricity: ref<ElectricityAllEntity>({} as ElectricityAllEntity),
      hasRate: false,
      getRate: {} as RateEntity
    }
  },
  async created() {
    const getRes = await ElectricityGetRateAPI();
    if (getRes.output === "Success") {
      if (getRes.data?.total === 0) {
        this.hasRate = false;
      } else {
        this.hasRate = true;
        getRes.data!!.rate?.forEach((item: RateEntity) => {
          const date = new Date();
          if (item.periodAt === `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`) {
            this.getRate = item;
          }
        });
      }
    }
  },
  watch: {
    electricity(val: ElectricityAllEntity) {
      this.getElectricity = val;
    }
  }
});
</script>

<template>
  <div class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white h-full">
    <div class="m-2 grid gap-3">
      <div class="text-2xl flex items-center font-bold mb-3">
        <MoneyCollectOutlined class="pe-3"/>
        <span>本月电价</span>
      </div>
      <div class="w-full mb-3">
        <dl v-if="hasRate" class="-my-3 divide-y divide-gray-100 text-sm px-3">
          <div class="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">计价周期</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ getRate.periodAt }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">谷电价(元/度)</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ getRate.valleyRate }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">峰电价(元/度)</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ getRate.peakRate }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">更新时间</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ getRate.updatedAt }}</dd>
          </div>
        </dl>
        <div v-else class="text-center py-2">
          <span class="text-2xl font-bold text-gray-500">暂无本月电价信息，当前不可创建电费，请等待创建电价</span>
        </div>
      </div>
      <div class="text-2xl flex items-center font-bold mb-3">
        <MonitorOutlined class="pe-3"/>
        <span>近期明细</span>
      </div>
      <div class="w-full">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">计费时间</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">谷用电</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">峰用电</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">谷开销</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">峰开销</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">更新时间</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
            <tr v-for="(value, index) in getElectricity?.electricity" :key="index" class="odd:bg-gray-50">
              <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.period_at }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.valley_electricity }}<span
                  class="font-medium">度</span></td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.peak_electricity }}<span
                  class="font-medium">度</span></td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.valley_electricity_bill }}<span
                  class="font-medium">元</span></td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.peak_electricity_bill }}<span
                  class="font-medium">元</span></td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.updated_at }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
