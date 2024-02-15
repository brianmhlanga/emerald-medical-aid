import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-564uVeOW.mjs';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "bg-green-600 shadow-2 flex relative lg:static",
    style: { "min-height": "84px" }
  }, _attrs))}><div class="flex align-items-center justify-content-center px-5 bg-whitey-500"><img${ssrRenderAttr("src", _imports_0)} alt="Image" height="40"></div><a class="cursor-pointer flex align-items-center justify-content-center lg:hidden text-white pr-5 mt-1 p-ripple" data-pd-ripple="true" data-pd-styleclass="true"><i class="pi pi-bars text-4xl"></i><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></a></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/menubar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=menubar-cjHUJKj5.mjs.map
