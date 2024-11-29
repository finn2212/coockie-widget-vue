const mockApiData = {
  config: {
    theme: {
      font_size: "16px",
      background: "#ffffff",
      text: "#000000",
      link_text: "#1e90ff",
      button_background: "#1e90ff",
      button_text: "#ffffff",
    },
    layout: {
      appearance: "popup",
      position: "bottom-right",
    },
    content: {
      dialog_title: "We use cookies!",
      dialog_message: "Manage your preferences or accept all cookies.",
      dialog_save_preferences_button: "Save Preferences",
      dialog_accept_all_button: "Accept All",
      dialog_reject_all_button: "Reject All",
      widget_banner_message: "We use cookies to enhance your experience.",
    },
  },
  cookies: {
    essential: {
      label: "Essential",
      description: "Required for functionality",
      total: 5,
      cookies: [
        {
          platform: "System Platform",
          name: "_system_session",
          description: "Session identifier for system functionality.",
          retention: "Session",
        },
        {
          platform: "System Platform",
          name: "XSRF-TOKEN",
          description: "Prevents cross-site request forgery attacks.",
          retention: "1 hour",
        },
        {
          platform: "System Platform",
          name: "auth_token",
          description: "Authentication token for logged-in users.",
          retention: "7 days",
        },
        {
          platform: "System Platform",
          name: "locale",
          description: "Stores user language preferences.",
          retention: "1 year",
        },
        {
          platform: "System Platform",
          name: "theme",
          description: "Stores theme preferences (dark/light mode).",
          retention: "1 year",
        },
      ],
    },
    functional: {
      label: "Functional",
      description: "Enhances performance",
      total: 3,
      cookies: [
        {
          platform: "Video Player",
          name: "video_quality",
          description: "Remembers preferred video quality settings.",
          retention: "1 year",
        },
        {
          platform: "User Dashboard",
          name: "dashboard_layout",
          description: "Stores custom dashboard layout preferences.",
          retention: "30 days",
        },
        {
          platform: "Feedback System",
          name: "feedback_session",
          description: "Tracks user interactions during feedback submissions.",
          retention: "Session",
        },
      ],
    },
    marketing: {
      label: "Marketing",
      description: "Used for advertising",
      total: 4,
      cookies: [
        {
          platform: "Ad Network",
          name: "_ad_click_id",
          description: "Tracks clicks on advertising banners.",
          retention: "90 days",
        },
        {
          platform: "Social Media",
          name: "_fbp",
          description:
            "Tracks social media engagement for advertising purposes.",
          retention: "3 months",
        },
        {
          platform: "Ad Network",
          name: "_gcl_au",
          description: "Google AdSense cookie for ad campaign performance.",
          retention: "3 months",
        },
        {
          platform: "Affiliate Program",
          name: "affiliate_id",
          description: "Tracks affiliate referral activity.",
          retention: "6 months",
        },
      ],
    },
    analytics: {
      label: "Analytics",
      description: "Tracks usage data",
      total: 6,
      cookies: [
        {
          platform: "Google Analytics",
          name: "_ga",
          description: "Used to distinguish users for analytics purposes.",
          retention: "2 years",
        },
        {
          platform: "Google Analytics",
          name: "_gid",
          description: "Used to distinguish users within a single session.",
          retention: "24 hours",
        },
        {
          platform: "Heatmap Tool",
          name: "_hjid",
          description: "Tracks user session to improve website design.",
          retention: "1 year",
        },
        {
          platform: "Performance Tracker",
          name: "perf_metric",
          description: "Measures website performance metrics.",
          retention: "30 days",
        },
        {
          platform: "Survey Tool",
          name: "_survey_optin",
          description: "Tracks user opt-ins for surveys.",
          retention: "6 months",
        },
        {
          platform: "Custom Analytics",
          name: "custom_analytics_user",
          description: "Custom data collection for in-house analytics.",
          retention: "1 year",
        },
      ],
    },
  },
};

export const fetchMockConfig = async () => {
  // Simulate an API call delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockApiData), 500);
  });
};
