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

    <!-- Preferences Button -->
    <button
      class="gt-cookie-widget__button gt-cookie-widget__button--naked"
      @click="openPreferences"
    >
      {{ content.widgetManagePreferencesButton }}
    </button>

    <!-- Accept All Action -->
    <div class="gt-cookie-widget__actions">
      <button class="gt-cookie-widget__button" @click="acceptAll">
        {{ content.widgetAcceptAllButton }}
      </button>
    </div>
  </div>
</template>

<script>
import CoockieIcon from "@/components/CoockieIcon.vue";

export default {
  components: { CoockieIcon },
  props: {
    content: {
      type: Object,
      default: () => ({
        dialogMessage: "We use cookies to enhance your experience.",
      }),
    },
    layout: {
      type: Object,
      default: () => ({
        appearance: "pill",
        position: "center",
      }),
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
  },
  methods: {
    acceptAll() {
      console.log("Cookies accepted!");
      // Emit an event to the parent for handling "accept all" logic
      this.$emit("accept-all");
    },
    openPreferences() {
      console.log("Opening preferences dialog...");
      // Emit an event to the parent for opening the dialog
      this.$emit("open-dialog");
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped styles specific to this component */
</style>
