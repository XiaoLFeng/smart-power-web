<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BaseAuth",
  created() {
    // 获取 URI 地址
    if (this.$route.path === '/auth') {
      this.$router.replace({name: "AuthLogin"})
    }
  },
})
</script>

<template>
  <RouterView/>
</template>

