<script lang="ts">
import {defineComponent, ref} from 'vue'
import {ElectricityAllAPI} from "@/apis/ElectricityApi";
import UserPanel from "@/components/dashboard/UserPanel.vue";
import type {BaseResponse} from "@/models/BaseResponse";

export default defineComponent({
  name: "DashHome",
  components: {UserPanel},
  inject: ["UserCurrent"],
  data() {
    return {
      getUserCurrent: ref<UserCurrentEntity>({} as UserCurrentEntity),
      getElectricity: ElectricityAllAPI(),
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
      <div class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white h-full">
        <div class="m-2">

        </div>
      </div>
    </div>
    <UserPanel/>
  </div>
</template>
