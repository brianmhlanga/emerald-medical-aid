import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-layout--JwYAUj5.mjs';
import { _ as __nuxt_component_0$1 } from './menubar-cjHUJKj5.mjs';
import { _ as _export_sfc, b as navigateTo } from '../server.mjs';
import { useSSRContext, mergeProps, withCtx, createVNode, resolveComponent, unref } from 'vue';
import { ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './logo-564uVeOW.mjs';
import 'libphonenumber-js';

const _imports_0 = "" + publicAssetsURL("images/civil.jpg");
const _imports_1 = "" + publicAssetsURL("images/individuals.jpg");
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_CommonMenubar = __nuxt_component_0$1;
  const _component_Button = resolveComponent("Button");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_CommonMenubar, null, null, _parent));
  _push(`<div class="surface-section px-4 py-8 md:px-6 lg:px-8"><div class="flex flex-wrap"><div class="surface-section px-4 py-8 md:px-6 lg:px-8"><div class="text-center text-900 text-5xl font-bold mb-5">Available Packages</div><div class="grid nogutter"><div class="col-12 lg:col-6 p-6"><div class="custom-shadow-2 border-round h-full surface-card"><img${ssrRenderAttr("src", _imports_0)} alt="Image" class="block w-full border-round-top"><div class="p-4"><div class="text-xl text-900 font-medium mb-3 line-height-3">Civil Servants</div><div class="line-height-3 mb-3 text-700 mb-4">Cater specifically to civil servants, providing health coverage tailored for government employees.</div>`);
  _push(ssrRenderComponent(_component_Button, {
    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/civil"),
    class: "p-button p-component w-full",
    label: "Register Today",
    icon: "pi pi-map"
  }, null, _parent));
  _push(`</div></div></div><div class="col-12 lg:col-6 p-6"><div class="custom-shadow-2 border-round h-full surface-card"><img${ssrRenderAttr("src", _imports_1)} alt="Image" class="block w-full border-round-top"><div class="p-4"><div class="text-xl text-900 font-medium mb-3 line-height-3">Individuals</div><div class="line-height-3 mb-3 text-700 mb-4">Tailored to provide comprehensive health coverage and additional benefits to individual members.</div>`);
  _push(ssrRenderComponent(_component_Button, {
    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/individuals"),
    class: "p-button p-component w-full",
    label: "Register Today",
    icon: "pi pi-map"
  }, null, _parent));
  _push(`</div></div></div></div></div></div></div><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/third.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_LandingThird = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_LandingThird, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_LandingThird)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-FgokfPqD.mjs.map
