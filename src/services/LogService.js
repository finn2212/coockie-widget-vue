// src/services/LogService.js
import Client from "./Client";
import CookieService from "./CookieService"; // Assuming this is where `localStorageGetItem` and `localStorageSetItem` are defined.

const LogService = {
  /**
   * Logs updated preferences to the server using the Client class.
   * @param {Object} prefs - The updated cookie preferences.
   * @param {Object} config - The configuration object.
   * @param {Boolean} suppressReload - Whether to suppress page reload after logging.
   * @param {Boolean} isPreview - Whether the application is in preview mode.
   */
  async logPreferences(
    prefs,
    config,
    suppressReload = false,
    isPreview = false
  ) {
    const userId = CookieService.getItem("user_id");
    const client = new Client(config.api_base, config.uuid);

    try {
      const response = await client.storeLog({
        cookie_preferences: {
          Essential: prefs["essential"],
          Functional: prefs["functional"],
          Marketing: prefs["marketing"],
          Analytics: prefs["analytics"],
          Unclassified: prefs["unclassified"],
        },
        user_id: userId,
      });

      return response;
    } catch (error) {
      console.log("Unable to store logs at this time", error);
    } finally {
      // Handle reload if scripts need to be blocked
      if (
        !suppressReload &&
        !isPreview &&
        config.functionality.blockScripts === "on"
      ) {
        window.location.reload();
      }
    }
  },
};

export default LogService;
