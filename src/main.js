import { createApp } from "vue";
import App from "./views/App.vue";
import store from "./store";
import "./assets/scss/style.scss";

const app = createApp(App);
app.use(store);
app.mount("#app");
