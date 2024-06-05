<script lang="ts">
import {defineComponent, reactive} from 'vue'
import {ElectricityAllAPI} from "@/apis/ElectricityApi";
import {DeleteOutlined, EditOutlined, EyeOutlined, MonitorOutlined} from "@ant-design/icons-vue";
import ModalCheck from "@/components/home/electricity/ModalCheck.vue";
import ModalEdit from "@/components/home/electricity/ModalEdit.vue";
import ModalDelete from "@/components/home/electricity/ModalDelete.vue";
import ModalAddThisMonth from "@/components/home/electricity/ModalAddThisMonth.vue";
import ModalAddAllTime from "@/components/home/electricity/ModalAddAllTime.vue";
import ModalSelectTimepicker from "@/components/home/electricity/ModalSelectTimepicker.vue";

export default defineComponent({
  name: "DashElectricity",
  components: {
    ModalSelectTimepicker,
    ModalAddThisMonth,
    ModalAddAllTime,
    ModalDelete, ModalEdit, ModalCheck, MonitorOutlined, EditOutlined, DeleteOutlined, EyeOutlined
  },
  data() {
    return {
      getElectricity: {} as ElectricityAllEntity,
      calculateElectricity: reactive<number>(0.0),
      calculateElectricityBill: reactive<number>(0.0),
      modalAdd: false,
      modalAddTime: false,
      modalCheck: false,
      modalCheckUUID: "",
      modalEdit: false,
      modalDelete: false,
      modalTimepicker: false,
      hasUpdate: false
    }
  },
  methods: {
    async getElectricityFunc() {
      this.calculateElectricity = 0.0;
      this.calculateElectricityBill = 0.0;
      const getRes = await ElectricityAllAPI();
      if (getRes.output === "Success") {
        this.getElectricity = getRes.data!!
        if (this.getElectricity.electricity.length === 0) {
          this.calculateElectricity = 0.0
          this.calculateElectricityBill = 0.0
        } else {
          // 统计总电价
          this.getElectricity.electricity.forEach((item: ElectricityEntity) => {
            this.calculateElectricity += item.total_electricity
          });
          // 统计总电费
          this.getElectricity.electricity.forEach((item: ElectricityEntity) => {
            this.calculateElectricityBill += item.total_bill
          });
        }
      }
    }
  },
  async created() {
    document.title = '仪表盘 - 电费概览';
    await this.getElectricityFunc();
  },
  watch: {
    async hasUpdate(val) {
      if (val) {
        await this.getElectricityFunc();
        this.hasUpdate = false;
      }
    }
  }
})
</script>

<template>
  <div class="p-16 grid grid-cols-12 gap-8">
    <div class="col-span-9">
      <div class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white gap-3">
        <div class="grid justify-between">
          <div class="flex items-center mb-3 text-2xl font-bold">
            <MonitorOutlined class="pe-3"/>
            <span>电费明细</span>
          </div>
        </div>
        <hr/>
        <div>
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
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-end">操作</th>
              </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
              <tr v-for="(value, index) in getElectricity.electricity" :key="index" class="odd:bg-gray-50">
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
                <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-end">
                  <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                    <button class="py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                            @click="() => {modalCheck = true; modalCheckUUID = value.ce_uuid}">
                      <EyeOutlined/>
                    </button>
                    <button class="border-x py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                            @click="() => {modalEdit = true; modalCheckUUID = value.ce_uuid}">
                      <EditOutlined/>
                    </button>
                    <button
                        class="py-1 px-3 text-gray-700 hover:bg-red-200 focus:relative flex items-center bg-red-100"
                        @click="() => {modalDelete = true; modalCheckUUID = value.ce_uuid}">
                      <DeleteOutlined/>
                    </button>
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-3">
      <div class="rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white gap-3">
        <div class="grid gap-3 mb-4">
          <div class="flex h-max justify-between items-end gap-3">
            <button
                class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                @click="() => modalAdd = true"
            >
              创建电费
            </button>
            <button
                class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                @click="() => modalAddTime = true"
            >
              补充创建
            </button>
          </div>
          <div class="flex h-max justify-between items-end gap-3">
            <button
                class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                @click="() => modalTimepicker = true"
            >
              通过周期时间查询
            </button>
          </div>
        </div>
        <hr class="mx-10" />
        <div class="grid gap-3 mt-4">
          <div
              class="flex justify-center rounded-lg p-2 shadow-sm shadow-indigo-100 bg-gradient-to-tr from-blue-200/25 to-blue-400/25">
            <span class="text-lg font-extralight">电费计数</span>
            <span class="text-lg font-extrabold mx-2">{{ getElectricity.total }}</span>
            <span class="text-lg font-extralight">单</span>
          </div>
          <div
              class="flex justify-center rounded-lg p-2 shadow-sm shadow-indigo-100 bg-gradient-to-tr from-yellow-200/25 to-yellow-400/25">
            <span class="text-lg font-extralight">总计电价</span>
            <span class="text-lg font-extrabold mx-2">{{ calculateElectricity.toFixed(2) }}</span>
            <span class="text-lg font-extralight">度</span>
          </div>
          <div
              class="flex justify-center rounded-lg p-2 shadow-sm shadow-indigo-100 bg-gradient-to-tr from-emerald-200/25 to-emerald-400/25">
            <span class="text-lg font-extralight">总计电费</span>
            <span class="text-lg font-extrabold mx-2">{{ calculateElectricityBill.toFixed(2) }}</span>
            <span class="text-lg font-extralight">元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalCheck :ce-uuid="modalCheckUUID" :show-modal="modalCheck" @updateModal="(val) => modalCheck = val"/>
  <ModalSelectTimepicker :show-modal="modalTimepicker" @updateModal="(val) => modalTimepicker = val"/>
  <ModalAddThisMonth :show-modal="modalAdd" @isNew="(val) => hasUpdate = val" @updateModal="(val) => modalAdd = val"/>
  <ModalAddAllTime :show-modal="modalAddTime" @isNew="(val) => hasUpdate = val"
                   @updateModal="(val) => modalAddTime = val"/>
  <ModalEdit :ce-uuid="modalCheckUUID" :show-modal="modalEdit" @isNew="(val) => hasUpdate = val"
             @updateModal="(val) => modalEdit = val"/>
  <ModalDelete :ce-uuid="modalCheckUUID" :show-modal="modalDelete" @isNew="(val) => hasUpdate = val"
               @updateModal="(val) => modalDelete = val"/>
</template>
