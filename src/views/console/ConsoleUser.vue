<script lang="ts">
import {defineComponent} from 'vue'
import {DeleteOutlined, EditOutlined, EyeOutlined, MoneyCollectOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: "ConsoleUser",
  components: {
    DeleteOutlined,
    EyeOutlined,
    EditOutlined,
    MoneyCollectOutlined
  }
})
</script>

<template>
  <div class="p-16 grid grid-cols-10 gap-8">
    <div class="col-span-12">
      <div class="rounded-lg shadow shadow-indigo-100 bg-white p-4">
        <div class="grid gap-3">
          <div class="text-2xl flex items-center font-bold">
            <MoneyCollectOutlined class="pe-3"/>
            <span>电价列表</span>
          </div>
          <div>
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="text-left">
              <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">电价周期</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">单位谷电价</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">单位峰电价</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">更新时间</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-end">操作</th>
              </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
              <tr v-for="(value, index) in rateList.rate" :key="index" class="odd:bg-gray-50">
                <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.periodAt }}</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-900">
                  {{ value.valleyRate }}
                  <span class="font-medium">元/度</span>
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-900">
                  {{ value.peakRate }}
                  <span class="font-medium">元/度</span>
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.updatedAt }}</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-end">
                  <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                    <button
                        class="transition py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                        @click="() => {selectModal = true; rateData = value;}">
                      <EyeOutlined/>
                    </button>
                    <button
                        class="transition border-x py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                        @click="() => {editRateModal = true; rateData = value;}">
                      <EditOutlined/>
                    </button>
                    <button
                        class="transition py-1 px-3 text-gray-700 hover:bg-red-200 focus:relative flex items-center bg-red-100"
                        @click="() => {deleteRateModal = true; rateData = value}">
                      <DeleteOutlined/>
                    </button>
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
