<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AuthRegister",
  created() {
    document.title = '智电管家 - 用户注册'
  },
})
</script>

<template>
  <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
          alt=""
          class="absolute inset-0 h-full w-full object-cover opacity-80"
          src="@/assets/images/register_background.webp"
      />

      <div class="hidden lg:relative lg:block lg:p-12">
        <a class="block text-white" @click="$router.push({name: 'BaseIndex', replace: true})">
          <img class="h-8 sm:h-10 w-auto rounded-full" src="@/assets/images/favicon.webp" alt="WebLogo">
        </a>

        <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          欢迎使用智电管家
        </h2>

        <p class="mt-4 leading-relaxed text-white/90">
          智电管家「SmartPower Manager」是一款基于Golang(GoFrame)框架的用电管理系统.
        </p>
      </div>
    </section>

    <main
        class="flex items-center justify-center px-8 py-8 sm:px-16 lg:col-span-7 lg:px-20 lg:py-12 xl:col-span-6"
    >
      <div class="max-w-xl lg:max-w-3xl w-full">
        <div class="relative -mt-16 block lg:hidden">
          <a
              class="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
              @click="$router.push({name: 'BaseIndex', replace: true})"
          >
            <img class="h-8 sm:h-10 w-auto rounded-full" src="@/assets/images/favicon.webp" alt="WebLogo">
          </a>

          <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            欢迎使用智电管家
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">
            智电管家「SmartPower Manager」是一款基于Golang(GoFrame)框架的用电管理系统.
          </p>
        </div>

        <form class="grid grid-cols-6 gap-6 w-full">
          <div class="col-span-6">
            <label class="block text-sm font-medium text-gray-700">用户名</label>
            <input
                id="username"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="username"
                type="text"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">邮箱</label>
            <input
                id="email"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="email"
                type="email"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">手机号</label>
            <input
                id="phone"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="phone"
                type="text"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">企业名字</label>
            <input
                id="company_name"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="company_name"
                type="text"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">法定代表人</label>
            <input
                id="company_representative"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="company_representative"
                type="text"
            />
          </div>
          <div class="col-span-6">
            <label class="block text-sm font-medium text-gray-700">统一信用代码</label>
            <input
                id="company_cods"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="company_cods"
                type="text"
            />
          </div>
          <div class="col-span-6">
            <label class="block text-sm font-medium text-gray-700">企业地址</label>
            <input
                id="company_address"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="company_address"
                type="text"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">密码</label>
            <input
                id="password"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="password"
                type="password"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">确认密码</label>
            <input
                id="password_confirm"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                name="password_confirm"
                type="password"
            />
          </div>

          <div class="col-span-6">
            <p class="text-sm text-gray-500">
              创建帐户即表示您同意我们的
              <a class="text-gray-700 underline" href="#"> 条款和条件</a>
              <span> 以及 </span>
              <a class="text-gray-700 underline" href="#">隐私政策</a>.
            </p>
          </div>

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              创建账户
            </button>

            <p class="mt-4 text-sm text-gray-500 sm:mt-0 flex">
              <span class="pe-1">已经有帐户?</span>
              <button class="transition text-gray-700 underline hover:text-gray-800" type="button" @click="$router.push({name: 'AuthLogin'})">登陆</button>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
