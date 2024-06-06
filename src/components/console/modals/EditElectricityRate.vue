<script lang="ts">
import {defineComponent} from 'vue'
import {ElectricityEditRateAPI} from "@/apis/ElectricityApi";
import {message} from "ant-design-vue";

export default defineComponent({
  name: "EditElectricityRate",
  props: {
    showModal: Boolean,
    rateEntity: {} as RateEntity,
  },
  data() {
    return {
      open: false,
      editRateEntity: {} as ElectricityRateEditDTO,
      ratePeriodAt: "",
    }
  },
  methods: {
    async formSubmit() {
      // 检查输入
      if (this.editRateEntity.valley_rate == null || this.editRateEntity.peak_rate == null) {
        this.$message.warn("电价不能为空");
        return
      }
      // 不能为 0
      if (this.editRateEntity.valley_rate === 0 || this.editRateEntity.peak_rate === 0) {
        this.$message.warn("电价不能为 0");
        return
      }
      // 记录本月
      const getRes = await ElectricityEditRateAPI(this.editRateEntity);
      if (getRes.output === "Success") {
        message.success("修改成功");
        this.$emit("updateModal", false);
        this.$emit("isNew", true);
        this.open = false;
        this.editRateEntity = {} as ElectricityRateEditDTO;
      } else {
        message.error(getRes.error_message);
      }
    }
  },
  watch: {
    rateEntity(val: RateEntity) {
      console.log(val);
      this.editRateEntity.id = val.id;
      this.editRateEntity.valley_rate = val.valleyRate;
      this.editRateEntity.peak_rate = val.peakRate;
      this.ratePeriodAt = val.periodAt;
    },
    showModal(val) {
      this.open = val;
    },
    open(val) {
      this.open = val;
      this.$emit("updateModal", val);
    }
  },
})
</script>

<template>
  <a-modal v-model:open="open" title="编辑电价">
    <form class="grid gap-3 pt-4">
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="valleyElectricity"
      >
        <input id="valleyElectricity"
               v-model="ratePeriodAt"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full text-gray-700/50"
               placeholder="valleyElectricity"
               type="number"
               readonly
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            电价周期
          </span>
      </label>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="valleyElectricity"
      >
        <input id="valleyElectricity"
               v-model="editRateEntity.valley_rate"
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
               v-model="editRateEntity.peak_rate"
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
        修改
      </button>
    </template>
  </a-modal>
</template>

<style scoped>

</style>
