<template>
  <div>
    <table
      :class="['gt-cookie-dialog__table', { 'gt-cookie-hide': !isExpanded }]"
      :id="tableId"
    >
      <thead>
        <tr>
          <th align="left">{{ content.cookieHeadingPlatform }}</th>
          <th align="left">{{ content.cookieHeadingNameDescription }}</th>
          <th align="right">{{ content.cookieHeadingRetention }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cookie in cookies" :key="cookie.name">
          <td align="left">
            <a :href="cookie.platformUrl || '#'" target="_blank">
              {{ cookie.platform }}
            </a>
          </td>
          <td align="left">
            <strong>{{ cookie.name }}</strong>
            <span>{{ cookie.description }}</span>
          </td>
          <td align="right">{{ cookie.retention }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableId: {
      type: String,
      required: true,
    },
    cookies: {
      type: Array,
      required: true,
    },
    isExpanded: {
      type: Boolean,
      required: true,
    },
    content: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
