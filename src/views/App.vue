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
import CookieService from "@/services/CookieService";
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
      // Assign the mock configuration
      this.config = mockConfig;
      const defaultCookies = mockConfig.cookies;

      // Load saved preferences from localStorage
      const savedPreferences = CookieService.getItem("cookie_preferences");

      // Update cookies with saved preferences
      this.cookies = Object.keys(defaultCookies).reduce((result, key) => {
        const category = defaultCookies[key];

        result[key] = {
          ...category,
          accepted:
            savedPreferences && savedPreferences[key] !== undefined
              ? savedPreferences[key].accepted // Use saved preference if it exists
              : category.defaultAccepted || false, // Use defaultAccepted if no preference saved
        };
        return result;
      }, {});

      // Apply saved preferences to block cookies
      const blockedCategories = this.getBlockedCategories(
        savedPreferences || {}
      );
      CookieService.blockCookies(blockedCategories);

      // Apply theme variables
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
      console.log(updatedCookies);
      CookieService.setItem("cookie_preferences", updatedCookies);
      const blockedCategories = this.getBlockedCategories(updatedCookies);
      CookieService.blockCookies(blockedCategories);
      this.closeDialog();
    },
    acceptAllCookies() {
      const allAccepted = Object.keys(this.cookies).reduce((prefs, key) => {
        prefs[key] = true;
        return prefs;
      }, {});
      this.savePreferences(allAccepted);
    },
    rejectAll() {
      const allRejected = Object.keys(this.cookies).reduce((prefs, key) => {
        prefs[key] = false;
        return prefs;
      }, {});
      this.savePreferences(allRejected);
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
