<template>
  <div :class="['gt-cookie-widget', `gt-cookie-widget--${layout.appearance}`]">
    <div class="gt-cookie-widget__content">
      <p>{{ message }}</p>
    </div>
    <div class="gt-cookie-widget__actions">
      <button class="gt-cookie-widget__button">Accept All</button>
      <button class="gt-cookie-widget__button gt-cookie-widget__button--naked">
        Preferences
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
