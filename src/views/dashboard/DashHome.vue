<script lang="ts">
import {defineComponent, ref} from 'vue'
import {ElectricityAllAPI} from "@/apis/ElectricityApi";
import UserPanel from "@/components/home/dashboard/UserPanel.vue";
import type {BaseResponse} from "@/models/BaseResponse";
import {MoneyCollectOutlined, MonitorOutlined} from "@ant-design/icons-vue";
import DashInfo from "@/components/home/dashboard/DashInfo.vue";

export default defineComponent({
  name: "DashHome",
  components: {DashInfo, UserPanel, MoneyCollectOutlined, MonitorOutlined},
  inject: ["UserCurrent"],
  data() {
    return {
      getUserCurrent: ref<UserCurrentEntity>({} as UserCurrentEntity),
      getElectricity: ElectricityAllAPI(),
      getElectricityList: {} as ElectricityAllEntity,
      calculateElectricity: "" as any,
      calculateElectricityBill: "" as any
    }
  },
  async created() {
    if (typeof this.UserCurrent === "function") {
      const getRes = await this.UserCurrent() as BaseResponse<UserCurrentEntity>
      this.getUserCurrent = getRes.data!!
    }
    document.title = '仪表盘 - 你好' + this.getUserCurrent.user.username
    const getElectricityList = await this.getElectricity
    if (getElectricityList.output === "Success") {
      this.getElectricityList = getElectricityList.data!!
    }
  },
  provide() {
    return {
      CUserCurrent: this.UserCurrent,
      CElectricity: () => this.getElectricity
    }
  }
})
</script>

<template>
  <div class="p-16 grid justify-center items-center w-full h-screen gap-8 grid-cols-12">
    <div class="col-span-9 h-full">
      <DashInfo/>
    </div>
    <div class="col-span-3 h-full">
      <UserPanel/>
    </div>
  </div>
</template>
