<script lang="ts">
import {defineComponent} from 'vue'
import AddThisMonthElectricityPrice from "@/components/console/electricity/modals/AddThisMonthElectricityPrice.vue";
import type {BaseResponse} from "@/models/BaseResponse";
import {MoneyCollectOutlined, MonitorOutlined, ThunderboltOutlined} from "@ant-design/icons-vue";
import {ElectricityGetRateAPI} from "@/apis/ElectricityApi";
import {ConsoleGetUserList} from "@/apis/ConsoleApi";

export default defineComponent({
  name: "ConsoleHome",
  components: {
    ThunderboltOutlined,
    MoneyCollectOutlined, MonitorOutlined, AddThisMonthElectricityPrice
  },
  inject: ["UserCurrent"],
  data() {
    return {
      showModal: false,
      getUserCurrent: {} as UserCurrentEntity,
      getRate: {} as RateEntity,
      hasRate: false,
      getAllUser: {} as UserAllEntity,
      getAllRate: {} as RateDataEntity
    }
  },
  methods: {
    getUserNumber() {
      if (this.getAllUser.list === null) {
        return 0;
      } else {
        return this.getAllUser.list?.length;
      }
    },
    getRateNumber() {
      if (this.getAllRate.rate === null) {
        return 0;
      } else {
        return this.getAllRate.rate?.length;
      }
    }
  },
  async created() {
    if (typeof this.UserCurrent === "function") {
      const getRes = await this.UserCurrent() as BaseResponse<UserCurrentEntity>;
      this.getUserCurrent = getRes.data!!;
    }
    document.title = '仪表盘 - 你好' + this.getUserCurrent.user?.username;
    const getRes = await ElectricityGetRateAPI();
    if (getRes.output === "Success") {
      if (getRes.data?.total === 0) {
        this.hasRate = false;
      } else {
        this.hasRate = true;
        getRes.data!!.rate!!.forEach((item: RateEntity) => {
          const date = new Date();
          if (item.periodAt === `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`) {
            this.getRate = item;
          }
        });
      }
    }
    const getAllUser = await ConsoleGetUserList();
    if (getAllUser.output === "Success") {
      this.getAllUser = getAllUser.data!!;
    }
    const getAllRate = await ElectricityGetRateAPI();
    if (getAllRate.output === "Success") {
      this.getAllRate = getAllRate.data!!;
    }
  },
})
</script>

<template>
  <div class="p-16 grid justify-center w-full gap-8 grid-cols-12">
    <div class="col-span-9 h-full">
      <div class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white h-full">
        <div class="m-2 grid gap-3">
          <div class="text-2xl flex items-center font-bold mb-1">
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
              <span class="text-2xl font-bold text-gray-500">暂无本月电价信息，快点创建一个吧</span>
            </div>
          </div>
          <div class="text-2xl flex items-center font-bold mt-3 mb-1">
            <MonitorOutlined class="pe-3"/>
            <span>看板</span>
          </div>
          <div class="w-full grid grid-cols-2 gap-3">
            <!-- 显示电价与用户总数 -->
            <div class="block rounded-lg p-4 shadow-md bg-indigo-50/50">
              <div class="m-2">
                <div class="text-sm text-gray-500 mb-3">用户信息</div>
                <div class="font-medium">当前一共有 {{ getUserNumber() }} 位注册用户</div>
              </div>
            </div>
            <div class="block rounded-lg p-4 shadow-md bg-emerald-50/50">
              <div class="m-2">
                <div class="text-sm text-gray-500 mb-3">总计电价</div>
                <div class="font-medium">当前一共创建 {{ getRateNumber() }} 组电价</div>
              </div>
            </div>
          </div>
          <div class="text-2xl flex items-center font-bold mt-3 mb-1">
            <ThunderboltOutlined class="pe-3"/>
            <span>近期电价</span>
          </div>
          <div class="grid gap-3">
            <div class="w-full">
              <table v-if="getAllRate.total !== 0" class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead class="text-left">
                <tr>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">电价周期</th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">单位谷电价</th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">单位峰电价</th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">更新时间</th>
                </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                <tr v-for="(value, index) in getAllRate.rate " :key="index" class="odd:bg-gray-50">
                  <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.periodAt }}</td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-900">
                    {{ value.valleyRate }}
                    <span class="font-medium">元/度</span>
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-900">
                    {{ value.peakRate }}
                    <span class="font-medium">元/度</span>
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.updatedAt }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-3">
      <div class="grid">
        <div class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white h-full gap-3">
          <div class="grid justify-center mt-2 mb-6 h-auto">
            <img
                alt=""
                class="w-40 h-40 rounded-full object-cover"
                src="@/assets/images/my_logo_image.png"
            />
          </div>
          <hr/>
          <div class="grid gap-3 my-4">
            <span class="text-2xl font-bold text-center">{{ getUserCurrent.user?.username }}</span>
          </div>
          <hr/>
          <div class="grid gap-3 mt-4">
            <div class="flex h-max justify-between items-end gap-3">
              <button
                  class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                  @click="() => showModal = true"
              >
                创建当月电价
              </button>
              <button
                  class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                  @click="$router.push({name: 'ConsoleAccount'})"
              >
                编辑个人信息
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddThisMonthElectricityPrice
      :show-modal="showModal"
      @updateModal="(val) => showModal = val"
  />
</template>
