import { defineComponent, openBlock, createElementBlock, normalizeClass, pushScopeId, popScopeId, createElementVNode } from 'vue';
import { $ as $e } from '../server.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'libphonenumber-js';
import 'vue/server-renderer';

const a = (e) => (pushScopeId("data-v-c67298ec"), e = e(), popScopeId(), e), d = ["width", "height"], l = /* @__PURE__ */ a(() => /* @__PURE__ */ createElementVNode(
  "path",
  { d: "M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" },
  null,
  -1
  /* HOISTED */
)), m = [
  l
], h = /* @__PURE__ */ defineComponent({
  __name: "MazSpinner",
  props: {
    size: { type: String, default: "2em" },
    color: {
      type: String,
      default: "primary"
    }
  },
  setup(e) {
    return (_, u) => (openBlock(), createElementBlock("svg", {
      width: e.size,
      height: e.size,
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      x: "0px",
      y: "0px",
      viewBox: "0 0 50 50",
      "xml:space": "preserve",
      class: normalizeClass(["m-spinner", `m-spinner--${e.color}`]),
      style: { "enable-background": "new 0 0 50 50" }
    }, m, 10, d));
  }
}), g = /* @__PURE__ */ $e(h, [["__scopeId", "data-v-c67298ec"]]);

export { g as default };
//# sourceMappingURL=MazSpinner-Wnqtt3dQ-rBRBrJoR.mjs.map
