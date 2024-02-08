import { useSSRContext, defineComponent, ref, resolveComponent, unref, mergeProps, isRef, withCtx, openBlock, createBlock, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-564uVeOW.mjs';
import moment from 'moment';
import { _ as _export_sfc, d as useToast, s as storeToRefs } from '../server.mjs';
import { u as useAuthStore } from './auth-EG7XnNR-.mjs';
import { d as defineNuxtComponent } from './component-b3PApLre.mjs';
import '../../handlers/renderer.mjs';
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
import 'libphonenumber-js';
import './cookie-mXglfnjH.mjs';
import 'sweetalert2';
import 'axios';
import './index-tbNGurtz.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "sidebar-nav",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const authStore = useAuthStore();
    const first_name = ref();
    const last_name = ref();
    const id = storeToRefs(authStore).id;
    const id2 = ref(authStore.id);
    const role = ref();
    console.log("hb", role.value, id.value, id2.value);
    const currentYear = () => {
      let current_year = moment().year();
      return current_year;
    };
    const admin_menus = ref([
      {
        key: "1",
        label: "Admin Menu",
        icon: "pi pi-fw pi-cog",
        items: [
          {
            key: "1_0",
            label: "Register Users",
            icon: "pi pi-fw pi-user-plus",
            to: "/admin/register"
          },
          {
            key: "1_1",
            label: "Create Routing",
            icon: "pi pi-fw pi-arrows-h",
            to: "/admin/createRouting"
          },
          {
            key: "1_2",
            label: "Create Companies",
            icon: "pi pi-fw pi-arrows-h",
            to: "/admin/createCompanies"
          }
        ]
      }
    ]);
    ref([
      {
        key: "1",
        label: "Originator Menu",
        icon: "pi pi-fw pi-align-justify",
        items: [
          {
            key: "1_0",
            label: "Report Generation",
            icon: "pi pi-fw pi-chart-pie",
            to: "/officer/generate"
          },
          {
            key: "1_1",
            label: "My Reports",
            icon: "pi pi-fw pi-clone",
            to: "/officer/reports"
          }
        ]
      }
    ]);
    ref([
      {
        key: "1",
        label: "Bank File Generation",
        icon: "pi pi-fw pi-qrcode",
        items: [
          {
            key: "1_0",
            label: "File Generation",
            icon: "pi pi-fw pi-chart-pie",
            to: "/officer/bank_file_generation"
          }
        ]
      }
    ]);
    ref([
      {
        key: "1",
        label: "Approver Menu",
        icon: "pi pi-fw pi-align-justify",
        items: [
          {
            key: "1_0",
            label: "Pending Approvals",
            icon: "pi pi-fw pi-chart-pie",
            to: "/approvals/pending"
          }
        ]
      }
    ]);
    const recruitment_menus = ref([
      {
        key: "1",
        label: "E-recruitment",
        icon: "pi pi-fw pi-align-justify",
        items: [
          {
            key: "1_0",
            label: "Dashboard",
            icon: "pi pi-fw pi-chart-pie",
            to: "/"
          },
          {
            key: "1_1",
            label: "Openings List",
            icon: "pi pi-fw pi-chart-pie",
            to: "/e-recruitment/openings"
          }
        ]
      }
    ]);
    const applicant_menus = ref([
      {
        key: "1",
        label: "E-recruitment",
        icon: "pi pi-fw pi-align-justify",
        items: [
          {
            key: "1_0",
            label: "Dashboard",
            icon: "pi pi-fw pi-chart-pie",
            to: "/e-recruitment/client-dashboard"
          },
          {
            key: "1_1",
            label: "My Applications",
            icon: "pi pi-fw pi-chart-pie",
            to: "/e-recruitment/client-applications"
          }
        ]
      }
    ]);
    (async () => {
      await authStore.me().then((userData2) => {
        console.log("myuser data"), console.log("my userData object", userData2);
        if (userData2 && userData2.user && userData2.user.company_access && userData2.user.company_access[0] && userData2.user.company_access[0].access_list && userData2.user.company_access[0].access_list.length > 0) {
          userData2.user.company_access[0].access_list;
        }
        first_name.value = userData2.user.first_name;
        last_name.value = userData2.user.last_name;
        if (userData2 && userData2.user && userData2.user.profile) {
          role.value = userData2.user.profile;
        }
      });
    })();
    console.log("admin_menus", admin_menus);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PanelMenu = resolveComponent("PanelMenu");
      _push(`<div${ssrRenderAttrs(_attrs)}><aside class="sidebar-nav-wrapper"><div class="navbar-logo"><img width="180"${ssrRenderAttr("src", _imports_0)} alt="logo" style="${ssrRenderStyle({ "margin-top": "10%", "margin-bottom": "5px" })}"></div><nav class="sidebar-nav">`);
      if (unref(role) === "ADMIN") {
        _push(ssrRenderComponent(_component_PanelMenu, { model: unref(recruitment_menus) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(role) === "APPLICANT") {
        _push(ssrRenderComponent(_component_PanelMenu, { model: unref(applicant_menus) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="promo-box"><h3>OACEY</h3><p>${ssrInterpolate(currentYear())}</p></div></aside><div class="overlay"></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/sidebar-nav.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    useToast();
    ref();
    ref();
    storeToRefs(authStore).role;
    const date = storeToRefs(authStore).date;
    const time = storeToRefs(authStore).time;
    const full_date = () => date.value;
    const full_time = () => time.value;
    const password = storeToRefs(authStore).password;
    const full_name = () => authStore.userData.first_name + "  " + authStore.userData.last_name;
    const account_type = authStore.userData.profile;
    const passwordChange = ref(false);
    const confirm_password = storeToRefs(authStore).confirm_password;
    const old_password = storeToRefs(authStore).old_password;
    ref(true);
    storeToRefs(authStore).access_levels;
    const user_info = ref([
      {
        label: "Change Password",
        icon: "pi pi-lock",
        command: () => {
          passwordChange.value = true;
        }
      },
      {
        label: "Edit Details",
        icon: "pi pi-user",
        command: () => {
        }
      },
      {
        label: "Log Out",
        icon: "pi pi-power-off",
        command: () => {
          logout();
        }
      }
    ]);
    const logout = async () => {
      const result = await authStore.logout();
      if (result.success) {
        (void 0).location.href = "/login";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = resolveComponent("Button");
      const _component_SplitButton = resolveComponent("SplitButton");
      const _component_Dialog = resolveComponent("Dialog");
      const _component_Password = resolveComponent("Password");
      const _component_Divider = resolveComponent("Divider");
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-e0b55f62><div class="container-fluid" data-v-e0b55f62><div class="row" data-v-e0b55f62><div class="col-4" data-v-e0b55f62><div class="header-left d-flex align-items-center" data-v-e0b55f62><div class="menu-toggle-btn mr-20" data-v-e0b55f62><button id="menu-toggle" class="main-btn btn-hover btn-outline" data-v-e0b55f62><i class="pi pi-chevron-left me-2" data-v-e0b55f62></i> Menu </button></div></div></div><div class="col-4 splitbutton" data-v-e0b55f62>`);
      _push(ssrRenderComponent(_component_Button, {
        type: "button",
        label: full_date(),
        icon: "pi pi-calendar",
        class: "p-button-warning"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        type: "button",
        label: full_time(),
        icon: "pi pi-clock",
        class: "p-button-warning"
      }, null, _parent));
      _push(`</div><div class="col-4 splitbutton" data-v-e0b55f62>`);
      _push(ssrRenderComponent(_component_SplitButton, {
        label: `${full_name()} (${unref(account_type)})`,
        icon: "pi pi-user",
        model: unref(user_info)
      }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_Dialog, {
        header: "Password Change",
        visible: unref(passwordChange),
        "onUpdate:visible": ($event) => isRef(passwordChange) ? passwordChange.value = $event : null,
        breakpoints: { "960px": "75vw", "640px": "90vw" },
        style: { width: "50vw" },
        modal: true
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(password) !== unref(confirm_password)) {
              _push2(ssrRenderComponent(_component_Button, {
                class: "notmatch",
                label: "Passwords Do Not Match",
                autofocus: ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Button, {
                label: "Change Password",
                icon: "pi pi-check",
                autofocus: ""
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(password) !== unref(confirm_password) ? (openBlock(), createBlock(_component_Button, {
                key: 0,
                class: "notmatch",
                label: "Passwords Do Not Match",
                autofocus: ""
              })) : (openBlock(), createBlock(_component_Button, {
                key: 1,
                label: "Change Password",
                icon: "pi pi-check",
                autofocus: ""
              }))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-12 md:col-4" data-v-e0b55f62${_scopeId}><div class="p-inputgroup" data-v-e0b55f62${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, { label: "Old Password" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Password, {
              modelValue: unref(old_password),
              "onUpdate:modelValue": ($event) => isRef(old_password) ? old_password.value = $event : null,
              feedback: false
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-12 md:col-4" data-v-e0b55f62${_scopeId}><div class="p-inputgroup" data-v-e0b55f62${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, { label: "New Password" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Password, {
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null
            }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h6 data-v-e0b55f62${_scopeId2}>Pick a password</h6>`);
                } else {
                  return [
                    createVNode("h6", null, "Pick a password")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Divider, null, null, _parent3, _scopeId2));
                  _push3(`<p class="mt-2" data-v-e0b55f62${_scopeId2}>Suggestions</p><ul class="pl-2 ml-2 mt-0" style="${ssrRenderStyle({ "line-height": "1.5" })}" data-v-e0b55f62${_scopeId2}><li data-v-e0b55f62${_scopeId2}>At least one lowercase</li><li data-v-e0b55f62${_scopeId2}>At least one uppercase</li><li data-v-e0b55f62${_scopeId2}>At least one numeric</li><li data-v-e0b55f62${_scopeId2}>Minimum 8 characters</li></ul>`);
                } else {
                  return [
                    createVNode(_component_Divider),
                    createVNode("p", { class: "mt-2" }, "Suggestions"),
                    createVNode("ul", {
                      class: "pl-2 ml-2 mt-0",
                      style: { "line-height": "1.5" }
                    }, [
                      createVNode("li", null, "At least one lowercase"),
                      createVNode("li", null, "At least one uppercase"),
                      createVNode("li", null, "At least one numeric"),
                      createVNode("li", null, "Minimum 8 characters")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="col-12 md:col-4" data-v-e0b55f62${_scopeId}><div class="p-inputgroup" data-v-e0b55f62${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, { label: "Confirm Password" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Password, {
              modelValue: unref(confirm_password),
              "onUpdate:modelValue": ($event) => isRef(confirm_password) ? confirm_password.value = $event : null,
              feedback: false
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "col-12 md:col-4" }, [
                createVNode("div", { class: "p-inputgroup" }, [
                  createVNode(_component_Button, { label: "Old Password" }),
                  createVNode(_component_Password, {
                    modelValue: unref(old_password),
                    "onUpdate:modelValue": ($event) => isRef(old_password) ? old_password.value = $event : null,
                    feedback: false
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("div", { class: "col-12 md:col-4" }, [
                createVNode("div", { class: "p-inputgroup" }, [
                  createVNode(_component_Button, { label: "New Password" }),
                  createVNode(_component_Password, {
                    modelValue: unref(password),
                    "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null
                  }, {
                    header: withCtx(() => [
                      createVNode("h6", null, "Pick a password")
                    ]),
                    footer: withCtx(() => [
                      createVNode(_component_Divider),
                      createVNode("p", { class: "mt-2" }, "Suggestions"),
                      createVNode("ul", {
                        class: "pl-2 ml-2 mt-0",
                        style: { "line-height": "1.5" }
                      }, [
                        createVNode("li", null, "At least one lowercase"),
                        createVNode("li", null, "At least one uppercase"),
                        createVNode("li", null, "At least one numeric"),
                        createVNode("li", null, "Minimum 8 characters")
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("div", { class: "col-12 md:col-4" }, [
                createVNode("div", { class: "p-inputgroup" }, [
                  createVNode(_component_Button, { label: "Confirm Password" }),
                  createVNode(_component_Password, {
                    modelValue: unref(confirm_password),
                    "onUpdate:modelValue": ($event) => isRef(confirm_password) ? confirm_password.value = $event : null,
                    feedback: false
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e0b55f62"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))}><div class="container-fluid"><div class="row"><div class="col-md-6 order-last order-md-first"><div class="copyright text-center text-md-start"><p class="text-sm"> Designed and Developed by <a class="text-primary" href="https://petalmafrica.com" rel="nofollow" target="_blank"> Petalm Africa Pvt Ltd </a></p></div></div><div class="col-md-6"><div class="terms d-flex justify-content-center justify-content-md-end"><a href="#" class="text-sm">Term &amp; Conditions</a><a href="#" class="text-sm ml-15">Privacy &amp; Policy</a></div></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
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
}, "$c0NYRxUIYM");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DashboardSidebarNav = _sfc_main$3;
  const _component_DashboardHeader = __nuxt_component_1;
  const _component_DashboardFooter = __nuxt_component_2;
  _push(`<main${ssrRenderAttrs(_attrs)}><link rel="stylesheet" href="/css/bootstrap.min.css"><link rel="stylesheet" href="/css/lineicons.css"><link rel="stylesheet" href="/css/main.css"><link rel="stylesheet" href="/css/primeblocks.css"><link rel="stylesheet" href="/css/dataTables.bootstrap4.min.css"><link rel="stylesheet" href="/css/buttons.bootstrap4.min.css"><link rel="stylesheet" href="/css/keyTable.dataTables.min.css">`);
  _push(ssrRenderComponent(_component_DashboardSidebarNav, null, null, _parent));
  _push(`<main class="main-wrapper">`);
  _push(ssrRenderComponent(_component_DashboardHeader, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_DashboardFooter, null, null, _parent));
  _push(`</main></main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-NQlLuxxw.mjs.map
