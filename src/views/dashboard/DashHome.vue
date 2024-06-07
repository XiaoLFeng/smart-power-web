<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import {ElectricityAllAPI} from "@/apis/ElectricityApi";
import UserPanel from "@/components/home/dashboard/UserPanel.vue";
import type {BaseResponse} from "@/models/BaseResponse";
import DashInfo from "@/components/home/dashboard/DashInfo.vue";
import ModalAddThisMonth from "@/components/home/electricity/ModalAddThisMonth.vue";

export default defineComponent({
  name: "DashHome",
  components: { ModalAddThisMonth, DashInfo, UserPanel },
  inject: ["UserCurrent"],
  data() {
    return {
      getUserCurrent: ref<UserCurrentEntity>({} as UserCurrentEntity),
      getElectricity: reactive<ElectricityAllEntity>({} as ElectricityAllEntity),
      calculateElectricity: 0.0,
      calculateElectricityBill: 0.0,
      modalAdd: false,
      hasUpdate: false
    }
  },
  methods: {
    async getElectricityFunc() {
      this.calculateElectricity = 0.0;
      this.calculateElectricityBill = 0.0;
      const getRes = await ElectricityAllAPI();
      if (getRes.output === "Success") {
        this.getElectricity = getRes.data!!;
        console.log(this.getElectricity);
        if (this.getElectricity.electricity === null) {
          this.calculateElectricity = 0.0;
          this.calculateElectricityBill = 0.0;
        } else {
          // 统计总电价
          this.getElectricity.electricity.forEach((item: ElectricityEntity) => {
            this.calculateElectricity += item.total_electricity;
          });
          // 统计总电费
          this.getElectricity.electricity.forEach((item: ElectricityEntity) => {
            this.calculateElectricityBill += item.total_bill;
          });
        }
      }
    }
  },
  async created() {
    if (typeof this.UserCurrent === "function") {
      const getRes = await this.UserCurrent() as BaseResponse<UserCurrentEntity>;
      this.getUserCurrent = getRes.data;
    }
    document.title = '仪表盘 - 你好' + this.getUserCurrent.user.username;
    await this.getElectricityFunc();
  },
  watch: {
    hasUpdate(val) {
      if (val) {
        this.getElectricityFunc();
        this.hasUpdate = false;
      }
    }
  },
  provide() {
    return {
      CUserCurrent: this.UserCurrent,
    }
  }
});
</script>

<template>
  <div class="p-16 grid justify-center items-center w-full h-screen gap-8 grid-cols-12">
    <div class="col-span-9 h-full">
      <DashInfo :electricity="getElectricity"/>
    </div>
    <div class="col-span-3 h-full">
      <UserPanel :electricity="getElectricity" :show-modal="modalAdd" @updateModal="(val) => modalAdd = val"/>
    </div>
  </div>
  <ModalAddThisMonth :show-modal="modalAdd" @isNew="(val) => hasUpdate = val" @updateModal="(val) => modalAdd = val"/>
</template>
