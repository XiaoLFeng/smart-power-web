<script lang="ts">
import {defineComponent, ref} from 'vue'
import {message} from "ant-design-vue";
import {DashboardOutlined, MessageOutlined, UserOutlined} from "@ant-design/icons-vue";
import $ from "jquery";
import DashboardMenu from "@/components/home/DashboardMenu.vue";

export default defineComponent({
  name: "HeaderMenu",
  components: {DashboardMenu, DashboardOutlined, UserOutlined, MessageOutlined},
  inject: ['UserCurrent'],
  data() {
    return {
      menuOpen: true,
      getFirstLetterCapitalized: ref<string>(),
      menuActiveNumber: "dashboard"
    }
  },
  async created() {
    if (typeof this.UserCurrent === 'function') {
      const getFirstLetter = await this.UserCurrent()
      this.getFirstLetterCapitalized = getFirstLetter.data?.user.username.charAt(0).toUpperCase()
    }
    $("#DashboardMenu").toggleClass("invisible").fadeOut(0)
    // 检查当前 URI
    const currentURI = this.$route.name
    if (currentURI === "DashHome") {
      this.menuActiveNumber = "dashboard"
    } else if (currentURI === "DashAccount") {
      this.menuActiveNumber = "account"
    }
  },
  mounted() {
    let timeoutID: number | null = null;

    $("#Dashboard, #DashboardMenu").hover(() => {
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }
      $("#DashboardMenu").fadeIn(200);
    }, () => {
      timeoutID = setTimeout(() => {
        $("#DashboardMenu").fadeOut(200);
      }, 100);
    })
  },
  methods: {
    logoutSubmit() {
      localStorage.removeItem("authorization")
      message.success("已登出")
      setTimeout(() => {
        this.$router.push({name: "AuthLogin", replace: true})
      }, 800)
    },
    menuActive(menuID: string, viewName: string) {
      this.menuActiveNumber = menuID
      this.$router.push({name: viewName})
    },
    activeNumber(menuID: string): boolean {
      return this.menuActiveNumber === menuID
    }
  },
  watch: {
    $route(to) {
      const currentURI = to.name
      if (currentURI === "DashHome") {
        this.menuActiveNumber = "dashboard"
      } else if (currentURI === "DashAccount") {
        this.menuActiveNumber = "account"
      }
    }
  }
})
</script>

<template>
  <div class="flex">
    <div class="flex h-screen w-16 flex-col justify-between border-e bg-white">
      <div>
        <div class="inline-flex size-16 items-center justify-center">
          <span
              class="grid size-10 place-content-center rounded-lg bg-green-100 text text-gray-600 shadow-sm"
          >
            {{ getFirstLetterCapitalized }}
          </span>
        </div>

        <div class="border-t border-gray-100">
          <div class="px-2">
            <div class="py-4">
              <a id="Dashboard"
                 :class="{ 'bg-blue-50': activeNumber('dashboard'), 'text-blue-700': activeNumber('dashboard'), 'text-gray-500': !activeNumber('dashboard')}"
                 class="t group relative flex justify-center items-center rounded px-2 py-1.5"
                 @click="menuActive('dashboard', 'DashHome')"
              >
                <div class="flex justify-center items-center text-lg">
                  <DashboardOutlined/>
                </div>
                <span
                    class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible w-max"
                >
                  控制台
                </span>
              </a>
            </div>

            <ul class="space-y-1 border-t border-gray-100 pt-4">
              <li>
                <a id="Account"
                   :class="{ 'bg-blue-50': activeNumber('account'), 'text-blue-700': activeNumber('account'), 'text-gray-500': !activeNumber('account')}"
                   class="group relative flex justify-center rounded px-2 py-1.5"
                   @click="menuActive('account', 'DashAccount')"
                >
                  <div class="flex justify-center items-center text-lg">
                    <UserOutlined />
                  </div>

                  <span
                      class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible w-max"
                  >
                    账户
                  </span>
                </a>
              </li>
              <li>
                <a id="Account"
                   :class="{ 'bg-blue-50': activeNumber('howToUse'), 'text-blue-700': activeNumber('howToUse'), 'text-gray-500': !activeNumber('howToUse')}"
                   class="group relative flex justify-center rounded px-2 py-1.5"
                   @click="menuActive('howToUse', 'DashHowToUse')"
                >
                  <div class="flex justify-center items-center text-lg">
                    <MessageOutlined />
                  </div>

                  <span
                      class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible w-max"
                  >
                    使用帮助
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <button
            class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            @click="logoutSubmit()"
        >
          <svg
              class="size-5 opacity-75"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>

          <span
              class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible w-max"
          >
            登出
          </span>
        </button>
      </div>
    </div>
    <DashboardMenu/>
  </div>
</template>
