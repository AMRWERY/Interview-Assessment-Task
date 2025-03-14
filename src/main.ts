import "./assets/main.css";

import { createApp } from "vue";

// pinia
import { createPinia } from "pinia";

import App from "./App.vue";

// vue-router
import router from "./router";

// iconify-icon
import "iconify-icon";

//i18n
import i18n from "@/plugins/i18n.ts";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
