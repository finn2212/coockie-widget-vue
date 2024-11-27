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
    },
    functional: {
      label: "Functional",
      description: "Enhances performance",
      total: 3,
    },
    marketing: {
      label: "Marketing",
      description: "Used for advertising",
      total: 4,
    },
    analytics: {
      label: "Analytics",
      description: "Tracks usage data",
      total: 6,
    },
  },
};

export const fetchMockConfig = async () => {
  // Simulate an API call delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockApiData), 500);
  });
};
