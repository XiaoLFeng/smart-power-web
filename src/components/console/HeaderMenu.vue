<script lang="ts">
import {defineComponent} from 'vue'
import {message} from "ant-design-vue";
import {
  DashboardOutlined,
  MessageOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "HeaderMenu",
  components: {UserOutlined, UsergroupAddOutlined, ThunderboltOutlined, DashboardOutlined, MessageOutlined},
  inject: ['UserCurrent'],
  data() {
    return {
      menuOpen: true,
      getUserCurrent: {} as UserCurrentEntity,
      menuActiveNumber: "ConsoleHome",
      showLogout: false,
    }
  },
  async created() {
    if (typeof this.UserCurrent === 'function') {
      const getRes = await this.UserCurrent();
      this.getUserCurrent = getRes.data;
    }
    this.menuActiveNumber = this.$router.currentRoute.value.name;
  },
  methods: {
    logoutSubmit() {
      localStorage.removeItem("authorization");
      message.success("已登出");
      setTimeout(() => {
        this.$router.push({name: "AuthLogin", replace: true});
      }, 800)
    },
    activeNumber(menuID: string): boolean {
      return this.menuActiveNumber === menuID;
    }
  },
  watch: {
    $route(to) {
      this.menuActiveNumber = to.name;
    }
  }
})
</script>

<template>
  <div class="flex h-screen flex-col justify-between border-e bg-white w-[15rem] shadow shadow-indigo-100">
    <div class="px-4 py-6">
      <span class="grid py-2 place-content-center rounded-lg bg-blue-100/75 gradient font-bold text-2xl font-mono">
        <span class="bg-gradient-to-r from-blue-600 to-emerald-500 gradient-text">SmartPower</span>
      </span>

      <ul class="mt-6 space-y-1">
        <li>
          <span
              :class="{'bg-gray-100': activeNumber('ConsoleHome'), 'hover:bg-gray-50': !activeNumber('ConsoleHome')}"
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
              @click="$router.push({name: 'ConsoleHome'})">
            <DashboardOutlined/>
            <span class="ps-3">控制台</span>
          </span>
        </li>
        <li>
          <span
              :class="{'bg-gray-100': activeNumber('ConsolePrice'), 'hover:bg-gray-50': !activeNumber('ConsolePrice')}"
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 flex items-center"
              @click="$router.push({name: 'ConsolePrice'})">
            <ThunderboltOutlined/>
            <span class="ps-3">电费单价管理</span>
          </span>
        </li>
        <li>
          <span
              :class="{'bg-gray-100': activeNumber('ConsoleUser'), 'hover:bg-gray-50': !activeNumber('ConsoleUser')}"
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 flex items-center"
              @click="$router.push({name: 'ConsoleUser'})">
            <UsergroupAddOutlined/>
            <span class="ps-3">用户管理</span>
          </span>
        </li>
        <li>
          <span
              :class="{'bg-gray-100': activeNumber('ConsoleAccount'), 'hover:bg-gray-50': !activeNumber('ConsoleAccount')}"
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 flex items-center"
              @click="$router.push({name: 'ConsoleAccount'})">
            <UserOutlined/>
            <span class="ps-3">个人中心</span>
          </span>
        </li>
        <li>
          <span
              :class="{'bg-gray-100': activeNumber('ConsoleUseHelp'), 'hover:bg-gray-50': !activeNumber('ConsoleUseHelp')}"
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 flex items-center"
              @click="$router.push({name: 'ConsoleUseHelp'})">
            <MessageOutlined/>
            <span class="ps-3">使用帮助</span>
          </span>
        </li>
      </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <div class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50" @click="showLogout = true">
        <div><img alt="" class="size-10 rounded-full object-cover" src="@/assets/images/my_logo_image.png"/></div>
        <div class="flex items-center justify-center">
          <span class="text-xs">
            <strong class="block font-medium">{{ getUserCurrent.user?.username }}</strong>
            <span>{{ getUserCurrent.user?.email }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- 退出登录选择框 -->
  <a-modal v-model:open="showLogout" title="退出登录">
    <div class="grid">
      <span>你确认退出登录吗?</span>
      <span>确认的话点击 <kbd class="bg-gray-200 rounded px-1">退出</kbd> 按钮即可退出!</span>
    </div>
    <template #footer>
      <div class="flex gap-1 justify-end">
        <button
            class="transition rounded-md border border-gray-400 px-4 py-1 text-sm font-medium text-gray-400 hover:bg-gray-500 hover:text-white active:ring ring-gray-200"
            @click="showLogout = false">
          取消
        </button>
        <button
            class="transition rounded-md border border-red-400 px-4 py-1 text-sm font-medium text-red-400 hover:bg-red-500 hover:text-white active:ring ring-red-200"
            @click="logoutSubmit">
          退出
        </button>
      </div>
    </template>
  </a-modal>
</template>

<style>
.gradient-text {
  @apply bg-clip-text text-transparent;
}
</style>
