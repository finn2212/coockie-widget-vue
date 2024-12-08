/* eslint-env jest */
export default {
  // Mocked behavior for retrieving an item from localStorage
  getItem: jest.fn((key) => {
    const mockStorage = {
      cookie_preferences: JSON.stringify({
        essential: { accepted: true },
        analytics: { accepted: false },
      }),
      user_id: "mocked-uuid",
    };

    // Return parsed item if it exists, otherwise return null
    return mockStorage[key] ? JSON.parse(mockStorage[key]) : null;
  }),

  // Mocked behavior for setting an item in localStorage
  setItem: jest.fn((key, value) => {
    console.log(`[Mock] setItem called with key: ${key}, value:`, value);
  }),

  // Mocked behavior for initializing cookies
  initializeCookies: jest.fn((defaultCookies) => {
    return Object.keys(defaultCookies).reduce((result, key) => {
      result[key] = {
        ...defaultCookies[key],
        accepted: defaultCookies[key]?.defaultAccepted || false,
      };
      return result;
    }, {});
  }),

  // Mocked behavior for blocking cookies
  blockCookies: jest.fn((preferences, config) => {
    console.log(`[Mock] blockCookies called with preferences:`, preferences);
    console.log(`[Mock] blockCookies called with config:`, config);
  }),

  // Mocked behavior for resetting cookie overrides
  resetCookieOverride: jest.fn(() => {
    console.log(`[Mock] resetCookieOverride called`);
  }),

  // Mocked behavior for updating all cookies' status
  updateAllCookiesStatus: jest.fn((cookies, accepted) => {
    return Object.keys(cookies).reduce((result, key) => {
      result[key] = {
        ...cookies[key],
        accepted: key === "essential" ? true : accepted, // Ensure essential cookies are always accepted
      };
      return result;
    }, {});
  }),

  // Mocked behavior for saving preferences
  savePreferences: jest.fn((cookies) => {
    console.log(`[Mock] savePreferences called with cookies:`, cookies);
  }),

  // Mocked behavior for retrieving blocked categories
  getBlockedCategories: jest.fn((preferences, config) => {
    const blockedCategories = [];

    Object.keys(preferences).forEach((category) => {
      if (!preferences[category]?.accepted) {
        blockedCategories.push(
          ...(config?.cookies[category]?.keys || [`unknown-key-${category}`])
        );
      }
    });

    console.log(`[Mock] getBlockedCategories called with:`, blockedCategories);
    return blockedCategories;
  }),

  // Mocked behavior for generating a UUID
  generateUUID: jest.fn(() => {
    return "mocked-uuid";
  }),
};
