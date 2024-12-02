const STORAGE_KEY = "getterms_cookie_consent";

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

  blockCookies(blockList) {
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
};
