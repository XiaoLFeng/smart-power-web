<script lang="ts">
import {defineComponent} from 'vue'
import {ConsoleUserDeleteAPI} from "@/apis/ConsoleApi";
import {message} from "ant-design-vue";

export default defineComponent({
  name: "DeleteUser",
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
      const getRes = await ConsoleUserDeleteAPI(this.userUUID);
      if (getRes.output === "Success") {
        message.success("删除成功");
        this.open = false;
        this.$emit('updateModal', false);
        this.$emit('isNew', true);
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
    <p>确定删除该用户吗？这将会清空所有与其有关信息</p>
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
