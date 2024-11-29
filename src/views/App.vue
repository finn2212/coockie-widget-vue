<template>
  <div id="app">
    <!-- Show a loading state until config and cookies are available -->
    <div v-if="!config || !config.content">
      <p>Loading...</p>
    </div>
    <div
      v-else
      class="gt-cookie-widget-wrapper"
      data-gt-cookie-widget-shown="true"
    >
      <CookieBanner
        :layout="config.layout"
        :content="config.content"
        @open-dialog="openDialog"
        @accept-all="acceptAllCookies"
      />
      <CookieDialog
        v-if="isDialogOpen"
        :isDialogOpen="isDialogOpen"
        :config="config.content"
        :cookies="cookies"
        @close-dialog="closeDialog"
        @save-preferences="savePreferences"
      />
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
      isDialogOpen: false,
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
    openDialog() {
      this.isDialogOpen = true;
      console.log(this.isDialogOpen);
    },
    closeDialog() {
      this.isDialogOpen = false;
      console.log("Closing dialog..." + this.isDialogOpen);
    },
    savePreferences(updatedCookies) {
      this.cookies = updatedCookies;
      console.log("Preferences saved:", this.cookies);
      this.closeDialog();
    },
  },
};
</script>
