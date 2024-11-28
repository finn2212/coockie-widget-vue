export const mockConfig = {
  theme: {
    fontSize: "12px",
    background: "#ffffff",
    text: "#111111",
    linkText: "#065af9",
    buttonBackground: "#065af9",
    buttonText: "#ffffff",
  },
  layout: {
    appearance: "card", // Can be 'pill', 'banner', 'popup', or 'card'
    position: "center", // Can be 'left', 'center', or 'right'
  },
  content: {
    cookiePolicyUrl: "https://getterms.io/cookie-policy",
    cookiePolicyLinkText: "Cookie Policy",
    dialogTitle: "Your Cookie Preferences",
    dialogMessage: "This website uses cookies",
    dialogSavePreferencesButton: "Save Preferences",
    dialogAcceptAllButton: "Accept All Cookies",
    dialogRejectAllButton: "Reject All Cookies",
    widgetBannerMessage:
      "This website uses cookies to improve your experience. By clicking “Accept” you are agreeing to our [cookiepolicy].",
    widgetPillMessage: "This website uses cookies",
    widgetManagePreferencesButton: "Preferences",
    widgetRejectAllButton: "Reject All",
    widgetAcceptAllButton: "Accept",
    widgetShowCookiesButton: "Show",
    widgetHideCookiesButton: "Hide",
    cookieEssentialTitle: "Essential Cookies",
    cookieEssentialDescription:
      "Cookies required to enable basic website functionality.",
    cookieFunctionalTitle: "Functional Cookies",
    cookieFunctionalDescription:
      "Cookies that are used to enhance the functionality of the website.",
    cookieMarketingTitle: "Advertising Cookies",
    cookieMarketingDescription:
      "Cookies used to deliver advertising that is more relevant to your interests.",
    cookieAnalyticsTitle: "Performance Cookies",
    cookieAnalyticsDescription:
      "Cookies used to understand how the website is being used.",
    cookieUnclassifiedTitle: "Unclassified",
    cookieUnclassifiedDescription:
      "Cookies that have not yet been categorised.",
    cookieHeadingPlatform: "Platform",
    cookieHeadingNameDescription: "Name & Description",
    cookieHeadingRetention: "Retention",
  },
  functionality: {
    allowPreferences: "on", // Allows users to manage preferences
    blockInteraction: "off", // Prevents interaction until consent is given
    blockScripts: "off", // Blocks third-party scripts before consent
    hasRejectAll: "off", // Adds a 'Reject All' button
    googleConsentMode: "on", // Integrates with Google Consent Mode
  },
  cookies: {
    essential: {
      label: "Essential Cookies",
      description: "Cookies required to enable basic website functionality.",
      total: 0,
      keys: [],
      cookies: [],
    },
    functional: {
      label: "Functional Cookies",
      description:
        "Cookies that are used to enhance the functionality of the website.",
      total: 1,
      keys: ["XSRF-TOKEN"],
      cookies: [
        {
          key: "XSRF-TOKEN",
          dataController: "None",
          platform: "Advertiser's website domain",
          domain: "Advertiser's website domain (1st party)",
          retentionPeriod: "Session",
          description:
            "This cookie is written to help with site security in preventing Cross-Site Request Forgery attacks.",
          userPrivacyGdprRightsPortals: "",
        },
      ],
    },
    marketing: {
      label: "Advertising Cookies",
      description:
        "Cookies used to deliver advertising that is more relevant to your interests.",
      total: 1,
      keys: ["_gcl_au"],
      cookies: [
        {
          key: "_gcl_au",
          dataController: "Google",
          platform: "Google",
          domain: "Advertiser's website domain (1st party)",
          retentionPeriod: "3 months",
          description:
            "Used by Google AdSense for experimenting with advertisement efficiency across websites using their services.",
          userPrivacyGdprRightsPortals:
            "https://privacy.google.com/take-control.html",
        },
      ],
    },
    analytics: {
      label: "Performance Cookies",
      description: "Cookies used to understand how the website is being used.",
      total: 2,
      keys: ["_ga", "_ga_"],
      cookies: [
        {
          key: "_ga",
          dataController: "Google",
          platform: "Google Analytics",
          domain:
            "google-analytics.com (3rd party) or advertiser's website domain (1st party)",
          retentionPeriod: "2 years",
          description: "ID used to identify users",
          userPrivacyGdprRightsPortals:
            "https://privacy.google.com/take-control.html",
        },
        {
          key: "_ga_",
          dataController: "Google",
          platform: "Google Analytics",
          domain:
            "google-analytics.com (3rd party) or advertiser's website domain (1st party)",
          retentionPeriod: "2 years",
          description: "ID used to identify users",
          userPrivacyGdprRightsPortals:
            "https://privacy.google.com/take-control.html",
        },
      ],
    },
    unclassified: {
      label: "Unclassified",
      description: "Cookies that have not yet been categorised.",
      total: 1,
      keys: ["getterms_session"],
      cookies: [
        {
          key: "getterms_session",
          dataController: null,
          platform: null,
          domain: null,
          retentionPeriod: null,
          description: null,
          userPrivacyGdprRightsPortals: null,
        },
      ],
    },
  },
};
