<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DashboardMenu"
})
</script>

<template>
  <div id="DashboardMenu" class="invisible flex h-screen flex-1 flex-col justify-between border-e bg-white min-w-52">
    <div class="px-4 py-6">
      <ul class="mt-14 space-y-1">
        <li>
          <a class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
             @click="$router.push({name: 'DashHome'})"
          >
            控制台
          </a>
        </li>

        <li>
          <a class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
             @click="$router.push({name: 'DashElectricity'})"
          >
            电费概览
          </a>
        </li>

        <li>
          <a class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
             @click="$router.push({name: 'DashPrice'})"
          >
            单价概览
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
