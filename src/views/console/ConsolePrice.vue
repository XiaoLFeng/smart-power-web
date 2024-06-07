<script lang="ts">
import {defineComponent} from 'vue'
import AddThisMonthElectricityPrice from "@/components/console/electricity/modals/AddThisMonthElectricityPrice.vue";
import {ElectricityGetRateAPI} from "@/apis/ElectricityApi";
import {DeleteOutlined, EditOutlined, EyeOutlined, MoneyCollectOutlined} from "@ant-design/icons-vue";
import EditElectricityRate from "@/components/console/electricity/modals/EditElectricityRate.vue";
import SelectElectricityRate from "@/components/console/electricity/modals/SelectElectricityRate.vue";
import AddRateModal from "@/components/console/electricity/modals/AddRateModal.vue";
import DeleteElectricityRate from "@/components/console/electricity/modals/DeleteElectricityRate.vue";

export default defineComponent({
  name: "ConsolePrice",
  components: {
    DeleteElectricityRate,
    AddRateModal,
    SelectElectricityRate,
    EditElectricityRate,
    EditOutlined, DeleteOutlined, EyeOutlined, AddThisMonthElectricityPrice, MoneyCollectOutlined
  },
  data() {
    return {
      isNew: false,
      rateList: {} as RateDataEntity,
      selectModal: false,
      addThisMonthRateModal: false,
      addRateModal: false,
      editRateModal: false,
      deleteRateModal: false,
      rateData: {} as RateEntity,
    }
  },
  created() {
    document.title = '仪表盘 - 电价管理';
    this.getRateList();
  },
  methods: {
    async getRateList() {
      const getRes = await ElectricityGetRateAPI();
      if (getRes.output === "Success") {
        this.rateList = getRes.data;
      }
    }
  },
  watch: {
    isNew(val) {
      if (val) {
        this.getRateList();
        this.isNew = false;
      }
    }
  }
})
</script>

<template>
  <div class="p-16 grid grid-cols-10 gap-8">
    <div class="col-span-7">
      <div class="rounded-lg shadow shadow-indigo-100 bg-white p-4">
        <div class="grid gap-3">
          <div class="text-2xl flex items-center font-bold">
            <MoneyCollectOutlined class="pe-3"/>
            <span>电价列表</span>
          </div>
          <div>
            <table v-if="rateList.total !== 0" class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="text-left">
              <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">电价周期</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">单位谷电价</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">单位峰电价</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">更新时间</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-end">操作</th>
              </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
              <tr v-for="(value, index) in rateList.rate" :key="index" class="odd:bg-gray-50">
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
                <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-end">
                  <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                    <button
                        class="transition py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                        @click="() => {selectModal = true; rateData = value;}">
                      <EyeOutlined/>
                    </button>
                    <button
                        class="transition border-x py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                        @click="() => {editRateModal = true; rateData = value;}">
                      <EditOutlined/>
                    </button>
                    <button
                        class="transition py-1 px-3 text-gray-700 hover:bg-red-200 focus:relative flex items-center bg-red-100"
                        @click="() => {deleteRateModal = true; rateData = value}">
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
      <div class="rounded-lg shadow shadow-indigo-100 bg-white p-4">
        <div class="grid gap-3">
          <div class="flex justify-between gap-3">
            <button
                class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                @click="addThisMonthRateModal = true"
            >
              创建当月电价
            </button>
            <button
                class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
                @click="addRateModal = true"
            >
              补充其余电价
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SelectElectricityRate
      :get-rate="rateData"
      :show-modal="selectModal"
      @updateModal="(val) => selectModal = val"
  />
  <AddThisMonthElectricityPrice
      :show-modal="addThisMonthRateModal"
      @isNew="(val) => isNew = val"
      @updateModal="(val) => addThisMonthRateModal = val"
  />
  <AddRateModal
      :show-modal="addRateModal"
      @isNew="(val) => isNew = val"
      @updateModal="(val) => addRateModal = val"
  />
  <EditElectricityRate
      :rate-entity="rateData"
      :show-modal="editRateModal"
      @isNew="(val) => isNew = val"
      @updateModal="(val) => editRateModal = val"
  />
  <DeleteElectricityRate
      :rate-entity="rateData"
      :show-modal="deleteRateModal"
      @isNew="(val) => isNew = val"
      @updateModal="(val) => deleteRateModal = val"
  />
</template>
