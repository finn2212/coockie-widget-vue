<template>
  <div id="app">
    <!-- Show a loading state until config and cookies are available -->
    <div v-if="!config || !config.content">
      <p>Loading...</p>
    </div>
    <div v-else>
      <CookieBanner :layout="config.layout" :content="config.content" />
      <CookieDialog :config="config.content" :cookies="cookies" />
    </div>
  </div>
</template>

<script>
import { mockConfig } from "@/mockConfig"; // Adjust the path as needed
import CookieBanner from "@/components/CookieBanner.vue";
import CookieDialog from "@/components/CookieDialog.vue";

export default {
  components: { CookieBanner, CookieDialog },
  data() {
    return {
      config: null,
      cookies: null,
    };
  },
  created() {
    // Mock loading the config and cookies
    this.loadConfig();
  },
  methods: {
    loadConfig() {
      this.config = mockConfig;
      this.cookies = mockConfig.cookies;
      console.log(mockConfig);
    },
  },
};
</script>
