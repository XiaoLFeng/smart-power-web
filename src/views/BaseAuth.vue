<script lang="ts">
import {defineComponent} from 'vue'
import {UserCurrentAPI} from "@/apis/UserApi";

export default defineComponent({
  name: "BaseAuth",
  async created() {
    // 检查用户是否登陆
    const getRes = await UserCurrentAPI();
    if (getRes.output === "Success") {
      this.$router.replace({name: "DashHome", replace: true})
    } else {
      // 获取 URI 地址
      if (this.$route.path === '/auth') {
        this.$router.replace({name: "AuthLogin"})
      }
    }
  },
})
</script>

<template>
  <section class="bg-white">
    <RouterView/>
  </section>
</template>

