import { _ as __nuxt_component_0 } from './nuxt-layout-JwQ_HVG5.mjs';
import { useSSRContext, defineComponent, ref, resolveComponent, mergeProps, unref, isRef, withCtx, createVNode, withDirectives, vModelText, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-564uVeOW.mjs';
import { u as useFormStore } from './form-W7NAv5ds.mjs';
import { _ as _export_sfc, d as useToast } from '../server.mjs';
import 'vue-router';
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
import 'axios';
import 'libphonenumber-js';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "civil",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    useFormStore();
    const first = ref(true);
    const add_dependent_modal = ref(false);
    const first_name = ref();
    const last_name = ref();
    const selected_titles = ref();
    const date_of_birth = ref();
    const id_number = ref();
    const selected_gender = ref();
    const membership_number = ref();
    const cell_number = ref();
    const physical_address = ref();
    const place_of_birth = ref();
    const other_information = ref();
    const society_name = ref();
    const package_name = ref();
    const from_date = ref();
    const to_date = ref();
    const selected_marital_status = ref();
    const loading = ref(false);
    const employer_name = ref();
    const contact_number = ref();
    const occupation = ref();
    const department = ref();
    const ec_number = ref();
    const station_number = ref();
    const dependent_first_name = ref();
    const dependent_last_name = ref();
    const selected_dependent_gender = ref();
    const dependent_id_number = ref();
    const gender = ref(["MALE", "FEMALE"]);
    ref();
    const titles = ref(["MR", "MRS", "MISS"]);
    const selected_application_type = ref();
    const application_type = ref(["NEW", "CHANGE", "CEASE"]);
    const selected_package_type = ref();
    const package_types = ref(["INDIVIDUAL", "CORPORATE", "FAMILY", "HEALTH SAVINGS FUND", "STUDENT", "GOVERMENT", "COMMUNITY HEALTH FUND"]);
    const selected_package_details = ref();
    const package_details = ref(["BASIC", "STANDARD", "ELITE", "CLASSIC", "COMPREHENSIVE", "EXECUTIVE", "PLATINUM"]);
    const ministry = ref();
    const department_code = ref();
    const station_code = ref();
    const card_type = ref();
    const section = ref();
    const subsection = ref();
    const employee_code_number = ref();
    const cd = ref();
    const payee_code = ref();
    const amount_deducted = ref();
    const from_date_ty = ref();
    const to_date_ty = ref();
    const policy_medical_aid_number = ref();
    const marital_status = ref([
      "SINGLE",
      "MARRIED",
      "DIVORCED",
      "WIDOWED",
      "SEPARATED"
    ]);
    const dependents = ref([]);
    const categories = ref([
      { name: "HYPETENSION", key: "A" },
      { name: "EPILEPSY", key: "B" },
      { name: "RENAL", key: "C" },
      { name: "LUNG", key: "D" },
      { name: "BLOOD DISEASES", key: "E" },
      { name: "STROKE", key: "F" },
      { name: "CANCER", key: "G" },
      { name: "LIVER", key: "H" },
      { name: "PSYCHATRIC", key: "I" },
      { name: "OTHER", key: "J" }
    ]);
    const selectedCategories = ref([]);
    const addToDependents = () => {
      let data = {
        first_name: dependent_first_name.value,
        last_name: dependent_last_name.value,
        gender: selected_dependent_gender.value,
        id_number: dependent_id_number.value
      };
      dependents.value.push(data);
      add_dependent_modal.value = false;
    };
    const removefromDependency = (data) => {
      console.log(data);
      dependents.value.splice(data, 1);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DropDown = resolveComponent("DropDown");
      const _component_Calendar = resolveComponent("Calendar");
      const _component_Textarea = resolveComponent("Textarea");
      const _component_Button = resolveComponent("Button");
      const _component_Dialog = resolveComponent("Dialog");
      const _component_DataTable = resolveComponent("DataTable");
      const _component_Column = resolveComponent("Column");
      const _component_Checkbox = resolveComponent("Checkbox");
      const _component_InputNumber = resolveComponent("InputNumber");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "surface-section px-4 py-8 md:px-6 lg:px-8" }, _attrs))}><div class="parent-container"><img width="180"${ssrRenderAttr("src", _imports_0)} alt="Logo"></div>`);
      if (unref(first) === true) {
        _push(`<div class="px-4 py-8 md:px-6 lg:px-8"><div class="text-900 font-medium text-xl mb-3">Membership Application Form</div><p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Member Details</p><div class="surface-card p-4 shadow-2 border-round"><div class="grid formgrid p-fluid"><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">First Name/s</label><input${ssrRenderAttr("value", unref(first_name))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Last Name</label><input${ssrRenderAttr("value", unref(last_name))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Title</label>`);
        _push(ssrRenderComponent(_component_DropDown, {
          modelValue: unref(selected_titles),
          "onUpdate:modelValue": ($event) => isRef(selected_titles) ? selected_titles.value = $event : null,
          options: unref(titles),
          placeholder: "Select Title",
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Date of Birth</label>`);
        _push(ssrRenderComponent(_component_Calendar, {
          modelValue: unref(date_of_birth),
          "onUpdate:modelValue": ($event) => isRef(date_of_birth) ? date_of_birth.value = $event : null,
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">ID Number</label><input${ssrRenderAttr("value", unref(id_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Gender</label>`);
        _push(ssrRenderComponent(_component_DropDown, {
          modelValue: unref(selected_gender),
          "onUpdate:modelValue": ($event) => isRef(selected_gender) ? selected_gender.value = $event : null,
          options: unref(gender),
          placeholder: "Select Gender",
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Membership Number</label><input${ssrRenderAttr("value", unref(membership_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Cell Number</label><input${ssrRenderAttr("value", unref(cell_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Physical Address</label>`);
        _push(ssrRenderComponent(_component_Textarea, {
          modelValue: unref(physical_address),
          "onUpdate:modelValue": ($event) => isRef(physical_address) ? physical_address.value = $event : null,
          rows: "5",
          cols: "30"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Place of Birth</label><input${ssrRenderAttr("value", unref(place_of_birth))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Marital Status</label>`);
        _push(ssrRenderComponent(_component_DropDown, {
          modelValue: unref(selected_marital_status),
          "onUpdate:modelValue": ($event) => isRef(selected_marital_status) ? selected_marital_status.value = $event : null,
          options: unref(marital_status),
          placeholder: "Select Marital Status",
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div><div class="field mb-4 col-12 md:col-12"><p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Employment Details</p></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Employer Name</label><input${ssrRenderAttr("value", unref(employer_name))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Contact Numbers</label><input${ssrRenderAttr("value", unref(contact_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Occupation</label><input${ssrRenderAttr("value", unref(occupation))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Department</label><input${ssrRenderAttr("value", unref(department))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">E.C Work Number</label><input${ssrRenderAttr("value", unref(ec_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Station Name</label><input${ssrRenderAttr("value", unref(station_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div><div class="field mb-4 col-6">`);
        _push(ssrRenderComponent(_component_Button, {
          onClick: ($event) => add_dependent_modal.value = true,
          class: "mb-4",
          label: "Add Dependent",
          icon: "pi pi-plus"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Dialog, {
          visible: unref(add_dependent_modal),
          "onUpdate:visible": ($event) => isRef(add_dependent_modal) ? add_dependent_modal.value = $event : null,
          modal: "",
          header: "Add Dependent",
          style: { width: "50rem" },
          breakpoints: { "1199px": "75vw", "575px": "90vw" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="p-dialog-content" data-pc-section="content"${_scopeId}><form class="flex flex-column gap-3 mt-3"${_scopeId}><div class="flex gap-3"${_scopeId}><div class="w-full"${_scopeId}><label for="cvc" class="block mb-1 text-color text-base"${_scopeId}>First Name</label><input${ssrRenderAttr("value", unref(dependent_first_name))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" name="cvc" type="text" id="cvc"${_scopeId}></div><div class="w-full"${_scopeId}><label for="expiration" class="block mb-1 text-color text-base"${_scopeId}>Last Name</label><input${ssrRenderAttr("value", unref(dependent_last_name))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" name="exp" type="text" id="expiration"${_scopeId}></div></div><div${_scopeId}><label for="cardholder" class="block mb-1 text-color text-base"${_scopeId}>Gender</label>`);
              _push2(ssrRenderComponent(_component_DropDown, {
                modelValue: unref(selected_dependent_gender),
                "onUpdate:modelValue": ($event) => isRef(selected_dependent_gender) ? selected_dependent_gender.value = $event : null,
                options: unref(gender),
                placeholder: "Select Gender",
                class: "w-full md:12"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><label for="credit-card" class="block mb-1 text-color text-base"${_scopeId}>ID Number</label><span class="p-input-icon-left w-full"${_scopeId}><i class="pi pi-credit-card"${_scopeId}></i><input${ssrRenderAttr("value", unref(dependent_id_number))} class="p-inputtext p-component w-full" data-pc-name="inputtext" data-pc-section="root" name="cc" type="text" id="credit-card" placeholder="14-155115A51"${_scopeId}></span></div></form></div><div class="p-dialog-footer" data-pc-section="footer"${_scopeId}><div class="border-top-1 surface-border pt-3 flex"${_scopeId}><button class="p-button p-component p-button-outlined w-6 mr-2" type="button" aria-label="Cancel" data-pc-name="button" data-pc-section="root" data-pd-ripple="true"${_scopeId}><span class="p-button-icon p-button-icon-left pi pi-times" data-pc-section="icon"${_scopeId}></span><span class="p-button-label" data-pc-section="label"${_scopeId}>Cancel</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"${_scopeId}></span></button><button class="p-button p-component w-6 ml-2" type="button" aria-label="Save" data-pc-name="button" data-pc-section="root" data-pd-ripple="true"${_scopeId}><span class="p-button-icon p-button-icon-left pi pi-check" data-pc-section="icon"${_scopeId}></span><span class="p-button-label" data-pc-section="label"${_scopeId}>Save</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"${_scopeId}></span></button></div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: "p-dialog-content",
                  "data-pc-section": "content"
                }, [
                  createVNode("form", { class: "flex flex-column gap-3 mt-3" }, [
                    createVNode("div", { class: "flex gap-3" }, [
                      createVNode("div", { class: "w-full" }, [
                        createVNode("label", {
                          for: "cvc",
                          class: "block mb-1 text-color text-base"
                        }, "First Name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(dependent_first_name) ? dependent_first_name.value = $event : null,
                          class: "p-inputtext p-component w-full",
                          "data-pc-name": "inputtext",
                          "data-pc-section": "root",
                          name: "cvc",
                          type: "text",
                          id: "cvc"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(dependent_first_name)]
                        ])
                      ]),
                      createVNode("div", { class: "w-full" }, [
                        createVNode("label", {
                          for: "expiration",
                          class: "block mb-1 text-color text-base"
                        }, "Last Name"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(dependent_last_name) ? dependent_last_name.value = $event : null,
                          class: "p-inputtext p-component w-full",
                          "data-pc-name": "inputtext",
                          "data-pc-section": "root",
                          name: "exp",
                          type: "text",
                          id: "expiration"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(dependent_last_name)]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "cardholder",
                        class: "block mb-1 text-color text-base"
                      }, "Gender"),
                      createVNode(_component_DropDown, {
                        modelValue: unref(selected_dependent_gender),
                        "onUpdate:modelValue": ($event) => isRef(selected_dependent_gender) ? selected_dependent_gender.value = $event : null,
                        options: unref(gender),
                        placeholder: "Select Gender",
                        class: "w-full md:12"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "credit-card",
                        class: "block mb-1 text-color text-base"
                      }, "ID Number"),
                      createVNode("span", { class: "p-input-icon-left w-full" }, [
                        createVNode("i", { class: "pi pi-credit-card" }),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(dependent_id_number) ? dependent_id_number.value = $event : null,
                          class: "p-inputtext p-component w-full",
                          "data-pc-name": "inputtext",
                          "data-pc-section": "root",
                          name: "cc",
                          type: "text",
                          id: "credit-card",
                          placeholder: "14-155115A51"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(dependent_id_number)]
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", {
                  class: "p-dialog-footer",
                  "data-pc-section": "footer"
                }, [
                  createVNode("div", { class: "border-top-1 surface-border pt-3 flex" }, [
                    createVNode("button", {
                      onClick: ($event) => add_dependent_modal.value = false,
                      class: "p-button p-component p-button-outlined w-6 mr-2",
                      type: "button",
                      "aria-label": "Cancel",
                      "data-pc-name": "button",
                      "data-pc-section": "root",
                      "data-pd-ripple": "true"
                    }, [
                      createVNode("span", {
                        class: "p-button-icon p-button-icon-left pi pi-times",
                        "data-pc-section": "icon"
                      }),
                      createVNode("span", {
                        class: "p-button-label",
                        "data-pc-section": "label"
                      }, "Cancel"),
                      createVNode("span", {
                        role: "presentation",
                        "aria-hidden": "true",
                        "data-p-ink": "true",
                        "data-p-ink-active": "false",
                        class: "p-ink",
                        "data-pc-name": "ripple",
                        "data-pc-section": "root"
                      })
                    ], 8, ["onClick"]),
                    createVNode("button", {
                      onClick: addToDependents,
                      class: "p-button p-component w-6 ml-2",
                      type: "button",
                      "aria-label": "Save",
                      "data-pc-name": "button",
                      "data-pc-section": "root",
                      "data-pd-ripple": "true"
                    }, [
                      createVNode("span", {
                        class: "p-button-icon p-button-icon-left pi pi-check",
                        "data-pc-section": "icon"
                      }),
                      createVNode("span", {
                        class: "p-button-label",
                        "data-pc-section": "label"
                      }, "Save"),
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
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="field mb-4 col-12">`);
        _push(ssrRenderComponent(_component_DataTable, { value: unref(dependents) }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-wrap align-items-center justify-content-between gap-2"${_scopeId}><span class="text-xl text-900 font-bold"${_scopeId}>Dependecies</span></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-wrap align-items-center justify-content-between gap-2" }, [
                  createVNode("span", { class: "text-xl text-900 font-bold" }, "Dependecies")
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Column, { header: "First Name" }, {
                body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(slotProps.data.first_name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(slotProps.data.first_name), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Column, { header: "Last Name" }, {
                body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(slotProps.data.last_name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(slotProps.data.last_name), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Column, { header: "Gender" }, {
                body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(slotProps.data.gender)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(slotProps.data.gender), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Column, { header: "ID Number" }, {
                body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(slotProps.data.id_number)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(slotProps.data.id_number), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Column, { header: "Status" }, {
                body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Button, {
                      onClick: ($event) => removefromDependency(slotProps.index),
                      icon: "pi pi-trash",
                      severity: "danger",
                      "aria-label": "Cancel"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Button, {
                        onClick: ($event) => removefromDependency(slotProps.index),
                        icon: "pi pi-trash",
                        severity: "danger",
                        "aria-label": "Cancel"
                      }, null, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Column, { header: "First Name" }, {
                  body: withCtx((slotProps) => [
                    createTextVNode(toDisplayString(slotProps.data.first_name), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, { header: "Last Name" }, {
                  body: withCtx((slotProps) => [
                    createTextVNode(toDisplayString(slotProps.data.last_name), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, { header: "Gender" }, {
                  body: withCtx((slotProps) => [
                    createTextVNode(toDisplayString(slotProps.data.gender), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, { header: "ID Number" }, {
                  body: withCtx((slotProps) => [
                    createTextVNode(toDisplayString(slotProps.data.id_number), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, { header: "Status" }, {
                  body: withCtx((slotProps) => [
                    createVNode(_component_Button, {
                      onClick: ($event) => removefromDependency(slotProps.index),
                      icon: "pi pi-trash",
                      severity: "danger",
                      "aria-label": "Cancel"
                    }, null, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Package Type</label>`);
        _push(ssrRenderComponent(_component_DropDown, {
          modelValue: unref(selected_package_type),
          "onUpdate:modelValue": ($event) => isRef(selected_package_type) ? selected_package_type.value = $event : null,
          options: unref(package_types),
          placeholder: "Select Package Type",
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Package Details</label>`);
        _push(ssrRenderComponent(_component_DropDown, {
          modelValue: unref(selected_package_details),
          "onUpdate:modelValue": ($event) => isRef(selected_package_details) ? selected_package_details.value = $event : null,
          options: unref(package_details),
          placeholder: "Select Package Details",
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-12"><label for="nickname2" class="font-medium text-900">Have you/your dependants suffered/ or is suffering from any of the following?(Tick boxes that apply)</label><!--[-->`);
        ssrRenderList(unref(categories), (category) => {
          _push(`<div class="tyr flex align-items-center">`);
          _push(ssrRenderComponent(_component_Checkbox, {
            modelValue: unref(selectedCategories),
            "onUpdate:modelValue": ($event) => isRef(selectedCategories) ? selectedCategories.value = $event : null,
            inputId: category.key,
            name: "category",
            value: category.name
          }, null, _parent));
          _push(`<label class="clabel"${ssrRenderAttr("for", category.key)}>${ssrInterpolate(category.name)}</label></div>`);
        });
        _push(`<!--]--></div><div class="field mb-4 col-12"><label for="nickname2" class="font-medium text-900">IS THERE ANY HEALTH INFORMATION ABOUT YOU OR YOUR DEPENDANTS THAT YOU MAY WANT TO SHARE WITH US?</label>`);
        _push(ssrRenderComponent(_component_Textarea, {
          modelValue: unref(other_information),
          "onUpdate:modelValue": ($event) => isRef(other_information) ? other_information.value = $event : null,
          rows: "5",
          cols: "30"
        }, null, _parent));
        _push(`</div><div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div><div class="field mb-4 col-12 md:col-12"><p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Previous Medical Aid Cover Details</p></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Society Name</label><input${ssrRenderAttr("value", unref(society_name))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Package Name</label><input${ssrRenderAttr("value", unref(package_name))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">From Date</label>`);
        _push(ssrRenderComponent(_component_Calendar, {
          modelValue: unref(from_date),
          "onUpdate:modelValue": ($event) => isRef(from_date) ? from_date.value = $event : null,
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">To Date</label>`);
        _push(ssrRenderComponent(_component_Calendar, {
          modelValue: unref(to_date),
          "onUpdate:modelValue": ($event) => isRef(to_date) ? to_date.value = $event : null,
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div><div class="col-12"><button class="p-button p-component w-auto mt-3" type="button" aria-label="Save Changes" data-pc-name="button" data-pc-section="root" data-pd-ripple="true"><span class="p-button-label" data-pc-section="label">Go to TY13</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></button></div></div></div></div>`);
      } else {
        _push(`<div class="px-4 py-8 md:px-6 lg:px-8"><div class="text-900 font-medium text-xl mb-3">Member TY13 Form</div><p id="top" class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Details</p><div class="surface-card p-4 shadow-2 border-round"><div class="grid formgrid p-fluid"><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">First Name/s</label><input${ssrRenderAttr("value", unref(first_name))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Last Name</label><input${ssrRenderAttr("value", unref(last_name))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">ID Number</label><input${ssrRenderAttr("value", unref(id_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Ministry</label><input${ssrRenderAttr("value", unref(ministry))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Department Code</label><input${ssrRenderAttr("value", unref(department_code))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Station Code</label><input${ssrRenderAttr("value", unref(station_code))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-12"><label for="nickname2" class="font-medium text-900">Application Type</label>`);
        _push(ssrRenderComponent(_component_DropDown, {
          modelValue: unref(selected_application_type),
          "onUpdate:modelValue": ($event) => isRef(selected_application_type) ? selected_application_type.value = $event : null,
          options: unref(application_type),
          placeholder: "Select Application Type",
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-2"><label for="nickname2" class="font-medium text-900">Card Type</label><input${ssrRenderAttr("value", unref(card_type))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-2"><label for="nickname2" class="font-medium text-900">Section</label><input${ssrRenderAttr("value", unref(section))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Subsection</label><input${ssrRenderAttr("value", unref(subsection))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">Employment Code Number</label><input${ssrRenderAttr("value", unref(employee_code_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-2"><label for="nickname2" class="font-medium text-900">C/D</label><input${ssrRenderAttr("value", unref(cd))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Payee Code</label><input${ssrRenderAttr("value", unref(payee_code))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Amount Deducted</label>`);
        _push(ssrRenderComponent(_component_InputNumber, {
          modelValue: unref(amount_deducted),
          "onUpdate:modelValue": ($event) => isRef(amount_deducted) ? amount_deducted.value = $event : null,
          inputId: "currency-us",
          mode: "currency",
          currency: "ZWL",
          locale: "en-US"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">From Date</label>`);
        _push(ssrRenderComponent(_component_Calendar, {
          modelValue: unref(from_date_ty),
          "onUpdate:modelValue": ($event) => isRef(from_date_ty) ? from_date_ty.value = $event : null,
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-3"><label for="nickname2" class="font-medium text-900">To Date</label>`);
        _push(ssrRenderComponent(_component_Calendar, {
          modelValue: unref(to_date_ty),
          "onUpdate:modelValue": ($event) => isRef(to_date_ty) ? to_date_ty.value = $event : null,
          class: "w-full md:12"
        }, null, _parent));
        _push(`</div><div class="field mb-4 col-6"><label for="nickname2" class="font-medium text-900">Policy or Medical Aid Number</label><input${ssrRenderAttr("value", unref(policy_medical_aid_number))} class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="nickname2" type="text"></div><div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div><div class="col-12"><button${ssrRenderAttr("loading", unref(loading))} class="p-button p-component w-auto mt-3" type="button" aria-label="Save Changes" data-pc-name="button" data-pc-section="root" data-pd-ripple="true"><span class="p-button-label" data-pc-section="label">Send Application</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></button></div></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/civil.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_FormsCivil = _sfc_main$1;
  _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_FormsCivil, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_FormsCivil)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/civil.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const civil = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { civil as default };
//# sourceMappingURL=civil-t9cLgTNl.mjs.map