import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// import App from "./scriptSetup/01-basicSyntax/index.vue";
// import App from "./scriptSetup/02-toplevel-bindings-exposed-to-template/index.vue";
// import App from "./scriptSetup/03-using-components/index.vue";
// import App from "./scriptSetup/03-using-components/dynamic-components/index.vue";
// import App from "./scriptSetup/03-automatic-name-inference/Foo.vue";
// import App from "./scriptSetup/03-using-components/namespaced-components/index.vue";
// import App from "./scriptSetup/04-defineProps/index.vue";
// import App from "./scriptSetup/04-defineEmits/index.vue";
// import App from "./scriptSetup/04-widthDefaults/index.vue";
// import App from "./scriptSetup/05-defineExpose/index.vue";
// import App from "./scriptSetup/06-useSlots-and-useAttrs/index.vue";
// import App from "./scriptSetup/08-top-level-await/index.vue";
// import App from "./styleFeature/02-module-style/index.vue";
// import App from "./styleFeature/03-state-driven-dynamic-css/index.vue";
// import App from "./todoList/App.vue";
// import './webComponents/index';
// import App from "./webComponents/index.vue";
import App from "./effectScopeAPI/index.vue";

const app = createApp(App);
app.use(ElementPlus);

app.mount('#app');
