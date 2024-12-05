export const mockConfig = {
  theme: {
    fontSize: "14px",
    background: "#ffffff",
    text: "#111111",
    linkText: "#065AF9",
    buttonBackground: "#065AF9",
    buttonText: "#ffffff",
  },
  layout: {
    appearance: "pill", // Can be 'pill', 'banner', 'popup', or 'card'
    position: "center", // Can be 'left', 'center', or 'right'
  },
  content: {
    cookiePolicyUrl: "https://getterms.io/cookie-policy",
    cookiePolicyLinkText: "Cookie Policy",
    dialogTitle: "Your Cookie Preferences",
    dialog_message:
      "We use cookies to improve your experience on this website. You may choose which types of cookies to allow and change your preferences at any time. Disabling cookies may impact your experience on this website. You can learn more by viewing our [cookiepolicy]",
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
    allowPreferences: true, // Allows users to manage preferences
    blockInteraction: true, // Prevents interaction until consent is given
    blockScripts: true, // Blocks third-party scripts before consent
    hasRejectAll: true, // Adds a 'Reject All' button
    googleConsentMode: true, // Integrates with Google Consent Mode
  },
  cookies: {
    essential: {
      label: "Essential Cookies",
      slug: "essential-cookies",
      description: "Cookies required to enable basic website functionality.",
      total: 0,
      keys: [],
      cookies: [],
    },
    functional: {
      label: "Functional Cookies",
      slug: "functional",
      description:
        "Cookies that are used to enhance the functionality of the website.",
      total: 1,
      keys: ["JSESSIONID"],
      cookies: [
        {
          key: "JSESSIONID",
          data_controller: "Oracle",
          platform: "Oracle",
          domain: "Advertiser's website domain (1st party)",
          retention_period: "Session",
          description:
            "JSESSIONID is a platform session cookie and is used by sites with JavaServer Pages (JSP). The cookie is used to maintain an anonymous user session by the server.",
          user_privacy_gdpr_rights_portals: "https://www.oracle.com/privacy",
        },
      ],
    },
    marketing: {
      label: "Advertising Cookies",
      slug: "marketing",
      description:
        "Cookies used to deliver advertising that is more relevant to your interests.",
      total: 0,
      keys: [],
      cookies: [],
    },
    analytics: {
      label: "Performance Cookies",
      slug: "analytics",
      description: "Cookies used to understand how the website is being used.",
      total: 0,
      keys: [],
      cookies: [],
    },
    unclassified: {
      label: "Unclassified",
      slug: "unclassified",
      description: "Cookies that have not yet been categorised.",
      total: 12,
      keys: [
        "euconsent-bypass",
        "ui_cid",
        "utag_main",
        "CSSLB",
        "CSSID",
        "CSSC",
        "CSSRT",
        "route_mamcms",
        "NGUserID",
        "wa",
        "ua_id",
        "BSSLB",
      ],
      cookies: [
        {
          key: "euconsent-bypass",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "ui_cid",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "utag_main",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "CSSLB",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "CSSID",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "CSSC",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "CSSRT",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "route_mamcms",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "NGUserID",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "wa",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "ua_id",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
        {
          key: "BSSLB",
          data_controller: null,
          platform: null,
          domain: null,
          retention_period: null,
          description: null,
          user_privacy_gdpr_rights_portals: null,
        },
      ],
    },
  },
};

export const fetchMockConfig = async () => {
  // Simulate an API call delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockConfig), 500);
  });
};
