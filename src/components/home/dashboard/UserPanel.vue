<script lang="ts">
import {defineComponent} from 'vue'
import type {BaseResponse} from "@/models/BaseResponse";

export default defineComponent({
  name: "UserPanel",
  inject: ["CUserCurrent", "CElectricity"],
  data() {
    return {
      getUserCurrent: {} as UserCurrentEntity,
      getElectricity: {} as ElectricityAllEntity,
      calculateElectricity: 0.0,
      calculateElectricityBill: 0.0
    }
  },
  async created() {
    if (typeof this.CUserCurrent === "function") {
      const getRes = await this.CUserCurrent() as BaseResponse<UserCurrentEntity>
      if (getRes.output === "Success") {
        this.getUserCurrent = getRes.data!!
      }
    }
    if (typeof this.CElectricity === "function") {
      const getRes = await this.CElectricity() as BaseResponse<ElectricityAllEntity>
      if (getRes.output === "Success") {
        this.getElectricity = getRes.data!!
        if (this.getElectricity.electricity.length === 0) {
          this.calculateElectricity = 0.0
          this.calculateElectricityBill = 0.0
        } else {
          // 统计总电价
          this.getElectricity.electricity.forEach((item: ElectricityEntity) => {
            this.calculateElectricity += item.total_electricity
          });
          // 统计总电费
          this.getElectricity.electricity.forEach((item: ElectricityEntity) => {
            this.calculateElectricityBill += item.total_bill
          });
        }
      }
    }
  }
})
</script>

<template>
  <div class="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white h-full gap-3">
    <div class="grid justify-center mt-2 mb-6 h-auto">
      <img
          alt=""
          class="w-40 h-40 rounded-full object-cover"
          src="../../../assets/images/my_logo_image.png"
      />
    </div>
    <hr/>
    <div class="grid gap-3 my-4">
      <span class="text-2xl font-bold text-center">{{ getUserCurrent.user?.username }}</span>
      <span class="text-lg text-center">{{ getUserCurrent.company?.name }}</span>
    </div>
    <hr/>
    <div class="grid gap-3 my-4">
      <div
          class="flex justify-center rounded-lg p-2 shadow-sm shadow-indigo-100 bg-gradient-to-tr from-blue-200/25 to-blue-400/25">
        <span class="text-lg font-extralight">电费计数</span>
        <span class="text-lg font-extrabold mx-2">{{ getElectricity.total }}</span>
        <span class="text-lg font-extralight">单</span>
      </div>
      <div
          class="flex justify-center rounded-lg p-2 shadow-sm shadow-indigo-100 bg-gradient-to-tr from-yellow-200/25 to-yellow-400/25">
        <span class="text-lg font-extralight">总计电价</span>
        <span class="text-lg font-extrabold mx-2">{{ calculateElectricity }}</span>
        <span class="text-lg font-extralight">度</span>
      </div>
      <div
          class="flex justify-center rounded-lg p-2 shadow-sm shadow-indigo-100 bg-gradient-to-tr from-emerald-200/25 to-emerald-400/25">
        <span class="text-lg font-extralight">总计电费</span>
        <span class="text-lg font-extrabold mx-2">{{ calculateElectricityBill }}</span>
        <span class="text-lg font-extralight">元</span>
      </div>
    </div>
    <hr/>
    <div class="grid gap-3 mt-4">
      <div class="flex h-max justify-between items-end gap-3">
        <button
            class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
        >
          创建电价
        </button>
        <button
            class="inline-block rounded border border-current w-full py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
        >
          编辑信息
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
