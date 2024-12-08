import { ref } from "vue";
import CookieService from "@/services/CookieService";
import ThemeService from "@/services/ThemeService";
import { fetchMockConfig } from "@/mockConfig";

let instance = null; // Singleton instance

export function useCookieManager() {
  if (!instance) {
    // Reactive state
    const isDialogOpen = ref(false);
    const isCookieBannerOpen = ref(true);
    const config = ref(null);
    const cookies = ref(null);

    // Load configuration and initialize cookies
    const loadConfig = async () => {
      if (!config.value) {
        config.value = await fetchMockConfig();
        cookies.value = CookieService.initializeCookies(
          config.value.cookies,
          config.value
        );

        // Apply theme and font adjustments
        ThemeService.correctFontFamily();
        ThemeService.setThemeVariables(config.value.theme);

        isCookieBannerOpen.value = true;
      }
    };

    // Automatically load config when the instance is created
    loadConfig();

    // Open the dialog
    const openDialog = () => {
      isDialogOpen.value = true;
    };

    // Close the dialog
    const closeDialog = () => {
      isDialogOpen.value = false;
    };

    // Save preferences and close the banner
    const savePreferences = (updatedCookies) => {
      CookieService.savePreferences(updatedCookies, config.value);
      cookies.value = updatedCookies;
      isCookieBannerOpen.value = false;
      closeDialog();
    };

    // Accept all cookies and close the banner
    const acceptAllCookies = () => {
      const updatedCookies = CookieService.updateAllCookiesStatus(
        cookies.value,
        true,
        config.value
      );
      cookies.value = updatedCookies;
      isCookieBannerOpen.value = false;
      closeDialog();
    };

    // Reject all cookies and close the banner
    const rejectAllCookies = () => {
      const updatedCookies = CookieService.updateAllCookiesStatus(
        cookies.value,
        false,
        config.value
      );
      cookies.value = updatedCookies;
      isCookieBannerOpen.value = false;
      closeDialog();
    };

    // Assign singleton instance
    instance = {
      config,
      cookies,
      isDialogOpen,
      isCookieBannerOpen,
      loadConfig,
      openDialog,
      closeDialog,
      savePreferences,
      acceptAllCookies,
      rejectAllCookies,
    };
  }

  return instance;
}
