<script lang="ts">
import {defineComponent, reactive} from 'vue'
import {ElectricityEditAPI, ElectricityGetSingleAPI} from "@/apis/ElectricityApi";
import {message} from "ant-design-vue";
import {convertToDate} from "@/util/util";

export default defineComponent({
  name: "ModalEdit",
  props: {
    showModal: Boolean,
    ceUuid: String
  },
  data() {
    return {
      open: false,
      editElectricity: reactive<ElectricityEntity>({} as ElectricityEntity),
      formElectricity: {} as ElectricEditDTO
    }
  },
  methods: {
    async formSubmit() {
      // 检查是否允许提交
      if (this.editElectricity.valley_electricity === 0 && this.editElectricity.peak_electricity === 0) {
        message.warn("用电量不能同时为 0")
        return
      }
      // 数据准备进行提交
      this.formElectricity.time_picker = convertToDate(this.editElectricity.period_at);
      this.formElectricity.valley = this.editElectricity.valley_electricity;
      this.formElectricity.peak = this.editElectricity.peak_electricity;
      const getRes = await ElectricityEditAPI(this.formElectricity);
      if (getRes.output === "Success") {
        message.success("修改成功")
        this.$emit("updateModal", false);
        this.$emit("isNew", true);
        this.open = false;
      } else {
        message.error("修改失败")
      }
    },
  },
  watch: {
    showModal(val) {
      this.open = val;
    },
    async ceUuid(val) {
      if (val) {
        const getRes = await ElectricityGetSingleAPI(val, "");
        if (getRes.output === "Success") {
          this.editElectricity = getRes.data!!.electricity
        }
      }
    },
    open(val) {
      this.open = val
      this.$emit("updateModal", val);
    }
  }
});
</script>

<template>
  <div>
    <a-modal v-model:open="open" title="用电量编辑">
      <form class="grid gap-3 pt-4">
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            for="ceUUID"
        >
          <input id="ceUUID"
                 v-model="editElectricity.ce_uuid"
                 class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full text-gray-600/50"
                 placeholder="ceUUID"
                 readonly
                 type="text"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            电费唯一识别码
          </span>
        </label>
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            for="periodAt"
        >
          <input id="periodAt"
                 v-model="editElectricity.period_at"
                 class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full text-gray-600/50"
                 placeholder="periodAt"
                 readonly
                 type="text"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            计费周期
          </span>
        </label>
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            for="valleyElectricity"
        >
          <input id="valleyElectricity"
                 v-model="editElectricity.valley_electricity"
                 class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                 placeholder="valleyElectricity"
                 type="number"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            谷用电量
          </span>
        </label>
        <label
            class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            for="peakElectricity"
        >
          <input id="peakElectricity"
                 v-model="editElectricity.peak_electricity"
                 class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                 placeholder="peakElectricity"
                 type="number"
          />
          <span
              class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            峰用电量
          </span>
        </label>
      </form>
      <template #footer>
        <button @click="formSubmit()"
                class="transition border border-blue-400 text-blue-400 px-4 py-1 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow">
          修改
        </button>
      </template>
    </a-modal>
  </div>
</template>

<style scoped>

</style>
