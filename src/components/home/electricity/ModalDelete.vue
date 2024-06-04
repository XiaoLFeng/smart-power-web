<script lang="ts">
import {defineComponent} from 'vue'
import {ElectricityDeleteAPI, ElectricityGetSingleAPI} from "@/apis/ElectricityApi";
import {message} from "ant-design-vue";

export default defineComponent({
  name: "ModalDelete",
  props: {
    showModal: Boolean,
    ceUuid: String
  },
  data() {
    return {
      open: false,
      getElectricity: {} as ElectricitySingleEntity,
    }
  },
  methods: {
    async checkDelete() {
      const getRes = await ElectricityDeleteAPI(this.getElectricity.electricity.ce_uuid);
      if (getRes.output === "Success") {
        message.success("删除成功")
        this.$emit("updateModal", false);
        this.$emit("isNew", true);
        this.open = false;
      } else {
        message.error("删除失败")
      }
    }
  },
  watch: {
    showModal(val) {
      this.open = val;
    },
    async ceUuid(val) {
      if (val) {
        const getRes = await ElectricityGetSingleAPI(val, "");
        if (getRes.output === "Success") {
          this.getElectricity = getRes.data!!
        }
      }
    },
    open(val) {
      this.open = val
      this.$emit("updateModal", val);
    }
  }
})
</script>

<template>
  <a-modal v-model:open="open" title="确认删除">
    <div class="gap-3 flow-root pt-6">
      <dl class="-my-3 divide-y divide-gray-100 text-sm">
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
      </dl>
    </div>
    <template #footer>
      <button key="back"
              class="transition border border-red-400 text-red-400 px-4 py-1 rounded-lg hover:border-red-500 hover:text-red-500 hover:scale-105 hover:shadow"
              @click="checkDelete()">
        确认删除
      </button>
    </template>
  </a-modal>
</template>
