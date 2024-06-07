<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GetUser",
  props: {
    showModal: Boolean,
    getUser: Object,
  },
  data() {
    return {
      open: false,
      user: {} as UserCurrentEntity,
    }
  },
  watch: {
    showModal: function (val) {
      if (val) {
        this.open = true;
        this.user = this.getUser as UserCurrentEntity;
      }
    },
    open: function (val) {
      if (val) {
        this.$emit('updateModal', false);
      }
    }
  }
})
</script>

<template>
  <a-modal v-model:open="open" title="用户详情">
    <div class="gap-3 flow-root pt-6">
      <dl class="-my-3 divide-y divide-gray-100 text-sm">
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">用户UUID</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.user.uuid }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">角色用户名</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.user.username }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">用户角色组</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.user.role }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">用户邮箱</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.user.email }}</dd>
        </div>
        <div class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">用户手机号</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.user.phone }}</dd>
        </div>
        <div v-if="user.company.name !== ''"
            class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">用户下企业</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.company.name }}</dd>
        </div>
        <div v-if="user.company.name !== ''"
             class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">企业统一信用代码</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.company.cods }}</dd>
        </div>
        <div v-if="user.company.name !== ''"
             class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">企业地址</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.company.address }}</dd>
        </div>
        <div v-if="user.company.name !== ''"
             class="grid grid-cols-1 gap-1 py-1 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900 text-end">企业法定代表人</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ user.company.representative }}</dd>
        </div>
      </dl>
    </div>
    <template #footer>
      <button key="back" class="mt-3 transition border border-blue-400 text-blue-400 px-4 py-1 rounded-lg hover:border-blue-500 hover:text-blue-500 hover:scale-105 hover:shadow"
              @click="open = false">
        关闭
      </button>
    </template>
  </a-modal>
</template>
