<template>
  <div id="app">
    <!-- Show a loading state until config and cookies are available -->
    <div v-if="!config || !config.content">
      <p>Loading...</p>
    </div>
    <div
      v-else
      ref="wrapperElement"
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
        @accept-all="acceptAllCookies"
      />
    </div>
  </div>
</template>

<script>
import CookieService from "@/services/CookieService";
import ThemeService from "@/services/ThemeService";
import { mockConfig } from "@/mockConfig";
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
  mounted() {
    // Apply font correction using ThemeService
    ThemeService.correctFontFamily(this.$refs.wrapperElement);
  },
  methods: {
    loadConfig() {
      // Assign the mock configuration
      this.config = mockConfig;
      const defaultCookies = mockConfig.cookies;

      // Load saved preferences from localStorage
      const savedPreferences = CookieService.getItem("cookie_preferences");
      this.cookies = CookieService.initializeCookies(
        defaultCookies,
        savedPreferences
      );

      // Apply saved preferences to block cookies
      const blockedCategories = this.getBlockedCategories(
        savedPreferences || {}
      );
      CookieService.blockCookies(blockedCategories);

      // Apply theme variables using ThemeService
      ThemeService.setThemeVariables(mockConfig.theme);
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    savePreferences(updatedCookies) {
      const preferences = CookieService.savePreferences(updatedCookies);
      const blockedCategories = this.getBlockedCategories(preferences);
      CookieService.blockCookies(blockedCategories);
      this.cookies = updatedCookies; // Update local state
      this.closeDialog();
    },
    updateAllCookiesStatus(accepted) {
      const updatedCookies = CookieService.updateAllCookiesStatus(
        this.cookies,
        accepted
      );
      this.savePreferences(updatedCookies);
      // Save the updated preferen
    },

    acceptAllCookies() {
      this.updateAllCookiesStatus(true); // Set all cookies to accepted
      this.closeDialog();
    },

    rejectAll() {
      this.updateAllCookiesStatus(false); // Set all cookies to rejected
      this.closeDialog();
    },
    getBlockedCategories(preferences) {
      const blockedCategories = [];

      Object.keys(preferences).forEach((category) => {
        if (!this.config.cookies[category]) {
          console.warn(`Unknown category: ${category}`);
        } else if (!preferences[category]) {
          blockedCategories.push(...this.config.cookies[category].keys);
        }
      });

      return blockedCategories;
    },
    correctFontFamily() {
      const wrapperElement = this.$refs.wrapperElement; // Reference the wrapper element
      if (!wrapperElement) return;

      const originalFontFamily =
        window.getComputedStyle(wrapperElement).fontFamily;
      wrapperElement.style.setProperty("font-family", "initial");
      const defaultFontFamily =
        window.getComputedStyle(wrapperElement).fontFamily;

      if (originalFontFamily === defaultFontFamily) {
        wrapperElement.style.setProperty("font-family", "sans-serif");
      } else {
        wrapperElement.style.removeProperty("font-family");
      }
    },
    setThemeVariables(theme) {
      const root = document.documentElement.style;
      root.setProperty("--gt-cookie-bg", theme.background);
      root.setProperty("--gt-cookie-text", theme.text);
      root.setProperty("--gt-cookie-link-text", theme.linkText);
      root.setProperty("--gt-cookie-button-bg", theme.buttonBackground);
      root.setProperty("--gt-cookie-button-text", theme.buttonText);
      root.setProperty("--gt-cookie-font-size", theme.fontSize);
    },
  },
};
</script>
