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
        :functionality="config.functionality"
        @open-dialog="openDialog"
        @accept-all="acceptAllCookies"
        @reject-all="rejectAll"
      />
      <CookieDialog
        v-if="isDialogOpen"
        :isDialogOpen="isDialogOpen"
        :content="config.content"
        :cookies="cookies"
        :functionality="config.functionality"
        @close-dialog="closeDialog"
        @reject-all="rejectAll"
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
      this.setThemeVariables(mockConfig.theme);
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
    acceptAllCookies(updatedCookies) {
      this.cookies = updatedCookies;
      console.log("Preferences saved:", this.cookies);
      this.closeDialog();
    },
    rejectAll(updatedCookies) {
      this.cookies = updatedCookies;
      console.log("Preferences saved:", this.cookies);
      this.closeDialog();
    },
    setThemeVariables(theme) {
      const root = document.documentElement.style;
      root.setProperty("--gt-cookie-bg", theme.background);
      root.setProperty("--gt-cookie-text", theme.text);
      root.setProperty("--gt-cookie-link-text", theme.linkText);
      root.setProperty("--gt-cookie-button-bg", theme.buttonBackground);
      root.setProperty("--gt-cookie-button-text", theme.buttonText);
    },
  },
};
</script>
