import { d as defineNuxtComponent } from './component-efflYmdz.mjs';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from '../server.mjs';
import './index-tbNGurtz.mjs';
import '@unhead/shared';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import 'vue-router';
import 'libphonenumber-js';

const _sfc_main = defineNuxtComponent({
  head() {
    return {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=0.7" },
        {
          hid: "description",
          name: "erp system for silverlands zambia",
          content: "Silverlands Holdings Zambia"
        }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ],
      script: [
        {
          src: "/js/jquery-3.5.1.js"
        },
        {
          src: "/js/bootstrap.bundle.min.js"
        },
        {
          src: "/js/jquery.dataTables.min.js"
        },
        {
          src: "/js/dataTables.bootstrap4.min.js"
        },
        {
          src: "/js/dataTables.buttons.min.js"
        },
        {
          src: "/js/buttons.bootstrap4.min.js"
        },
        {
          src: "/js/buttons.colVis.min.js"
        },
        {
          src: "/js/dataTables.keyTable.min.js"
        },
        {
          src: "/js/jszip.min.js"
        },
        {
          src: "/js/pdfmake.min.js"
        },
        {
          src: "/js/vfs_fonts.js"
        },
        {
          src: "/js/buttons.html5.min.js"
        },
        {
          src: "/js/buttons.print.min.js"
        },
        {
          src: "/js/main.js"
        }
      ]
    };
  }
}, "$VbeGLRT2Wl");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<main${ssrRenderAttrs(_attrs)}><link rel="stylesheet" href="/css/bootstrap.min.css"><link rel="stylesheet" href="/css/lineicons.css"><link rel="stylesheet" href="/css/main.css"><link rel="stylesheet" href="/css/primeblocks.css"><link rel="stylesheet" href="/css/prime.css"><link rel="stylesheet" href="/css/dataTables.bootstrap4.min.css"><link rel="stylesheet" href="/css/buttons.bootstrap4.min.css"><link rel="stylesheet" href="/css/keyTable.dataTables.min.css">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-mcd9L6Y6.mjs.map
