<script lang="ts">
import {defineComponent} from 'vue'
import {ElectricityAddRateAPI} from "@/apis/ElectricityApi";
import {message} from "ant-design-vue";

export default defineComponent({
  name: "AddThisMonthElectricityPrice",
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      open: false,
      addElectricity: {} as ElectricityRateAddDTO,
    }
  },
  methods: {
    async formSubmit() {
      // 检查输入
      if (this.addElectricity.valley_rate == null || this.addElectricity.peak_rate == null) {
        message.warn("电价不能为空");
        return
      }
      // 不能为 0
      if (this.addElectricity.valley_rate === 0 || this.addElectricity.peak_rate === 0) {
        message.warn("电价不能为 0");
        return
      }
      // 记录本月
      const getDate = new Date();
      this.addElectricity.time_picker = getDate.getFullYear() + "-" + (getDate.getMonth() + 1) + "-01";
      const getRes = await ElectricityAddRateAPI(this.addElectricity);
      if (getRes.output === "Success") {
        message.success("添加成功");
        this.$emit("updateModal", false);
        this.$emit("isNew", true);
        this.open = false;
        this.addElectricity = {} as ElectricityRateAddDTO;
      } else {
        message.error(getRes.error_message);
      }
    }
  },
  watch: {
    showModal(val) {
      this.open = val;
    },
    open(val) {
      this.open = val
      this.$emit("updateModal", val);
    }
  },
})
</script>

<template>
  <a-modal v-model:open="open" title="添加当月电价">
    <form class="grid gap-3 pt-4">
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="valleyElectricity"
      >
        <input id="valleyElectricity"
               v-model="addElectricity.valley_rate"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
               placeholder="valleyElectricity"
               type="number"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            单位谷电价
          </span>
      </label>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="peakElectricity"
      >
        <input id="peakElectricity"
               v-model="addElectricity.peak_rate"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
               placeholder="peakElectricity"
               type="number"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            单位峰电价
          </span>
      </label>
    </form>
    <template #footer>
      <button class="transition border border-blue-400 text-blue-400 px-4 py-1 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow"
              @click="formSubmit()">
        添加
      </button>
    </template>
  </a-modal>
</template>
