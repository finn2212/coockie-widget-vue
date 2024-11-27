<template>
  <div id="app">
    <!-- Show a loading state until config and cookies are available -->
    <div v-if="!config || !config.content">
      <p>Loading...</p>
    </div>
    <div v-else>
      <CookieBanner :config="config.content.widget_banner_message" />
      <CookieDialog :config="config.content" :cookies="cookies" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CookieBanner from "@/components/CookieBanner.vue";
import CookieDialog from "@/components/CookieDialog.vue";

export default {
  components: { CookieBanner, CookieDialog },
  computed: {
    ...mapGetters(["config", "cookies"]),
  },
  created() {
    // Dispatch action to load configuration data
    this.$store.dispatch("loadConfig");
  },
};
</script>
