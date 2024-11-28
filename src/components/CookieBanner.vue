<template>
  <div
    :class="[
      'gt-cookie-widget',
      `gt-cookie-widget--${layout.appearance}`,
      `gt-cookie-widget--${layout.position}`,
    ]"
  >
    <i v-if="layout.appearance === 'pill'" class="gt-cookie-widget__icon">
      <CoockieIcon />
    </i>
    <div class="gt-cookie-widget__content">
      <p>{{ content.dialogMessage }}</p>
    </div>
    <button class="gt-cookie-widget__button gt-cookie-widget__button--naked">
      Preferences
    </button>
    <div class="gt-cookie-widget__actions">
      <button class="gt-cookie-widget__button">Accept All</button>
    </div>
  </div>
</template>

<script>
import CoockieIcon from "@/components/CoockieIcon.vue";
export default {
  components: { CoockieIcon },
  props: {
    content: {
      type: String,
      default: "We use cookies to enhance your experience.",
    },
    layout: {
      type: Object,
      default: () => ({
        appearance: "pill",
        position: "center",
      }),
    },
  },
  methods: {
    acceptAll() {
      console.log("Cookies accepted!");
    },
    openPreferences() {
      console.log("Opening preferences dialog...");
      this.$emit("open-dialog");
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped styles specific to this component */
</style>
