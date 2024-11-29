<template>
  <div>
    <table
      :class="['gt-cookie-dialog__table', { 'gt-cookie-hide': !isExpanded }]"
      :id="tableId"
    >
      <thead>
        <tr>
          <th align="left">Platform</th>
          <th align="left">Name &amp; Description</th>
          <th align="right">Retention</th>
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
  },
};
</script>

<style scoped></style>
