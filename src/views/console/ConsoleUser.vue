<script lang="ts">
import {defineComponent} from 'vue'
import {DeleteOutlined, EditOutlined, EyeOutlined, KeyOutlined, UserOutlined} from "@ant-design/icons-vue";
import {ConsoleGetUserList} from "@/apis/ConsoleApi";
import AddUser from "@/components/console/user/modals/AddUser.vue";
import ResetPassword from "@/components/console/user/modals/ResetPassword.vue";
import DeleteUser from "@/components/console/user/modals/DeleteUser.vue";
import GetUser from "@/components/console/user/modals/GetUser.vue";
import EditUser from "@/components/console/user/modals/EditUser.vue";

export default defineComponent({
  name: "ConsoleUser",
  components: {
    EditUser,
    GetUser,
    DeleteUser,
    ResetPassword,
    AddUser,
    DeleteOutlined,
    EyeOutlined,
    EditOutlined,
    UserOutlined,
    KeyOutlined
  },
  data() {
    return {
      getUserUUID: "",
      userInfo: {} as UserCurrentEntity,
      getUserList: {} as UserAllEntity,
      getUserModal: false,
      addUserModal: false,
      resetUserModal: false,
      editUserModal: false,
      deleteUserModal: false,
      isNew: false,
    }
  },
  async created() {
    document.title = '仪表盘 - 用户管理';
    const getRes = await ConsoleGetUserList();
    if (getRes.output === "Success") {
      this.getUserList = getRes.data!!;
    }
  },
  watch: {
    async isNew(val) {
      if (val) {
        const getRes = await ConsoleGetUserList();
        if (getRes.output === "Success") {
          this.getUserList = getRes.data!!;
        }
      }
    }
  }
})
</script>

<template>
  <div class="p-16 grid gap-8">
    <div class="rounded-lg shadow shadow-indigo-100 bg-white p-4 grid gap-3">
      <div class="flex justify-between">
        <div class="text-2xl font-bold flex items-center">
          <UserOutlined class="pe-3"/>
          <span>用户列表</span>
        </div>
        <div>
          <button
              class="inline-block rounded border border-current w-full px-4 py-2 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
              @click="addUserModal = true">
            添加用户
          </button>
        </div>
      </div>
      <div>
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="text-left">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">用户名</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">邮箱</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">手机号</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">角色</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-end">操作</th>
          </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
          <tr v-for="(value, index) in getUserList.list" :key="index" class="odd:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.user.username }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.user.email }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-900">{{ value.user.phone }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ value.user.role }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-end">
            <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                  class="transition py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                  @click="() => {getUserModal = true; userInfo = value}">
                <EyeOutlined/>
              </button>
              <button
                  class="transition border-s py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                  @click="() => {editUserModal = true; userInfo = value}">
                <EditOutlined/>
              </button>
              <button
                  class="transition border-x py-1 px-3 text-gray-700 hover:bg-gray-50 focus:relative flex items-center"
                  @click="() => {resetUserModal = true; getUserUUID = value.user.uuid}">
                <KeyOutlined/>
              </button>
              <button
                  class="transition py-1 px-3 text-gray-700 hover:bg-red-200 focus:relative flex items-center bg-red-100"
                  @click="() => {deleteUserModal = true; getUserUUID = value.user.uuid}">
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
  <AddUser
      :show-modal="addUserModal"
      @isNew="(val) => isNew = val"
      @updateModal="(val) => addUserModal = val"
  />
  <ResetPassword
      :get-uuid="getUserUUID"
      :show-modal="resetUserModal"
      @updateModal="(val) => resetUserModal = val"
  />
  <DeleteUser
      :get-uuid="getUserUUID"
      :show-modal="deleteUserModal"
      @isNew="(val) => isNew = val"
      @updateModal="(val) => deleteUserModal = val"
  />
  <GetUser
      :get-user="userInfo"
      :show-modal="getUserModal"
      @updateModal="(val) => getUserModal = val"
  />
  <EditUser
      :get-user="userInfo"
      :show-modal="editUserModal"
      @isNew="(val) => isNew = val"
      @updateModal="(val) => editUserModal = val"
  />
</template>
