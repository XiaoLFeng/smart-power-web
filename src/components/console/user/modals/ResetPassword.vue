<script lang="ts">
import {defineComponent} from 'vue'
import {ConsoleUserResetPasswordAPI} from "@/apis/ConsoleApi";
import {message, notification} from "ant-design-vue";

export default defineComponent({
  name: "ResetPassword",
  props: {
    showModal: Boolean,
    getUuid: String,
  },
  data() {
    return {
      open: false,
      userUUID: "",
    }
  },
  methods: {
    async formSubmit() {
      console.log(this.userUUID);
      const getRes = await ConsoleUserResetPasswordAPI(this.userUUID);
      if (getRes.output === "Success") {
        this.open = false;
        this.$emit('updateModal', false);
        // 显示添加成功的密码
        notification.open({
          message: `用户 ${getRes.data?.user.username} 密码修改成功`,
          description: `修改密码为：${getRes.data?.password}`,
        });
      } else {
        message.warn(getRes.error_message);
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
    getUuid: function (val) {
      this.userUUID = val;
    }
  }
})
</script>

<template>
  <a-modal v-model:open="open" title="重置用户密码">
    <p>确定重置该用户的密码吗？这个操作不可逆！</p>
    <template #footer>
      <a-button key="back" @click="open = false">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="formSubmit()">
        确定
      </a-button>
    </template>
  </a-modal>
</template>
