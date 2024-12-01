<template>
  <div
    class="gt-cookie-dialog"
    id="gt-cookie-dialog"
    role="dialog"
    aria-labelledby="gt-cookie-dialog-heading"
    :aria-hidden="!isDialogOpen"
  >
    <span tabindex="0" data-gt-cookie-tab-trap-top="dialog"></span>

    <div class="gt-cookie-dialog__modal">
      <!-- Close Button -->
      <button
        class="gt-cookie-dialog__close"
        aria-label="Close Cookie Preferences Dialog"
        @click="closeDialog"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.24265 0.778076L9.72793 9.26336"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M1.24265 9.26343L9.72793 0.778146"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <!-- Dialog Heading -->
      <h2 class="gt-cookie-dialog__heading" id="gt-cookie-dialog-heading">
        {{ content.dialogTitle }}
      </h2>

      <!-- Dialog Content -->
      <p class="gt-cookie-dialog__content" v-html="processedDialogMessage"></p>

      <!-- Cookie Form -->
      <form class="gt-cookie-dialog__form">
        <div
          v-for="(category, key) in cookies"
          :key="key"
          :class="[
            'gt-cookie-dialog__checkbox-wrapper',
            {
              'gt-cookie-dialog__checkbox-wrapper--disabled': category.disabled,
            },
          ]"
        >
          <!-- Checkbox -->
          <label class="gt-cookie-dialog__checkbox">
            <input
              type="checkbox"
              :name="category.name"
              v-model="category.accepted"
              :disabled="category.disabled"
              class="gt-cookie-dialog__checkbox-input"
              :aria-describedby="'description-' + category.name"
            />
            <div
              class="gt-cookie-dialog__checkbox-display"
              role="checkbox"
              :aria-checked="category.accepted"
              :aria-describedby="'description-' + category.name"
            >
              <svg
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L3.10992 4.89008C3.05705 4.94302 2.9943 4.98504 2.92515 5.01377C2.85607 5.04243 2.78192 5.05718 2.70714 5.05718C2.63228 5.05718 2.55821 5.04243 2.4891 5.01377C2.41998 4.98504 2.3572 4.94302 2.30435 4.89008L1 3.58504"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
              content.widgetShowCookiesButton
            }}</span>
            <span v-else>{{ content.widgetHideCookiesButton }}</span>
          </button>

          <!-- Description -->
          <span
            class="gt-cookie-dialog__checkbox-description"
            :id="'description-' + category.name"
          >
            {{ getCategoryDescription(category.slug) }}
          </span>

          <!-- Cookie Table -->
          <cookie-table
            :tableId="'table-' + category.key"
            :cookies="category.cookies"
            :isExpanded="expandedTables[key]"
            :content="content"
          ></cookie-table>
        </div>
      </form>

      <!-- Footer -->
      <div class="gt-cookie-dialog__footer">
        <button
          type="button"
          class="gt-cookie-dialog__button gt-cookie-dialog__button--stroke"
          @click="savePreferences"
        >
          {{ content.dialogSavePreferencesButton }}
        </button>
        <button
          type="button"
          class="gt-cookie-dialog__button"
          @click="acceptAll"
        >
          {{ content.dialogAcceptAllButton }}
        </button>
      </div>
    </div>

    <span tabindex="0" data-gt-cookie-tab-trap-bottom="dialog"></span>
  </div>
</template>
<script>
import CookieTable from "./CookieTable.vue";
export default {
  components: { CookieTable },
  props: {
    isDialogOpen: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Object,
    },
    cookies: {
      type: Array,
      default: () => [
        {
          name: "essential-cookies",
          label: "Essential Cookies",
          description:
            "Cookies required to enable basic website functionality.",
          accepted: true,
          disabled: true,
          total: 5,
        },
        {
          name: "functional",
          label: "Functional Cookies",
          description:
            "Cookies that are used to enhance the functionality of the website.",
          accepted: false,
          disabled: false,
          total: 3,
        },
      ],
    },
  },
  data() {
    return {
      expandedTables: {}, // Tracks whether each table is expanded
    };
  },
  computed: {
    processedDialogMessage() {
      let message = this.content.dialog_message || "";

      // Replace [cookiepolicy] with a link
      if (message.includes("[cookiepolicy]")) {
        const policyLink = `<a href="${this.content.cookiePolicyUrl}" target="_blank" rel="noopener noreferrer">Cookie Policy</a>`;
        message = message.replace("[cookiepolicy]", policyLink);
      }

      return message;
    },
  },
  methods: {
    toggleTable(key) {
      this.expandedTables[key] = !this.expandedTables[key];
    },
    savePreferences() {
      console.log("Preferences saved!", this.cookies);
      this.$emit("save-preferences", this.cookies);
    },
    acceptAll() {
      // this.cookies.forEach((cookie) => {
      //   if (!cookie.disabled) cookie.accepted = true;
      // });
      console.log("All cookies accepted!");
      this.$emit("accept-all");
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    getCategoryTitle(categoryName) {
      const titleMapping = {
        "essential-cookies": this.content.cookieEssentialTitle,
        functional: this.content.cookieFunctionalTitle,
        marketing: this.content.cookieMarketingTitle,
        analytics: this.content.cookieAnalyticsTitle,
        unclassified: this.content.cookieUnclassifiedTitle,
      };

      return titleMapping[categoryName] || "Unknown Category";
    },
    getCategoryDescription(categoryName) {
      const descriptionMapping = {
        "essential-cookies": this.content.cookieEssentialDescription,
        functional: this.content.cookieFunctionalDescription,
        marketing: this.content.cookieMarketingDescription,
        analytics: this.content.cookieAnalyticsDescription,
        unclassified: this.content.cookieUnclassifiedDescription,
      };

      return descriptionMapping[categoryName] || "No description available.";
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      el.style.transition = "opacity 0.2s ease-in-out";
      el.style.opacity = 1;
      setTimeout(done, 200); // Match the duration of your animation
    },
    leave(el, done) {
      el.style.transition = "opacity 0.2s ease-in-out";
      el.style.opacity = 0;
      setTimeout(done, 200); // Match the duration of your animation
    },
  },
};
</script>

<style scoped lang="scss"></style>
