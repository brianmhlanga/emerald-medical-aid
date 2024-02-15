import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-layout--JwYAUj5.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, withDirectives, isRef, vModelText, useSSRContext } from 'vue';
import { d as useToast, b as navigateTo } from '../server.mjs';
import { ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAuthStore } from './auth--3ZWUGaz.mjs';
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
import './cookie-eUdDdNIn.mjs';
import 'sweetalert2';
import 'axios';

const _imports_0 = "" + publicAssetsURL("images/blocks/logos/hyper.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const toast = useToast();
    const email = ref();
    const password = ref();
    const signIn = async () => {
      let data = {
        email: email.value,
        password: password.value
      };
      await authStore.login(data).then((data2) => {
        var _a;
        console.log(data2);
        if ((_a = data2 == null ? void 0 : data2.data) == null ? void 0 : _a.success) {
          toast.add({ severity: "info", summary: "Success", detail: "Succesfully Login", life: 6e3 });
          navigateTo("/");
        } else {
          toast.add({ severity: "warn", summary: "Registration failed", detail: "Failed to Register", life: 6e3 });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="block-content"${_scopeId}><div class="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center"${_scopeId}><div class="surface-card p-4 shadow-2 border-round w-full lg:w-6"${_scopeId}><div class="text-center mb-5"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="Image" height="50" class="mb-3"${_scopeId}><div class="text-900 text-3xl font-medium mb-3"${_scopeId}>Welcome Back</div><span class="text-600 font-medium line-height-3"${_scopeId}>Don&#39;t have an account?</span><a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"${_scopeId}>Create today!</a></div><div${_scopeId}><label for="email1" class="block text-900 font-medium mb-2"${_scopeId}>Email</label><input${ssrRenderAttr("value", unref(email))} class="p-inputtext p-component w-full mb-3" data-pc-name="inputtext" data-pc-section="root" id="email1" type="text" placeholder="Email address"${_scopeId}><label for="password1" class="block text-900 font-medium mb-2"${_scopeId}>Password</label><input${ssrRenderAttr("value", unref(password))} class="p-inputtext p-component w-full mb-3" data-pc-name="inputtext" data-pc-section="root" id="password1" type="password" placehoder="Password"${_scopeId}><div class="flex align-items-center justify-content-between mb-6"${_scopeId}><a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"${_scopeId}>Forgot password?</a></div><button class="p-button p-component w-full" type="button" aria-label="Sign In" data-pc-name="button" data-pc-section="root" data-pd-ripple="true"${_scopeId}><span class="p-button-icon p-button-icon-left pi pi-user" data-pc-section="icon"${_scopeId}></span><span class="p-button-label" data-pc-section="label"${_scopeId}>Sign In</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"${_scopeId}></span></button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "block-content" }, [
                createVNode("div", { class: "surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center" }, [
                  createVNode("div", { class: "surface-card p-4 shadow-2 border-round w-full lg:w-6" }, [
                    createVNode("div", { class: "text-center mb-5" }, [
                      createVNode("img", {
                        src: _imports_0,
                        alt: "Image",
                        height: "50",
                        class: "mb-3"
                      }),
                      createVNode("div", { class: "text-900 text-3xl font-medium mb-3" }, "Welcome Back"),
                      createVNode("span", { class: "text-600 font-medium line-height-3" }, "Don't have an account?"),
                      createVNode("a", { class: "font-medium no-underline ml-2 text-blue-500 cursor-pointer" }, "Create today!")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "email1",
                        class: "block text-900 font-medium mb-2"
                      }, "Email"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                        class: "p-inputtext p-component w-full mb-3",
                        "data-pc-name": "inputtext",
                        "data-pc-section": "root",
                        id: "email1",
                        type: "text",
                        placeholder: "Email address"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(email)]
                      ]),
                      createVNode("label", {
                        for: "password1",
                        class: "block text-900 font-medium mb-2"
                      }, "Password"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                        class: "p-inputtext p-component w-full mb-3",
                        "data-pc-name": "inputtext",
                        "data-pc-section": "root",
                        id: "password1",
                        type: "password",
                        placehoder: "Password"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(password)]
                      ]),
                      createVNode("div", { class: "flex align-items-center justify-content-between mb-6" }, [
                        createVNode("a", { class: "font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" }, "Forgot password?")
                      ]),
                      createVNode("button", {
                        onClick: signIn,
                        class: "p-button p-component w-full",
                        type: "button",
                        "aria-label": "Sign In",
                        "data-pc-name": "button",
                        "data-pc-section": "root",
                        "data-pd-ripple": "true"
                      }, [
                        createVNode("span", {
                          class: "p-button-icon p-button-icon-left pi pi-user",
                          "data-pc-section": "icon"
                        }),
                        createVNode("span", {
                          class: "p-button-label",
                          "data-pc-section": "label"
                        }, "Sign In"),
                        createVNode("span", {
                          role: "presentation",
                          "aria-hidden": "true",
                          "data-p-ink": "true",
                          "data-p-ink-active": "false",
                          class: "p-ink",
                          "data-pc-name": "ripple",
                          "data-pc-section": "root"
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-PXpsjgUi.mjs.map
