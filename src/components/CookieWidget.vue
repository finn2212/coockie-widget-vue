<template>
  <div class="cookie-widget">
    <button class="btn btn-widget" @click="toggleBanner">Manage Cookies</button>
    <CookieBanner v-if="showBanner" @open-dialog="openDialog" />
    <CookieDialog
      v-if="showDialog"
      :isOpen="true"
      :config="dialogConfig"
      :cookies="cookies"
      @close-dialog="closeDialog"
      @save-preferences="savePreferences"
    />
  </div>
</template>

<script>
import CookieBanner from "./CookieBanner.vue";
import CookieDialog from "./CookieDialog.vue";

export default {
  components: { CookieBanner, CookieDialog },
  data() {
    return {
      showBanner: true,
      showDialog: false,
      dialogConfig: {
        dialog_title: "Manage Your Cookies",
        dialog_message: "Select preferences below.",
      },
      cookies: [
        { label: "Essential", accepted: true },
        { label: "Functional", accepted: false },
        { label: "Marketing", accepted: false },
      ],
    };
  },
  methods: {
    toggleBanner() {
      this.showBanner = !this.showBanner;
    },
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    savePreferences(cookies) {
      console.log("Saved preferences:", cookies);
      this.showDialog = false;
    },
  },
};
</script>

<style scoped>
/* Optional: Scoped styles specific to this component */
</style>
