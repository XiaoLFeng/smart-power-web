<script lang="ts">
import {defineComponent} from 'vue'
import HeaderMenu from "@/components/dashboard/HeaderMenu.vue";
import {UserCurrentAPI} from "@/apis/UserApi";

export default defineComponent({
  name: "BaseDashboard",
  components: {HeaderMenu},
  data() {
    return {
      getFirstLetterCapitalized: "",
      userCurrent: UserCurrentAPI()
    }
  },
  async created() {
    const getUserCurrent = await this.userCurrent
    if (getUserCurrent.output === "Success") {
      document.title = '仪表盘 - 你好' + getUserCurrent.data?.user.username
    } else {
      localStorage.removeItem("authorization")
      this.$router.replace({name: "AuthLogin", replace: true})
    }
  },
  provide() {
    return {
      UserCurrent: () => this.userCurrent
    }
  }
})
</script>

<template>
  <div class="flex">
      <HeaderMenu/>
  </div>
</template>

<style scoped>

</style>
