import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_v_container = resolveComponent("v-container");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_btn = resolveComponent("v-btn");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-wrapper bg-danger-dark" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_v_container, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_row, { justify: "center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_v_col, {
                cols: "12",
                sm: "10",
                md: "6",
                lg: "4",
                class: "d-flex align-center justify-center"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="text-center"${_scopeId3}><h1 class="banner-title font-weight-bold text-white"${_scopeId3}> Opps, 404 - Error </h1><h4 class="banner-subtitle mr-0 text-white font-weight-regular"${_scopeId3}> The page you are looking for is not available please go back to homepage </h4><div class="mt-16 pt-2"${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_v_btn, {
                      large: "",
                      to: "/",
                      color: "error",
                      elevation: "0"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(` Back to Homepage `);
                        } else {
                          return [
                            createTextVNode(" Back to Homepage ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("h1", { class: "banner-title font-weight-bold text-white" }, " Opps, 404 - Error "),
                        createVNode("h4", { class: "banner-subtitle mr-0 text-white font-weight-regular" }, " The page you are looking for is not available please go back to homepage "),
                        createVNode("div", { class: "mt-16 pt-2" }, [
                          createVNode(_component_v_btn, {
                            large: "",
                            to: "/",
                            color: "error",
                            elevation: "0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Back to Homepage ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_v_col, {
                  cols: "12",
                  sm: "10",
                  md: "6",
                  lg: "4",
                  class: "d-flex align-center justify-center"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h1", { class: "banner-title font-weight-bold text-white" }, " Opps, 404 - Error "),
                      createVNode("h4", { class: "banner-subtitle mr-0 text-white font-weight-regular" }, " The page you are looking for is not available please go back to homepage "),
                      createVNode("div", { class: "mt-16 pt-2" }, [
                        createVNode(_component_v_btn, {
                          large: "",
                          to: "/",
                          color: "error",
                          elevation: "0"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Back to Homepage ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_v_row, { justify: "center" }, {
            default: withCtx(() => [
              createVNode(_component_v_col, {
                cols: "12",
                sm: "10",
                md: "6",
                lg: "4",
                class: "d-flex align-center justify-center"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("h1", { class: "banner-title font-weight-bold text-white" }, " Opps, 404 - Error "),
                    createVNode("h4", { class: "banner-subtitle mr-0 text-white font-weight-regular" }, " The page you are looking for is not available please go back to homepage "),
                    createVNode("div", { class: "mt-16 pt-2" }, [
                      createVNode(_component_v_btn, {
                        large: "",
                        to: "/",
                        color: "error",
                        elevation: "0"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Back to Homepage ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/lp-banner/Banner404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Error404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Error404 as E };
//# sourceMappingURL=Banner404-Hho_vdem.mjs.map
