<!-- eslint-disable prettier/prettier -->
<template>
  <div
    :class="[
      'gt-cookie-widget',
      `gt-cookie-widget--${layout.appearance}`,
      `gt-cookie-widget--${layout.position}`,
    ]"
  >
    <!-- Display the icon if the appearance is a "pill" -->
    <i v-if="layout.appearance === 'pill'" class="gt-cookie-widget__icon">
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
        v-if="functionality.allowPreferences && functionality.hasRejectAll"
        class="gt-cookie-widget__icon-button"
        @click="openPreferences"
        aria-label="Open Cookie Preferences"
      >
        <SettingsSvg />
      </button>
      <!-- Preferences or Reject All Button -->
      <button
        v-if="functionality.allowPreferences || functionality.hasRejectAll"
        class="gt-cookie-widget__button gt-cookie-widget__button--naked"
        @click="buttonClickHandler"
      >
        {{ buttonText }}
      </button>
          <!-- Accept All Button -->
      <button class="gt-cookie-widget__button" @click="acceptAll">
        {{ content.widgetAcceptAllButton }}
      </button>
    </div>
  </div>
</template>

<script>
import CoockieIcon from "@/components/CoockieIcon.vue";
import SettingsSvg from "@/components/SettingsSvg.vue";

export default {
  components: { CoockieIcon, SettingsSvg },
  props: {
    content: {
      type: Object,
    },
    layout: {
      type: Object,
    },
    functionality: {
      type: Object,
    },
  },
  computed: {
    getContentMessage() {
      if (this.layout.appearance === "pill") {
        return this.content.widgetPillMessage;
      }

      let message = this.content.widgetBannerMessage || "";

      // Replace [cookiepolicy] with a link
      if (message.includes("[cookiepolicy]")) {
        const policyLink = `<a href="${this.content.cookiePolicyUrl}" target="_blank" rel="noopener noreferrer">Cookie Policy</a>`;
        message = message.replace("[cookiepolicy]", policyLink);
      }

      return message;
    },
    buttonText() {
      if (this.functionality.hasRejectAll) {
        return this.content.widgetRejectAllButton;
      }
      if (this.functionality.allowPreferences) {
        return this.content.widgetManagePreferencesButton;
      }
      return "";
    },
  },
  methods: {
    acceptAll() {
      // Emit an event to the parent for handling "accept all" logic
      this.$emit("accept-all");
    },
    openPreferences() {
      // Emit an event to the parent for opening the dialog
      this.$emit("open-dialog");
    },
    buttonClickHandler() {
      if (this.functionality.hasRejectAll) {
        this.rejectAll();
      } else if (this.functionality.allowPreferences) {
        this.openPreferences();
      }
    },
    rejectAll() {
      this.$emit("reject-all");
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped styles specific to this component */
</style>
