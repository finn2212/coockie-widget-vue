/* eslint-env jest */
import { useCookieManager } from "@/composables/useCookieManager";
import CookieService from "@/services/CookieService";
import ThemeService from "@/services/ThemeService";
import { fetchMockConfig } from "@/mockConfig";

// Mock dependencies
jest.mock("@/services/CookieService", () => ({
  initializeCookies: jest.fn(),
}));
jest.mock("@/services/ThemeService", () => ({
  correctFontFamily: jest.fn(),
  setThemeVariables: jest.fn(),
}));
jest.mock("@/mockConfig", () => ({
  fetchMockConfig: jest.fn(),
}));

describe("useCookieManager", () => {
  it("loads the configuration and initializes cookies", async () => {
    // Mock return values for dependencies
    const mockConfig = {
      cookies: {
        essential: { defaultAccepted: true },
        analytics: { defaultAccepted: false },
      },
      theme: { fontSize: "14px" },
    };
    fetchMockConfig.mockResolvedValue(mockConfig);

    const mockCookies = {
      essential: { defaultAccepted: true, accepted: true },
      analytics: { defaultAccepted: false, accepted: false },
    };
    CookieService.initializeCookies.mockReturnValue(mockCookies);

    // Initialize the composable
    const cookieManager = useCookieManager();

    // Call the loadConfig method
    await cookieManager.loadConfig();

    // Assertions
    expect(fetchMockConfig).toHaveBeenCalled();
    expect(CookieService.initializeCookies).toHaveBeenCalledWith(
      mockConfig.cookies,
      mockConfig
    );
    expect(ThemeService.correctFontFamily).toHaveBeenCalled();
    expect(ThemeService.setThemeVariables).toHaveBeenCalledWith(
      mockConfig.theme
    );

    // Verify reactive state
    expect(cookieManager.config.value).toEqual(mockConfig);
    expect(cookieManager.cookies.value).toEqual(mockCookies);
    expect(cookieManager.isCookieBannerOpen.value).toBe(true);
  });
});

describe("useCookieManager", () => {
  it("opens and closes the dialog", () => {
    // Initialize the composable
    const cookieManager = useCookieManager();

    // Initially, the dialog should be closed
    expect(cookieManager.isDialogOpen.value).toBe(false);

    // Open the dialog
    cookieManager.openDialog();
    expect(cookieManager.isDialogOpen.value).toBe(true);

    // Close the dialog
    cookieManager.closeDialog();
    expect(cookieManager.isDialogOpen.value).toBe(false);
  });
});
