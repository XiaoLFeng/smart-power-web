<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BaseIndex",
  created() {
    document.title = '智电管家 - 首页'
    this.$router.replace({name: 'AuthLogin', replace: true})
  },
})
</script>

<template>

</template>

<style scoped>

</style>
