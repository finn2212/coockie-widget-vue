const ThemeService = {
  correctFontFamily(wrapperElement) {
    if (!wrapperElement) return;

    const originalFontFamily =
      window.getComputedStyle(wrapperElement).fontFamily;
    wrapperElement.style.setProperty("font-family", "initial");
    const defaultFontFamily =
      window.getComputedStyle(wrapperElement).fontFamily;

    if (originalFontFamily === defaultFontFamily) {
      wrapperElement.style.setProperty("font-family", "sans-serif");
    } else {
      wrapperElement.style.removeProperty("font-family");
    }
  },

  setThemeVariables(theme) {
    const root = document.documentElement.style;
    root.setProperty("--gt-cookie-bg", theme.background);
    root.setProperty("--gt-cookie-text", theme.text);
    root.setProperty("--gt-cookie-link-text", theme.linkText);
    root.setProperty("--gt-cookie-button-bg", theme.buttonBackground);
    root.setProperty("--gt-cookie-button-text", theme.buttonText);
    root.setProperty("--gt-cookie-font-size", theme.fontSize);
  },
};

export default ThemeService;
