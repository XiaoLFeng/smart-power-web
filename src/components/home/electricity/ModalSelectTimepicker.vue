<script lang="ts">
import {defineComponent} from 'vue'
import {ElectricityGetSingleAPI} from "@/apis/ElectricityApi";
import {message} from "ant-design-vue";
import {LoadingOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: "ModalSelectTimepicker",
  components: {LoadingOutlined},
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      open: false,
      hasSelect: false,
      getElectricity: {} as ElectricitySingleEntity,
      timeoutID: 0,
      timePicker: 0,
      loading: false
    }
  },
  methods: {
    closeModal() {
      this.open = false;
    },
  },
  watch: {
    showModal(val) {
      this.open = val;
    },
    open(val) {
      this.open = val
      this.$emit("updateModal", val);
    },
    timePicker(val) {
      this.loading = true;
      this.hasSelect = false;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }
      this.timeoutID = setTimeout(async () => {
        const getDate = new Date(val);
        const timepicker = getDate.getFullYear() + "-" + (getDate.getMonth() + 1) + "-01";
        const getRes = await ElectricityGetSingleAPI("", timepicker);
        if (getRes.output === "Success") {
          this.getElectricity = getRes.data!!
          this.hasSelect = true
        } else {
          message.error(getRes.error_message);
        }
        this.loading = false;
      }, 1500);
    }
  }
})
</script>

<template>
  <a-modal v-model:open="open" title="按周期时间搜索电费">
    <div class="flex pt-4">
      <a-date-picker placeholder="选择月份" picker="month" v-model:value="timePicker" class="shadow-sm border border-gray-200"/>
    </div>
    <div class="gap-3 flow-root pt-4">
      <LoadingOutlined v-if="loading" />
      <dl class="-my-3 divide-y divide-gray-100 text-sm" v-if="hasSelect">
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">企业</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.company?.name }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">统一社会信用代码</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.company?.cods }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">电费识别码</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.ce_uuid }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">谷电使用量</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.valley_electricity }} 度</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">峰电使用量</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.peak_electricity }} 度</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">谷电价</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.valley_electricity_bill }} 元</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">峰电价</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.peak_electricity_bill }} 元</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">总用电量</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.total_electricity }} 度</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">总电费</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.total_bill }} 元</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">创建时间</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.created_at }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">更新时间</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ getElectricity.electricity?.updated_at }}</dd>
        </div>
      </dl>
    </div>
    <template #footer>
      <button key="back" class="transition border border-blue-400 text-blue-400 px-4 py-1 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow"
              @click="closeModal()">
        关闭
      </button>
    </template>
  </a-modal>
</template>
