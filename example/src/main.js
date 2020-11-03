/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 09:25:51
 * @LastEditTime : 2020-11-03 10:13:26
 * @Description :
 */
import Vue from "vue";
import App from "./App.vue";

import "./lib/luban-h5-editor/dist/luban-h5-editor.css";
import lubanH5Editor from "./lib/luban-h5-editor/dist/luban-h5-editor.js";

Vue.config.productionTip = false;

Vue.use(lubanH5Editor);

new Vue({
  render: h => h(App)
}).$mount("#app");
