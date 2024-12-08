<template>
  <div
    class="gt-cookie-dialog"
    id="gt-cookie-dialog"
    role="dialog"
    aria-labelledby="gt-cookie-dialog-heading"
    :aria-hidden="!isDialogOpen"
    v-if="config && config.content"
  >
    <span tabindex="0" data-gt-cookie-tab-trap-top="dialog"></span>
    <div class="gt-cookie-dialog__modal">
      <!-- Close Button -->
      <button
        class="gt-cookie-dialog__close"
        aria-label="Close Cookie Preferences Dialog"
        @click="closeDialog"
      >
        <CloseIcon />
      </button>
      <!-- Dialog Heading -->
      <h2 class="gt-cookie-dialog__heading" id="gt-cookie-dialog-heading">
        {{ config.content.dialogTitle }}
      </h2>
      <!-- Dialog Content -->
      <p class="gt-cookie-dialog__content" v-html="processedDialogMessage"></p>
      <!-- Cookie Form -->
      <form class="gt-cookie-dialog__form">
        <div
          v-for="(category, key, index) in cookies"
          :key="key"
          :class="[
            'gt-cookie-dialog__checkbox-wrapper',
            {
              'gt-cookie-dialog__checkbox-wrapper--disabled': index === 0,
            },
          ]"
        >
          <!-- Checkbox -->
          <label class="gt-cookie-dialog__checkbox">
            <input
              type="checkbox"
              :name="category.name"
              v-model="category.accepted"
              :disabled="index === 0"
              class="gt-cookie-dialog__checkbox-input"
              :aria-describedby="'description-' + category.name"
            />
            <div
              class="gt-cookie-dialog__checkbox-display"
              role="checkbox"
              :aria-checked="category.accepted"
              :aria-describedby="'description-' + category.name"
            >
              <CheckBoxIcon />
            </div>
            <span class="gt-cookie-dialog__checkbox-label">
              {{ getCategoryTitle(category.slug) }}
              <span class="gt-cookie-dialog__checkbox-total">
                ({{ category.total }})
              </span>
            </span>
          </label>
          <button
            v-if="category.cookies && category.cookies.length > 0"
            type="button"
            class="gt-cookie-dialog__table-toggle"
            @click="toggleTable(key)"
          >
            <span v-if="!expandedTables[key]">{{
              config.content.widgetShowCookiesButton
            }}</span>
            <span v-else>{{ config.content.widgetHideCookiesButton }}</span>
          </button>
          <!-- Description -->
          <span
            class="gt-cookie-dialog__checkbox-description"
            :id="'description-' + category.label"
          >
            {{ getCategoryDescription(category.slug) }}
          </span>
          <!-- Cookie Table -->
          <cookie-table
            :tableId="'table-' + category.key"
            :cookies="category.cookies"
            :isExpanded="expandedTables[key] || false"
            :content="config.content"
          ></cookie-table>
        </div>
      </form>
      <!-- Footer -->
      <div class="gt-cookie-dialog__footer">
        <button
          type="button"
          class="gt-cookie-dialog__button gt-cookie-dialog__button--stroke"
          @click="savePreferences(cookies)"
        >
          {{ config.content.dialogSavePreferencesButton }}
        </button>
        <button
          v-if="config.functionality.hasRejectAll"
          type="button"
          class="gt-cookie-dialog__button gt-cookie-dialog__button--stroke"
          @click="rejectAllCookies"
        >
          {{ config.content.dialogRejectAllButton }}
        </button>
        <button
          type="button"
          class="gt-cookie-dialog__button"
          @click="acceptAllCookies"
        >
          {{ config.content.dialogAcceptAllButton }}
        </button>
      </div>
    </div>
    <span tabindex="0" data-gt-cookie-tab-trap-bottom="dialog"></span>
  </div>
</template>

<script>
import CookieTable from "./CookieTable.vue";
import { useCookieManager } from "@/composables/useCookieManager";
import CheckBoxIcon from "@/components/svgs/CheckBoxIcon.vue";
import CloseIcon from "@/components/svgs/CloseIcon.vue";

export default {
  components: { CookieTable, CheckBoxIcon, CloseIcon },
  setup() {
    const {
      config,
      cookies,
      closeDialog,
      savePreferences,
      acceptAllCookies,
      rejectAllCookies,
    } = useCookieManager();

    return {
      config,
      cookies,
      closeDialog,
      savePreferences,
      acceptAllCookies,
      rejectAllCookies,
    };
  },
  data() {
    return {
      expandedTables: {}, // Tracks whether each table is expanded
    };
  },
  computed: {
    processedDialogMessage() {
      if (!this.config || !this.config.content) return "";
      let message = this.config.content.dialog_message || "";

      // Replace [cookiepolicy] with a link
      if (message.includes("[cookiepolicy]")) {
        const policyLink = `<a href="${this.config.content.cookiePolicyUrl}" target="_blank" rel="noopener noreferrer">Cookie Policy</a>`;
        message = message.replace("[cookiepolicy]", policyLink);
      }
      return message;
    },
  },
  methods: {
    toggleTable(key) {
      this.expandedTables[key] = !this.expandedTables[key];
    },
    getCategoryTitle(slug) {
      if (!this.config || !this.config.content) return slug;
      const titleMapping = {
        "essential-cookies": this.config.content.cookieEssentialTitle,
        functional: this.config.content.cookieFunctionalTitle,
        marketing: this.config.content.cookieMarketingTitle,
        analytics: this.config.content.cookieAnalyticsTitle,
        unclassified: this.config.content.cookieUnclassifiedTitle,
      };
      return titleMapping[slug] || slug;
    },
    getCategoryDescription(slug) {
      if (!this.config || !this.config.content) return slug;
      const descriptionMapping = {
        "essential-cookies": this.config.content.cookieEssentialDescription,
        functional: this.config.content.cookieFunctionalDescription,
        marketing: this.config.content.cookieMarketingDescription,
        analytics: this.config.content.cookieAnalyticsDescription,
        unclassified: this.config.content.cookieUnclassifiedDescription,
      };
      return descriptionMapping[slug] || slug;
    },
  },
};
</script>
