<script lang="ts">
import {defineComponent} from 'vue'
import HeaderMenu from "@/components/console/HeaderMenu.vue";
import {UserCurrentAPI} from "@/apis/UserApi";

export default defineComponent({
  name: "BaseConsole",
  components: {HeaderMenu},
  data() {
    return {
      getFirstLetterCapitalized: "",
      userCurrent: UserCurrentAPI(),
    }
  },
  async created() {
    const getUserCurrent = await this.userCurrent
    if (getUserCurrent.output !== "Success") {
      localStorage.removeItem("authorization");
      this.$router.replace({name: "AuthLogin", replace: true});
    }
  },
  provide() {
    return {
      UserCurrent: () => this.userCurrent,
    }
  }
});
</script>

<template>
  <div class="flex bg-gradient-to-r from-gray-200 to-gray-300/75">
    <div class="fixed left-0 top-0">
      <HeaderMenu/>
    </div>
    <div class="w-full min-h-dvh ps-[15rem]">
      <RouterView/>
    </div>
  </div>
</template>
