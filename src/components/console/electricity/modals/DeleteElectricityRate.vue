<script lang="ts">
import {defineComponent} from 'vue'
import {ElectricityDeleteRateAPI} from "@/apis/ElectricityApi";
import {message} from "ant-design-vue";

export default defineComponent({
  name: "DeleteElectricityRate",
  props: {
    showModal: Boolean,
    rateEntity: {} as RateEntity,
  },
  data() {
    return {
      open: false,
      getRateEntity: {} as RateEntity,
    }
  },
  methods: {
    async formSubmit() {
      const getRes = await ElectricityDeleteRateAPI(this.getRateEntity.id);
      if (getRes.output === "Success") {
        message.success("删除成功");
        this.$emit("updateModal", false);
        this.open = false;
        this.$emit("isNew", true);
      } else {
        message.warn(getRes.error_message);
      }
    },
  },
  watch: {
    showModal(val) {
      this.open = val;
    },
    rateEntity(val) {
      this.getRateEntity = val;
    },
    open(val) {
      this.open = val
      this.$emit("updateModal", val);
    }
  }
})
</script>

<template>
  <a-modal v-model:open="open" title="删除电价">
    <p>确定删除此电价？</p>
    <template #footer>
      <a-button key="back" @click="open = false">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="formSubmit()">
        确定
      </a-button>
    </template>
  </a-modal>
</template>
