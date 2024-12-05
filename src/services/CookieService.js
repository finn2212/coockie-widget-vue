const STORAGE_KEY = "getterms_cookie_consent";
import GTMService from "@/services/GTMService";
import LogService from "./LogService";

export default {
  getItem(key) {
    const cache = localStorage.getItem(STORAGE_KEY);
    if (!cache) return null;
    const parsedCache = JSON.parse(cache);
    return parsedCache[key] || null;
  },

  setItem(key, value) {
    const cache = localStorage.getItem(STORAGE_KEY);
    const parsedCache = cache ? JSON.parse(cache) : {};
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...parsedCache, [key]: value })
    );
  },

  initializeCookies(defaultCookies, config) {
    // Load saved preferences from localStorage
    const savedPreferences = this.getItem("cookie_preferences");
    // Block Coockie preferences from localStorage
    this.blockCookies(savedPreferences, config);
    // return coockies with accpted property added
    return Object.keys(defaultCookies).reduce((result, key, index) => {
      const category = defaultCookies[key];
      result[key] = {
        ...category,
        accepted:
          index === 0 // Ensure essential cookies are always accepted
            ? true
            : savedPreferences &&
              savedPreferences[key] !== undefined &&
              savedPreferences[key].accepted !== undefined
            ? savedPreferences[key].accepted
            : category.defaultAccepted || false,
      };
      return result;
    }, {});
  },

  blockCookies(preferences, config) {
    const blockList = this.getBlockedCategories(preferences, config);
    const cookieString = document.cookie || ""; // Default to an empty string if undefined
    const existingCookies = cookieString.split("; "); // Safely split the string

    const blockCookie = (name) => {
      const domain = window.location.hostname;
      const path = "/";
      const expires = "Thu, 01 Jan 1970 00:00:00 UTC";

      // Attempt to block cookies on both the root domain and subdomains
      document.cookie = `${name}=; expires=${expires}; path=${path}; domain=${domain};`;
      document.cookie = `${name}=; expires=${expires}; path=${path}; domain=.${domain};`;
    };

    const matchesBlockList = (name) => {
      return blockList.some((prefix) => name.startsWith(prefix));
    };

    // Process existing cookies
    existingCookies.forEach((cookie) => {
      const [name] = cookie.split("=");
      if (matchesBlockList(name)) {
        blockCookie(name);
      }
    });

    // Override document.cookie to prevent setting blocked cookies
    const originalCookieSetter = Object.getOwnPropertyDescriptor(
      Document.prototype,
      "cookie"
    ).set;

    Object.defineProperty(document, "cookie", {
      configurable: true,
      enumerable: true,
      set(cookie) {
        const cookieName = cookie.split("=")[0].trim();
        if (!matchesBlockList(cookieName)) {
          originalCookieSetter.call(document, cookie);
        }
      },
    });
  },

  resetCookieOverride() {
    // Restore the original document.cookie setter
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(
      Document.prototype,
      "cookie"
    );

    Object.defineProperty(document, "cookie", originalCookieDescriptor);
  },

  updateAllCookiesStatus(cookies, accepted, config) {
    const newCoockies = Object.keys(cookies).reduce((result, key, index) => {
      result[key] = {
        ...cookies[key],
        accepted: index === 0 ? true : accepted, // Ensure essential cookies remain accepted
      };
      return result; // Return the accumulator to maintain the state
    }, {});

    this.savePreferences(newCoockies, config);
    return newCoockies;
  },

  async savePreferences(cookies, config) {
    const preferences = Object.keys(cookies).reduce((prefs, key) => {
      prefs[key] = {
        ...cookies[key],
        accepted: cookies[key].accepted,
      };
      return prefs;
    }, {});
    this.setItem("cookie_preferences", preferences);
    /** If there is no UUID create one */
    const userId = this.getItem("user_id");
    if (
      !userId ||
      (typeof userId === "object" && Object.keys(userId).length === 0)
    ) {
      this.setItem("user_id", this.generateUUID());
    }
    //update GTM Google Consent here with owen fucntion
    if (config.functionality) {
      GTMService.updateConsent(preferences);
    }

    const user_id = await LogService.logPreferences(
      preferences,
      config,
      false,
      false
    );
    if (user_id) {
      this.setItem("user_id", user_id);
    }
    this.blockCookies(preferences, config);
  },
  getBlockedCategories(preferences, config) {
    const blockedCategories = [];

    Object.keys(preferences).forEach((category) => {
      if (!config.cookies[category]) {
        console.warn(`Unknown category: ${category}`);
      } else if (!preferences[category]) {
        blockedCategories.push(...config.cookies[category].keys);
      }
    });

    return blockedCategories;
  },
  generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  },
};
