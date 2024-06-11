<script lang="ts">
import {defineComponent, reactive} from 'vue'
import {
  BorderOuterOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  NotificationOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
import {ElectricityGetRegionAPI} from "@/apis/ElectricityApi";
import {message} from "ant-design-vue";

export default defineComponent({
  name: "ConsolePriceCalc",
  components: {
    UserOutlined,
    CalculatorOutlined,
    NotificationOutlined,
    CalendarOutlined,
    BorderOuterOutlined
  },
  data() {
    return {
      selectRegion: reactive<ElectricityRegionDTO>({} as ElectricityRegionDTO),
      getRegion: {} as ElectricityRegionEntity,
      startTime: null,
      endTime: ""
    }
  },
  created() {
    document.title = '仪表盘 - 电价区域计算';
  },
  methods: {
    async getRegionFunc() {
      // 检查输入信息是否完整
      if (this.selectRegion.region == undefined || this.startTime == undefined || this.endTime == undefined) {
        message.warn("请填写完整信息");
        return;
      }
      // 时间信息转换为年月日
      this.selectRegion.start_time = dayjs(this.startTime).format("YYYY-MM-DD");
      this.selectRegion.end_time = dayjs(this.endTime).format("YYYY-MM-DD");
      const getRes = await ElectricityGetRegionAPI(this.selectRegion);
      if (getRes.output === "Success") {
        this.getRegion = getRes.data!!;
        console.log(getRes.data);
      }
    }
  },
})
</script>

<template>
  <div class="p-16 grid gap-8">
    <div class="rounded-lg shadow shadow-indigo-100 bg-white p-4 grid gap-3">
      <div class="text-2xl font-bold flex items-center mb-1">
        <UserOutlined class="pe-3"/>
        <span>区域查询</span>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            for="region"
        >
          <input id="username"
                 v-model="selectRegion.region"
                 class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                 placeholder="region"
                 type="text"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            地域(例如:深圳)
          </span>
        </label>
        <a-date-picker v-model:value="startTime" class="shadow-sm border border-gray-400/50" picker="month"
                       placeholder="开始时间"/>
        <a-date-picker v-model:value="endTime" class="shadow-sm border border-gray-400/50" picker="month"
                       placeholder="结束时间"/>
        <button
            class="inline-block rounded border border-current px-4 py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
            @click="getRegionFunc()"
        >
          区域查询电价
        </button>
      </div>
      <div v-if="getRegion.region != undefined">
        <div class="text-2xl font-bold flex items-center mt-3 mb-1">
          <NotificationOutlined class="pe-3"/>
          <span>区域总体清单</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="block rounded-lg p-4 shadow-md bg-indigo-50/50">
            <div class="m-2">
              <div class="text-sm text-gray-500 mb-3">查询信息</div>
              <div class="font-medium">获取一些当前的查询信息概要</div>
            </div>
            <div class="m-2 grid grid-cols-2 gap-3 text-xs">
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <CalendarOutlined class="pe-1"/>
                  <span>开始时间 <span class="font-medium">{{ getRegion.start_time }}</span></span>
                </div>
              </div>
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <CalendarOutlined class="pe-1"/>
                  <span>结束时间 <span class="font-medium">{{ getRegion.end_time }}</span></span>
                </div>
              </div>
            </div>
            <div class="m-2 grid grid-cols-1 gap-3 text-xs">
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <BorderOuterOutlined class="pe-1"/>
                  <span>选择 <span class="font-medium">{{ getRegion.region }}</span> 地域</span>
                </div>
              </div>
            </div>
          </div>
          <div class="block rounded-lg p-4 shadow-md bg-emerald-50/50">
            <div class="m-2">
              <div class="text-sm text-gray-500 mb-3">区域统计</div>
              <div class="font-medium">对开销的内容进行统计</div>
            </div>
            <div class="m-2 grid grid-cols-3 gap-3 text-xs">
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <BorderOuterOutlined class="pe-1"/>
                  <span>谷开销 <span class="font-medium">{{ getRegion.total_valley_bill.toFixed(2) }}</span> 元</span>
                </div>
              </div>
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <CalendarOutlined class="pe-1"/>
                  <span>峰开销 <span class="font-medium">{{ getRegion.total_peak_bill.toFixed(2) }}</span> 元</span>
                </div>
              </div>
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <CalendarOutlined class="pe-1"/>
                  <span>谷消耗 <span class="font-medium">{{ getRegion.total_valley_electricity.toFixed(2) }}</span> 度</span>
                </div>
              </div>
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <CalendarOutlined class="pe-1"/>
                  <span>峰消耗 <span class="font-medium">{{ getRegion.total_peak_electricity.toFixed(2) }}</span> 度</span>
                </div>
              </div>
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <BorderOuterOutlined class="pe-1"/>
                  <span>总消耗 <span class="font-medium">{{ getRegion.total_electricity.toFixed(2) }}</span> 度</span>
                </div>
              </div>
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <div class="flex items-center">
                  <CalendarOutlined class="pe-1"/>
                  <span>总开销 <span class="font-medium">{{ getRegion.total_bill.toFixed(2) }}</span> 元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold flex items-center mt-3 mb-1">
          <CalculatorOutlined class="pe-3"/>
          <span>区域详细清单</span>
        </div>
        <div>
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">统一信用代码</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">企业名字</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">谷用电</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">峰用电</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">谷开销</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">峰开销</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">总计用电</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">总计开销</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
            <tr v-for="(value, index) in getRegion.company" :key="index" class="odd:bg-gray-50">
              <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.company.cods }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.company.name }}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.total_valley_electricity }} 度</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.total_peak_electricity }} 度</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.total_valley_bill }} 元</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.total_peak_bill }} 元</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.total_electricity }} 度</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.total_bill }} 元</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
