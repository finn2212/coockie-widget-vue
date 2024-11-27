<template>
  <div class="cookie-dialog" v-if="isOpen">
    <div class="dialog-header">
      <h2 class="dialog-title">{{ config.dialog_title }}</h2>
      <p class="dialog-message">{{ config.dialog_message }}</p>
    </div>
    <div class="dialog-body">
      <div
        v-for="(category, key) in cookies"
        :key="key"
        class="cookie-category"
      >
        <label class="cookie-category-label">
          <input type="checkbox" v-model="category.accepted" />
          <span>{{ category.label }}</span>
        </label>
      </div>
    </div>
    <div class="dialog-footer">
      <button class="btn btn-save" @click="savePreferences">
        Save Preferences
      </button>
      <button class="btn btn-cancel" @click="closeDialog">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => ({
        dialog_title: "Manage Cookies",
        dialog_message: "Select your cookie preferences below.",
      }),
    },
    cookies: {
      type: Array,
      default: () => [
        { label: "Essential", accepted: true },
        { label: "Functional", accepted: false },
        { label: "Marketing", accepted: false },
      ],
    },
  },
  methods: {
    savePreferences() {
      console.log("Preferences saved!");
      this.$emit("save-preferences", this.cookies);
    },
    closeDialog() {
      console.log("Dialog closed!");
      this.$emit("close-dialog");
    },
  },
};
</script>

<style scoped lang="scss"></style>
