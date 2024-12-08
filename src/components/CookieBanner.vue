<!-- eslint-disable prettier/prettier -->
<template>
  <div
    :class="[
      'gt-cookie-widget',
      `gt-cookie-widget--${config.layout.appearance}`,
      `gt-cookie-widget--${config.layout.position}`,
    ]"
      v-if="config && config.content"
  >
    <!-- Display the icon if the appearance is a "pill" -->
    <i v-if="config.layout.appearance === 'pill'" class="gt-cookie-widget__icon">
      <CoockieIcon />
    </i>
    <!-- Content Message -->
    <div class="gt-cookie-widget__content">
      <p v-html="getContentMessage"></p>
    </div>
    <!-- Accept All Action -->
    <div class="gt-cookie-widget__actions">
      <!-- Show Settings Button -->
      <button
        v-if="config.functionality.allowPreferences && config.functionality.hasRejectAll"
        class="gt-cookie-widget__icon-button"
        @click="openDialog"
        aria-label="Open Cookie Preferences"
      >
        <SettingsIcon />
      </button>
      <!-- Preferences or Reject All Button -->
      <button
        v-if="config.functionality.allowPreferences || config.functionality.hasRejectAll"
        class="gt-cookie-widget__button gt-cookie-widget__button--naked"
        @click="buttonClickHandler"
      >
        {{ buttonText }}
      </button>
          <!-- Accept All Button -->
      <button class="gt-cookie-widget__button" @click="acceptAllCookies">
        {{ config.content.widgetAcceptAllButton }}
      </button>
    </div>
  </div>
</template>
<script>
import CoockieIcon from "@/components/svgs/CoockieIcon.vue";
import SettingsIcon from "@/components/svgs/SettingsIcon.vue";
import { useCookieManager } from "@/composables/useCookieManager";

export default {
  components: { CoockieIcon, SettingsIcon },
  setup() {
    const { config, cookies, acceptAllCookies, rejectAllCookies, openDialog } =
      useCookieManager();

    return {
      config,
      cookies,
      acceptAllCookies,
      rejectAllCookies,
      openDialog,
    };
  },
  computed: {
    getContentMessage() {
      if (this.config.layout.appearance === "pill") {
        return this.config.content.widgetPillMessage;
      }
      let message = this.config.content.widgetBannerMessage || "";

      // Replace [cookiepolicy] with a link
      if (message.includes("[cookiepolicy]")) {
        const policyLink = `<a href="${this.config.content.cookiePolicyUrl}" target="_blank" rel="noopener noreferrer">Cookie Policy</a>`;
        message = message.replace("[cookiepolicy]", policyLink);
      }
      return message;
    },
    buttonText() {
      if (this.config.functionality.hasRejectAll) {
        return this.config.content.widgetRejectAllButton;
      }
      if (this.config.functionality.allowPreferences) {
        return this.config.content.widgetManagePreferencesButton;
      }
      return "";
    },
  },
  methods: {
    buttonClickHandler() {
      if (this.config.functionality.hasRejectAll) {
        this.rejectAllCookies();
      } else if (this.config.functionality.allowPreferences) {
        this.openDialog();
      }
    },
  },
};
</script>
