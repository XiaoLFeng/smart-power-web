<script lang="ts">
import {defineComponent} from 'vue'
import {MoneyCollectOutlined, MonitorOutlined} from "@ant-design/icons-vue";
import {ElectricityGetRateAPI} from "@/apis/ElectricityApi";

export default defineComponent({
  name: "DashPrice",
  components: {MoneyCollectOutlined, MonitorOutlined},
  data() {
    return {
      getRateList: {} as RateDataEntity,
      thisMonthRate: {} as RateEntity,
      hasThisMonthRate: false,
    }
  },
  methods: {
    getThisMonth(): string {
      const getDate = new Date();
      // 如果月份非两位数则补 0
      if ((getDate.getMonth() + 1) < 10) {
        return getDate.getFullYear().toString() + "0" + (getDate.getMonth() + 1).toString();
      } else {
        return getDate.getFullYear().toString() + (getDate.getMonth() + 1).toString();
      }
    }
  },
  async created() {
    document.title = '仪表盘 - 电价概览';
    const getRes = await ElectricityGetRateAPI();
    if (getRes.output === "Success") {
      this.getRateList = getRes.data;
      console.log(this.getThisMonth());
      // 循环遍历获取当前月份
      this.getRateList.rate.forEach((item: RateEntity) => {
        if (item.periodAt === this.getThisMonth()) {
          this.thisMonthRate = item;
          this.hasThisMonthRate = true;
        }
      });
    }
  }
})
</script>

<template>
  <div class="p-16 grid grid-cols-12 items-center h-screen">
    <div class="h-full shadow shadow-indigo-100 rounded-lg bg-white p-8 col-span-12">
      <div class="text-2xl flex items-center font-bold mb-5">
        <MoneyCollectOutlined class="pe-3"/>
        <span>本月电价</span>
      </div>
      <div class="w-full mb-5">
        <dl v-if="hasThisMonthRate" class="-my-3 divide-y divide-gray-100 text-sm px-3">
          <div class="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">计价周期</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ thisMonthRate.periodAt }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">谷电价(元/度)</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ thisMonthRate.valleyRate }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">峰电价(元/度)</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ thisMonthRate.peakRate }}</dd>
          </div>
          <div class="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">更新时间</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ thisMonthRate.updatedAt }}</dd>
          </div>
        </dl>
        <div v-else class="text-center py-2">
          <span class="text-2xl font-bold text-gray-500">暂无本月电价信息，请等待创建电价</span>
        </div>
      </div>
      <div class="grid justify-between">
        <div class="flex items-center mb-5 text-2xl font-bold">
          <MonitorOutlined class="pe-3"/>
          <span>历史电价</span>
        </div>
      </div>
      <hr/>
      <div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm" v-if="getRateList.total !== 0">
            <thead class="text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">电价序列</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">电价周期</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">谷电价单价</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">峰电价单价</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">创建时间</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">更新时间</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
            <tr v-for="(value, index) in getRateList.rate" :key="index" class="odd:bg-gray-50">
              <td v-if="value.periodAt !== getThisMonth()"
                  class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.id }}
              </td>
              <td v-if="value.periodAt !== getThisMonth()"
                  class="whitespace-nowrap px-4 py-2 text-gray-900">
                {{ value.periodAt }}
              </td>
              <td v-if="value.periodAt !== getThisMonth()"
                  class="whitespace-nowrap px-4 py-2 text-gray-900">
                {{ value.valleyRate }}
                <span class="font-medium">元/度</span>
              </td>
              <td v-if="value.periodAt !== getThisMonth()"
                  class="whitespace-nowrap px-4 py-2 text-gray-900">
                {{ value.peakRate }}
                <span class="font-medium">元/度</span>
              </td>
              <td v-if="value.periodAt !== getThisMonth()"
                  class="whitespace-nowrap px-4 py-2 text-gray-900">
                {{ value.createdAt }}
              </td>
              <td v-if="value.periodAt !== getThisMonth()"
                  class="whitespace-nowrap px-4 py-2 text-gray-700">
                {{ value.updatedAt }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
