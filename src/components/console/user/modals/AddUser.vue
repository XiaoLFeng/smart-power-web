<script lang="ts">
import {defineComponent} from 'vue'
import {ConsoleUserAddAPI} from "@/apis/ConsoleApi";
import {message, notification} from "ant-design-vue";

export default defineComponent({
  name: "AddUser",
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      open: false,
      addUser: {} as ConsoleUserAddDTO,
    }
  },
  methods: {
    async formSubmit() {
      const getRes = await ConsoleUserAddAPI(this.addUser);
      if (getRes.output === "Success") {
        this.$emit('updateModal', false);
        this.$emit('isNew', true);
        // 显示添加成功的密码
        notification.open({
          message: `用户 ${getRes.data?.user.username} 创建成功`,
          description: `创建用户的密码：${getRes.data?.password}`,
        });
      } else {
        message.error(getRes.error_message);
      }
    }
  },
  watch: {
    showModal: function (val) {
      if (val) {
        this.open = true;
      }
    },
    open: function (val) {
      if (val) {
        this.$emit('updateModal', false);
      }
    },
    "addUser.has_admin": function (val) {
      if (val) {
        this.addUser.company = "";
        this.addUser.company_cods = "";
        this.addUser.company_address = "";
      }
    }
  }
})
</script>

<template>
  <a-modal v-model:open="open" title="添加用户">
    <form class="grid gap-3 pt-4">
      <div class="grid grid-cols-10 items-center justify-end text-end gap-3">
        <div class="text-lg text-gray-700 col-span-8">创建管理员账户</div>
        <label
            class="inline-block col-span-2 relative h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-500"
            for="HasAdmin"
        >
          <input id="HasAdmin" v-model="addUser.has_admin" class="peer sr-only" type="checkbox"/>
          <span
              class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
          />
        </label>
      </div>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="username"
      >
        <input id="username"
               v-model="addUser.username"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
               placeholder="username"
               type="text"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          用户名
        </span>
      </label>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="email"
      >
        <input id="email"
               v-model="addUser.email"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
               placeholder="email"
               type="email"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          邮箱
        </span>
      </label>
      <label
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="phone"
      >
        <input id="phone"
               v-model="addUser.phone"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
               placeholder="phone"
               type="text"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          手机号
        </span>
      </label>
      <label
          v-if="!addUser.has_admin"
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="company"
      >
        <input id="company"
               v-model="addUser.company"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
               placeholder="company"
               type="text"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          企业名字
        </span>
      </label>
      <label
          v-if="!addUser.has_admin"
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="companyCods"
      >
        <input id="companyCods"
               v-model="addUser.company_cods"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
               placeholder="companyCods"
               type="text"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          统一信用代码
        </span>
      </label>
      <label
          v-if="!addUser.has_admin"
          class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          for="companyAddress"
      >
        <input id="companyAddress"
               v-model="addUser.company_address"
               class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
               placeholder="companyAddress"
               type="text"
        />
        <span
            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          企业地址
        </span>
      </label>
    </form>
    <template #footer>
      <button
          class="transition border border-blue-400 text-blue-400 px-4 py-1 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow"
          @click="formSubmit()">
        添加
      </button>
    </template>
  </a-modal>
</template>
