<template>
  <div id="app">
    <!-- Show a loading state until config and cookies are available -->
    <div v-if="config">
      <div
        ref="wrapperElement"
        class="gt-cookie-widget-wrapper"
        :class="{
          'gt-cookie-widget-wrapper--block':
            config.functionality.blockInteraction,
        }"
        :data-gt-cookie-widget-shown="isCoockiebannerOpen ? 'true' : 'false'"
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
          @accept-all="acceptAllCookies"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CookieService from "@/services/CookieService";
import ThemeService from "@/services/ThemeService";
import { fetchMockConfig } from "@/mockConfig";
import CookieBanner from "@/components/CookieBanner.vue";
import CookieDialog from "@/components/CookieDialog.vue";

export default {
  components: { CookieBanner, CookieDialog },
  data() {
    return {
      config: null,
      cookies: null,
      isDialogOpen: false,
      isCoockiebannerOpen: false,
    };
  },
  created() {
    // Mock loading the config and cookies
    this.loadConfig();
  },
  methods: {
    async loadConfig() {
      // Assign the mock configuration
      this.config = await fetchMockConfig();
      const defaultCookies = this.config.cookies;

      this.cookies = CookieService.initializeCookies(
        defaultCookies,
        this.config
      );

      // Apply font correction using ThemeService
      ThemeService.correctFontFamily(this.$refs.wrapperElement);
      // Apply theme variables using ThemeService
      ThemeService.setThemeVariables(this.config.theme);
      this.isCoockiebannerOpen = true;
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
      this.isCoockiebannerOpen = false;
    },
    savePreferences(updatedCookies) {
      CookieService.savePreferences(updatedCookies, this.config);
      this.cookies = updatedCookies;
      this.closeDialog();
    },

    acceptAllCookies() {
      // Set all cookies to accepted
      const updatedCookies = CookieService.updateAllCookiesStatus(
        this.cookies,
        true,
        this.config
      );
      this.cookies = updatedCookies;

      this.closeDialog();
    },

    rejectAll() {
      // Set all cookies to not accepted
      const updatedCookies = CookieService.updateAllCookiesStatus(
        this.cookies,
        false,
        this.config
      );
      this.cookies = updatedCookies;

      this.closeDialog();
    },
  },
};
</script>
