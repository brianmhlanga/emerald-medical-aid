import { _ as __nuxt_component_0 } from './nuxt-layout-JwQ_HVG5.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, isRef, openBlock, createBlock, createVNode, toDisplayString, withDirectives, vModelText, useSSRContext } from 'vue';
import { d as useToast, b as navigateTo } from '../server.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-EG7XnNR-.mjs';
import 'vue-router';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'libphonenumber-js';
import './cookie-mXglfnjH.mjs';
import 'sweetalert2';
import 'axios';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const toast = useToast();
    const selectedCountry = ref();
    const first_name = ref();
    const last_name = ref();
    const date_of_birth = ref();
    const school = ref();
    const grade = ref();
    const email = ref();
    const phone = ref();
    const password = ref();
    const confirm_password = ref();
    const countries = ref([]);
    const signUp = async () => {
      let data = {
        first_name: first_name.value,
        last_name: last_name.value,
        date_of_birth: date_of_birth.value,
        country: selectedCountry.value,
        school: school.value,
        grade: grade.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        confirm_password
      };
      await authStore.register(data).then((data2) => {
        var _a;
        console.log(data2);
        if ((_a = data2 == null ? void 0 : data2.data) == null ? void 0 : _a.success) {
          toast.add({ severity: "info", summary: "Success", detail: "Succesfully Registred", life: 6e3 });
          navigateTo("/login");
        } else {
          toast.add({ severity: "warn", summary: "Registration failed", detail: "Failed to Register", life: 6e3 });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_Calendar = resolveComponent("Calendar");
      const _component_DropDown = resolveComponent("DropDown");
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="block-content"${_scopeId}><div class=""${_scopeId}><div class="flex"${_scopeId}><div class="surface-section w-full md:w-6 p-6 md:p-8"${_scopeId}><div class="mb-5"${_scopeId}><img src="https://blocks.primevue.org//images/blocks/logos/hyper.svg" alt="Image" height="50" class="mb-3"${_scopeId}><div class="text-900 text-3xl font-medium mb-3"${_scopeId}>Welcome To Mfundo</div><span class="text-600 font-medium mr-2"${_scopeId}>Already have an account?</span><a class="font-medium no-underline text-blue-500 cursor-pointer"${_scopeId}>Sign In!</a></div><div class="flex"${_scopeId}><div class="col-6 mb-3"${_scopeId}><label for="firstName" class="block text-900 font-medium mb-2"${_scopeId}>First Name</label><input${ssrRenderAttr("value", unref(first_name))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" id="firstName" type="text" placeholder="First Name"${_scopeId}></div><div class="col-6 mb-3"${_scopeId}><label for="lastName" class="block text-900 font-medium mb-2"${_scopeId}>Last Name</label><input${ssrRenderAttr("value", unref(last_name))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" id="lastName" type="text" placeholder="Last Name"${_scopeId}></div></div><div class="flex"${_scopeId}><div class="col-6 mb-3"${_scopeId}><label for="firstName" class="block text-900 font-medium mb-2"${_scopeId}>Date of Birth</label>`);
            _push2(ssrRenderComponent(_component_Calendar, {
              modelValue: unref(date_of_birth),
              "onUpdate:modelValue": ($event) => isRef(date_of_birth) ? date_of_birth.value = $event : null,
              class: "mydate",
              showIcon: "",
              iconDisplay: "input"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-6 mb-3"${_scopeId}><label for="lastName" class="block text-900 font-medium mb-2"${_scopeId}>Country</label>`);
            _push2(ssrRenderComponent(_component_DropDown, {
              modelValue: unref(selectedCountry),
              "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null,
              options: unref(countries),
              filter: "",
              optionLabel: "name",
              placeholder: "Select a Country",
              class: "w-full"
            }, {
              value: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (slotProps.value) {
                    _push3(`<div class="flex align-items-center"${_scopeId2}><img${ssrRenderAttr("alt", slotProps.value.label)} src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" class="${ssrRenderClass(`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`)}" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId2}><div${_scopeId2}>${ssrInterpolate(slotProps.value.name)}</div></div>`);
                  } else {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(slotProps.placeholder)}</span>`);
                  }
                } else {
                  return [
                    slotProps.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex align-items-center"
                    }, [
                      createVNode("img", {
                        alt: slotProps.value.label,
                        src: "https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png",
                        class: `mr-2 flag flag-${slotProps.value.code.toLowerCase()}`,
                        style: { "width": "18px" }
                      }, null, 10, ["alt"]),
                      createVNode("div", null, toDisplayString(slotProps.value.name), 1)
                    ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(slotProps.placeholder), 1))
                  ];
                }
              }),
              option: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex align-items-center"${_scopeId2}><img${ssrRenderAttr("alt", slotProps.option.label)} src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" class="${ssrRenderClass(`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`)}" style="${ssrRenderStyle({ "width": "18px" })}"${_scopeId2}><div${_scopeId2}>${ssrInterpolate(slotProps.option.name)}</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex align-items-center" }, [
                      createVNode("img", {
                        alt: slotProps.option.label,
                        src: "https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png",
                        class: `mr-2 flag flag-${slotProps.option.code.toLowerCase()}`,
                        style: { "width": "18px" }
                      }, null, 10, ["alt"]),
                      createVNode("div", null, toDisplayString(slotProps.option.name), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex"${_scopeId}><div class="col-6 mb-3"${_scopeId}><label for="firstName" class="block text-900 font-medium mb-2"${_scopeId}>School/Institution Name</label><input${ssrRenderAttr("value", unref(school))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" type="text" placeholder="School/Institution Name"${_scopeId}></div><div class="col-6 mb-3"${_scopeId}><label for="lastName" class="block text-900 font-medium mb-2"${_scopeId}>Grade/Class</label><input${ssrRenderAttr("value", unref(grade))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" type="text" placeholder="Grade/Class"${_scopeId}></div></div><div class="flex"${_scopeId}><div class="col-6 mb-3"${_scopeId}><label for="firstName" class="block text-900 font-medium mb-2"${_scopeId}>Email</label><input${ssrRenderAttr("value", unref(email))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" type="email" placeholder="Email Address"${_scopeId}></div><div class="col-6 mb-3"${_scopeId}><label for="lastName" class="block text-900 font-medium mb-2"${_scopeId}>Phone Number</label><input${ssrRenderAttr("value", unref(phone))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" type="text" placeholder="Phone Number"${_scopeId}></div></div><div class="flex"${_scopeId}><div class="col-6 mb-3"${_scopeId}><label for="lastName" class="block text-900 font-medium mb-2"${_scopeId}>Password</label><input${ssrRenderAttr("value", unref(password))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" id="lastName" type="password" placeholder="Password"${_scopeId}></div><div class="col-6 mb-3"${_scopeId}><label for="lastName" class="block text-900 font-medium mb-2"${_scopeId}>Confirm Password</label><input${ssrRenderAttr("value", unref(confirm_password))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" id="lastName" type="text" placeholder="Phone Number"${_scopeId}></div></div><button class="p-button p-component w-full p-3" type="button" aria-label="Sign In" data-pc-name="button" data-pc-section="root" data-pd-ripple="true"${_scopeId}><span class="p-button-icon p-button-icon-left pi pi-user" data-pc-section="icon"${_scopeId}></span><span class="p-button-label" data-pc-section="label"${_scopeId}>Sign Up</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"${_scopeId}></span></button></div><div class="hidden md:block w-6 bg-no-repeat bg-cover" style="${ssrRenderStyle({ "background-image": 'url("/images/little-girl-with-colorful-books-table.jpg")' })}"${_scopeId}></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "block-content" }, [
                createVNode("div", { class: "" }, [
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", { class: "surface-section w-full md:w-6 p-6 md:p-8" }, [
                      createVNode("div", { class: "mb-5" }, [
                        createVNode("img", {
                          src: "https://blocks.primevue.org//images/blocks/logos/hyper.svg",
                          alt: "Image",
                          height: "50",
                          class: "mb-3"
                        }),
                        createVNode("div", { class: "text-900 text-3xl font-medium mb-3" }, "Welcome To Mfundo"),
                        createVNode("span", { class: "text-600 font-medium mr-2" }, "Already have an account?"),
                        createVNode("a", {
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/login"),
                          class: "font-medium no-underline text-blue-500 cursor-pointer"
                        }, "Sign In!", 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "firstName",
                            class: "block text-900 font-medium mb-2"
                          }, "First Name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(first_name) ? first_name.value = $event : null,
                            class: "p-inputtext p-component w-full",
                            "data-pc-name": "inputtext",
                            "data-pc-section": "root",
                            id: "firstName",
                            type: "text",
                            placeholder: "First Name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(first_name)]
                          ])
                        ]),
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "lastName",
                            class: "block text-900 font-medium mb-2"
                          }, "Last Name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(last_name) ? last_name.value = $event : null,
                            class: "p-inputtext p-component w-full",
                            "data-pc-name": "inputtext",
                            "data-pc-section": "root",
                            id: "lastName",
                            type: "text",
                            placeholder: "Last Name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(last_name)]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "firstName",
                            class: "block text-900 font-medium mb-2"
                          }, "Date of Birth"),
                          createVNode(_component_Calendar, {
                            modelValue: unref(date_of_birth),
                            "onUpdate:modelValue": ($event) => isRef(date_of_birth) ? date_of_birth.value = $event : null,
                            class: "mydate",
                            showIcon: "",
                            iconDisplay: "input"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "lastName",
                            class: "block text-900 font-medium mb-2"
                          }, "Country"),
                          createVNode(_component_DropDown, {
                            modelValue: unref(selectedCountry),
                            "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null,
                            options: unref(countries),
                            filter: "",
                            optionLabel: "name",
                            placeholder: "Select a Country",
                            class: "w-full"
                          }, {
                            value: withCtx((slotProps) => [
                              slotProps.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex align-items-center"
                              }, [
                                createVNode("img", {
                                  alt: slotProps.value.label,
                                  src: "https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png",
                                  class: `mr-2 flag flag-${slotProps.value.code.toLowerCase()}`,
                                  style: { "width": "18px" }
                                }, null, 10, ["alt"]),
                                createVNode("div", null, toDisplayString(slotProps.value.name), 1)
                              ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(slotProps.placeholder), 1))
                            ]),
                            option: withCtx((slotProps) => [
                              createVNode("div", { class: "flex align-items-center" }, [
                                createVNode("img", {
                                  alt: slotProps.option.label,
                                  src: "https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png",
                                  class: `mr-2 flag flag-${slotProps.option.code.toLowerCase()}`,
                                  style: { "width": "18px" }
                                }, null, 10, ["alt"]),
                                createVNode("div", null, toDisplayString(slotProps.option.name), 1)
                              ])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "options"])
                        ])
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "firstName",
                            class: "block text-900 font-medium mb-2"
                          }, "School/Institution Name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(school) ? school.value = $event : null,
                            class: "p-inputtext p-component w-full",
                            "data-pc-name": "inputtext",
                            "data-pc-section": "root",
                            type: "text",
                            placeholder: "School/Institution Name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(school)]
                          ])
                        ]),
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "lastName",
                            class: "block text-900 font-medium mb-2"
                          }, "Grade/Class"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(grade) ? grade.value = $event : null,
                            class: "p-inputtext p-component w-full",
                            "data-pc-name": "inputtext",
                            "data-pc-section": "root",
                            type: "text",
                            placeholder: "Grade/Class"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(grade)]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "firstName",
                            class: "block text-900 font-medium mb-2"
                          }, "Email"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                            class: "p-inputtext p-component w-full",
                            "data-pc-name": "inputtext",
                            "data-pc-section": "root",
                            type: "email",
                            placeholder: "Email Address"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(email)]
                          ])
                        ]),
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "lastName",
                            class: "block text-900 font-medium mb-2"
                          }, "Phone Number"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                            class: "p-inputtext p-component w-full",
                            "data-pc-name": "inputtext",
                            "data-pc-section": "root",
                            type: "text",
                            placeholder: "Phone Number"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(phone)]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "lastName",
                            class: "block text-900 font-medium mb-2"
                          }, "Password"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            class: "p-inputtext p-component w-full",
                            "data-pc-name": "inputtext",
                            "data-pc-section": "root",
                            id: "lastName",
                            type: "password",
                            placeholder: "Password"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(password)]
                          ])
                        ]),
                        createVNode("div", { class: "col-6 mb-3" }, [
                          createVNode("label", {
                            for: "lastName",
                            class: "block text-900 font-medium mb-2"
                          }, "Confirm Password"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => isRef(confirm_password) ? confirm_password.value = $event : null,
                            class: "p-inputtext p-component w-full",
                            "data-pc-name": "inputtext",
                            "data-pc-section": "root",
                            id: "lastName",
                            type: "text",
                            placeholder: "Phone Number"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(confirm_password)]
                          ])
                        ])
                      ]),
                      createVNode("button", {
                        onClick: signUp,
                        class: "p-button p-component w-full p-3",
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
                        }, "Sign Up"),
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
                    ]),
                    createVNode("div", {
                      class: "hidden md:block w-6 bg-no-repeat bg-cover",
                      style: { "background-image": 'url("/images/little-girl-with-colorful-books-table.jpg")' }
                    })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-pSSstZ9F.mjs.map
