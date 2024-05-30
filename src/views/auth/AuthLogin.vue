<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AuthLogin",
  created() {
    document.title = '智电管家 - 用户登录'
  },
})
</script>

<template>
  <div class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">用户登录</h1>

        <p class="mt-4 text-gray-500">
          智电管家「SmartPower Manager」是一款基于Golang(GoFrame)框架的用电管理系统.
        </p>
      </div>

      <form action="#" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label class="sr-only" for="email">Email</label>

          <div class="relative">
            <input
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md border"
                placeholder="输入用户名"
                type="email"
            />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label class="sr-only" for="password">Password</label>

          <div class="relative">
            <input
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-md border"
                placeholder="请输入密码"
                type="password"
            />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                <path fill-rule="evenodd" d="M8 7a5 5 0 1 1 3.61 4.804l-1.903 1.903A1 1 0 0 1 9 14H8v1a1 1 0 0 1-1 1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707L8.196 8.39A5.002 5.002 0 0 1 8 7Zm5-3a.75.75 0 0 0 0 1.5A1.5 1.5 0 0 1 14.5 7 .75.75 0 0 0 16 7a3 3 0 0 0-3-3Z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500">
            没有账号?
            <button class="underline transition hover:text-gray-700" @click="$router.push({name: 'AuthRegister'})" type="button">注册</button>
          </p>

          <button
              class="transition rounded-lg border border-blue-400 px-6 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500 hover:text-white active:ring ring-blue-200"
              type="submit"
          >
            登 陆
          </button>
        </div>
      </form>
    </div>

    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      <img
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
          src="@/assets/images/login_background.webp"
      />
    </div>
  </div>
</template>
