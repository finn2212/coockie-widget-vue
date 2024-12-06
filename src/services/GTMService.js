// src/services/GTMService.js
const GTMService = {
  /**
   * Updates Google Consent Mode and pushes events to the GTM dataLayer.
   * @param {Object} prefs - User consent preferences for various categories.
   * @param {Function} gtmCallback - Optional callback for custom GTM Tag Template.
   * @param {Boolean} suppressLog - Whether to suppress warnings if GTM is not loaded.
   */
  updateConsent(prefs, gtmCallback, suppressLog = false) {
    // Initialize dataLayer if not already available
    window.dataLayer = window.dataLayer || [];
    // Push consent update event to GTM
    window.dataLayer.push({
      event: "consentUpdate",
    });
    // Handle consent updates via callback or directly with gtag
    if (gtmCallback) {
      gtmCallback(prefs);
    } else if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: prefs["Marketing"] ? "granted" : "denied",
        ad_user_data: prefs["Marketing"] ? "granted" : "denied",
        ad_personalization: prefs["Marketing"] ? "granted" : "denied",
        analytics_storage: prefs["Analytics"] ? "granted" : "denied",
        functionality_storage: prefs["Functional"] ? "granted" : "denied",
        personalization_storage: prefs["Functional"] ? "granted" : "denied",
        security_storage: prefs["Essential Cookies"] ? "granted" : "denied",
      });
    } else {
      // If GTM or gtag is not available, log a warning (unless suppressed)
      if (!suppressLog) {
        console.warn(
          "Cookie preferences have been updated, but GTM has not loaded in time to be notified. Please ensure the following:\r\n" +
            "\t1. You have added your GTM embed code to your page beneath the GetTerms cookie widget embed code.\r\n" +
            "\t2. If you are not using the GetTerms GTM Tag Template, you have copied the code from the widget installation instructions correctly.\r\n" +
            "\t3. If you are using the GetTerms GTM Tag Template, you have added the GetTerms GTM Tag Template to your GTM container and published the container.\r\n" +
            "If all three above are true, GTM is likely to receive this consent update soon, and you can safely ignore this message."
        );
      }
    }
  },
  /**
   * If Google Consent Mode is enabled, we need to unblock GTM and retain whatever consent the user has already given
   */
  initGoogleConsent() {
    //If Google Consent Mode is enabled, we need to unblock GTM and retain whatever consent the user has already given
  },
};
export default GTMService;
