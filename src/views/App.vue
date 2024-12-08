<template>
  <div id="app">
    <!-- Show a loading state until config and cookies are available -->
    <div v-if="config">
      <div
        ref="wrapperElement"
        class="gt-cookie-widget-wrapper"
        :class="{
          'gt-cookie-widget-wrapper--block':
            config.functionality.blockInteraction,
        }"
        :data-gt-cookie-widget-shown="isCookieBannerOpen ? 'true' : 'false'"
      >
        <CookieBanner />
        <CookieDialog v-if="isDialogOpen" />
      </div>
    </div>
  </div>
</template>

<script>
import { useCookieManager } from "@/composables/useCookieManager";
import CookieBanner from "@/components/CookieBanner.vue";
import CookieDialog from "@/components/CookieDialog.vue";

export default {
  components: { CookieBanner, CookieDialog },
  setup() {
    const { config, isCookieBannerOpen, isDialogOpen } = useCookieManager();

    return {
      config,
      isDialogOpen,
      isCookieBannerOpen,
    };
  },
};
</script>
