export const mockConfig = {
  theme: {
    fontSize: "12px",
    background: "#ffffff",
    text: "#111111",
    linkText: "#065AF9",
    buttonBackground: "#065af9",
    buttonText: "#ffffff",
  },
  layout: {
    appearance: "popup", // Can be 'pill', 'banner', 'popup', or 'card'
    position: "left", // Can be 'left', 'center', or 'right'
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
    blockInteraction: false, // Prevents interaction until consent is given
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
      keys: ["XSRF-TOKEN"],
      cookies: [
        {
          key: "XSRF-TOKEN",
          dataController: "None",
          platform: "Advertiser's website domain",
          domain: "Advertiser's website domain (1st party)",
          retentionPeriod: "Session",
          retention: "1 Year",
          description:
            "This cookie is written to help with site security in preventing Cross-Site Request Forgery attacks.",
          userPrivacyGdprRightsPortals: "",
        },
      ],
    },
    marketing: {
      label: "Advertising Cookies",
      slug: "marketing",
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
          retention: "1 Year",
          description:
            "Used by Google AdSense for experimenting with advertisement efficiency across websites using their services.",
          userPrivacyGdprRightsPortals:
            "https://privacy.google.com/take-control.html",
        },
      ],
    },
    unclassified: {
      label: "Unclassified",
      slug: "unclassified",
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
          retention: "1 Year",
          description:
            "This cookie is written to help with site security in preventing Cross-Site Request Forgery attacks.",
          userPrivacyGdprRightsPortals: "",
        },
        {
          key: "XSRF-TOKEN",
          dataController: "None",
          platform: "Advertiser's website domain",
          domain: "Advertiser's website domain (1st party)",
          retentionPeriod: "Session",
          retention: "1 Year",
          description:
            "This cookie is written to help with site security in preventing Cross-Site Request Forgery attacks.",
          userPrivacyGdprRightsPortals: "",
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
