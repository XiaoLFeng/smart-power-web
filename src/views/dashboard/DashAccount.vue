<script lang="ts">
import {defineComponent, reactive} from 'vue'
import {MoneyCollectOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import {UserCompanyEditAPI, UserEditAPI} from "@/apis/UserApi";
import {AuthChangePasswordAPI} from "@/apis/AuthApi";

export default defineComponent({
  name: "DashAccount",
  components: {MoneyCollectOutlined},
  inject: ["UserCurrent"],
  data() {
    return {
      hasThisMonthRate: false,
      editUser: reactive<UserAccountEditDTO>({} as UserAccountEditDTO),
      editCompany: reactive<UserCompanyEditDTO>({} as UserCompanyEditDTO),
      changePassword: reactive<AuthPasswordDTO>({} as AuthPasswordDTO),
      reNewPassword: reactive<string>(),
    }
  },
  async created() {
    // 获取当前用户信息
    const getRes = await this.UserCurrent();
    if (getRes.output === "Success") {
      this.editUser.email = getRes.data?.user.email;
      this.editUser.phone = getRes.data?.user.phone;
      this.editCompany.cods = getRes.data?.company.cods;
      this.editCompany.name = getRes.data?.company.name;
      this.editCompany.address = getRes.data?.company.address;
      this.editCompany.representative = getRes.data?.company.representative;
    }
  },
  methods: {
    async formSubmitUser() {
      // 数据不能为空
      if (this.editUser.email === "" || this.editUser.phone === "") {
        message.warn("邮箱和手机号不能为空");
        return;
      }
      // 数据进行更新操作
      const getRes = await UserEditAPI(this.editUser);
      if (getRes.output === "Success") {
        message.success("用户信息更新成功");
      } else {
        message.warning(getRes.error_message);
      }
    },
    async formSubmitCompany() {
      // 数据不能为空
      if (this.editCompany.cods === "" || this.editCompany.name === "" || this.editCompany.address === "" || this.editCompany.representative === "") {
        message.warn("企业信息不能为空");
        return;
      }
      // 数据进行更新操作
      const getRes = await UserCompanyEditAPI(this.editCompany);
      if (getRes.output === "Success") {
        message.success("企业信息更新成功");
      } else {
        message.warning(getRes.error_message);
      }
    },
    async formSubmitPassword() {
      // 数据不能为空
      if (this.changePassword.now_password === "" || this.changePassword.new_password === "" || this.reNewPassword === "") {
        message.warn("密码不能为空");
        return;
      }
      // 两次密码是否一致
      if (this.changePassword.new_password !== this.reNewPassword) {
        message.warn("两次密码不一致");
        return;
      }
      // 数据进行更新操作
      const getRes = await AuthChangePasswordAPI(this.changePassword);
      if (getRes.output === "Success") {
        message.success("密码更新成功");
        // 账户登出
        localStorage.removeItem("authorization");
        setTimeout(() => {
          this.$router.push({name: "AuthLogin", replace: true});
        }, 500);
      } else {
        message.warning(getRes.error_message);
      }
    }
  }
})
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="py-16 w-[800px] grid-cols-12 grid gap-8">
      <div class="h-full shadow shadow-indigo-100 rounded-lg bg-white p-8 col-span-12 grid grid-cols-12 gap-3">
        <div class="text-2xl flex items-center font-bold col-span-12">
          <MoneyCollectOutlined class="pe-3"/>
          <span>编辑用户信息</span>
        </div>
        <div class="w-full grid gap-3 col-span-8">
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="userEmail"
          >
            <input id="userEmail"
                   v-model="editUser.email"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="userEmail"
                   type="email"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              邮箱
            </span>
          </label>
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="userPhone"
          >
            <input id="userPhone"
                   v-model="editUser.phone"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="userPhone"
                   type="text"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              手机号
            </span>
          </label>
        </div>
        <div class="col-span-4 flex justify-end items-end">
          <button @click="formSubmitUser()"
                  class="transition border border-blue-400 text-blue-400 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow">
            提交修改
          </button>
        </div>
      </div>

      <div class="h-full shadow shadow-indigo-100 rounded-lg bg-white p-8 col-span-12 grid grid-cols-12 gap-3">
        <div class="text-2xl flex items-center font-bold col-span-12">
          <MoneyCollectOutlined class="pe-3"/>
          <span>编辑企业信息</span>
        </div>
        <div class="w-full grid gap-3 col-span-8">
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="companyCods"
          >
            <input id="companyCods"
                   v-model="editCompany.cods"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="companyCods"
                   type="text"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              统一社会信用代码
            </span>
          </label>
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="companyName"
          >
            <input id="companyName"
                   v-model="editCompany.name"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="companyName"
                   type="text"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              企业名字
            </span>
          </label>
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="companyAddress"
          >
            <input id="companyAddress"
                   v-model="editCompany.address"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="companyAddress"
                   type="text"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              企业地址
            </span>
          </label>
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="companyRepresentative"
          >
            <input id="companyRepresentative"
                   v-model="editCompany.representative"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="companyRepresentative"
                   type="text"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              企业法定代表人
            </span>
          </label>
        </div>
        <div class="col-span-4 flex justify-end items-end">
          <button @click="formSubmitCompany()"
                  class="transition border border-blue-400 text-blue-400 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow">
            提交修改
          </button>
        </div>
      </div>

      <div class="h-full shadow shadow-indigo-100 rounded-lg bg-white p-8 col-span-12 grid grid-cols-12 gap-3">
        <div class="text-2xl flex items-center font-bold col-span-12">
          <MoneyCollectOutlined class="pe-3"/>
          <span>修改密码</span>
        </div>
        <div class="w-full grid gap-3 col-span-8">
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="changeNowPassword"
          >
            <input id="changeNowPassword"
                   v-model="changePassword.now_password"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="changeNowPassword"
                   type="password"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              旧密码
            </span>
          </label>
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="changeNewPassword"
          >
            <input id="changeNewPassword"
                   v-model="changePassword.new_password"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="changeNewPassword"
                   type="password"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              新密码
            </span>
          </label>
          <label
              class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              for="reNewPassword"
          >
            <input id="reNewPassword"
                   v-model="reNewPassword"
                   class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                   placeholder="reNewPassword"
                   type="password"
            />
            <span
                class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              重新输入新密码
            </span>
          </label>
        </div>
        <div class="col-span-4 flex justify-end items-end">
          <button @click="formSubmitPassword()"
                  class="transition border border-blue-400 text-blue-400 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow">
            提交修改
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
