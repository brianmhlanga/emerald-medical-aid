import { _ as __nuxt_component_0$1 } from './nuxt-layout--JwYAUj5.mjs';
import { _ as __nuxt_component_0 } from './menubar-cjHUJKj5.mjs';
import { useSSRContext, defineComponent, ref, resolveComponent, unref, isRef, mergeProps, withCtx, createVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { u as useFormStore } from './form-6y2Dg9Vo.mjs';
import { _ as _export_sfc, d as useToast } from '../server.mjs';
import 'vue-router';
import './logo-564uVeOW.mjs';
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
  __name: "providers",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const formStore = useFormStore();
    const number_of_records = ref(0);
    const providers2 = ref([]);
    const first = ref(0);
    const items_per_page = ref(12);
    const selected_provider_type = ref();
    const text_to_search = ref();
    const provider_types = ref([
      "Ambulance services",
      "General Practiotioner",
      "Opticians",
      "Dentist",
      "Pharmacy",
      "Xrays and Scans",
      "Gynecologist",
      "Hospital",
      "Ophthalmologist / Eye Specialist",
      "Obstetrician & Gynecologist",
      "Specialist Obstetrics and Gynaecologist",
      "Ophtalmologist/ Eye Specialist",
      "Specialist Physician",
      "Cancer Specialist",
      "Ophtalmologist Eye Specialist",
      "General Surgeon",
      "Medical Centre",
      "General & Plastics Surgeon",
      "Physician",
      "Obtsetrian and gynaecologist",
      "Radiology",
      "Paediastrician",
      "Eye Specialist",
      "Physio Therapist",
      "Optometrists",
      "Physiotherapist",
      "Specialist Trauma & Orthopaedics",
      "Consultant Specialist Surgeon",
      "Ear, nose and throat Clinic",
      "Specialists Centre",
      "Eye Specialists",
      "Laboratory",
      "Clinic",
      "Hospital",
      "General practiotioner",
      "General Practitioner",
      "Optician",
      "Physiotherapists",
      "Physiotherapy",
      "Specialist Surgeon",
      "Surgeon",
      "Anaesthetist",
      "Oncologist",
      "Cardiologist",
      "optician",
      "Pathology",
      "Hospital",
      "psychologist",
      "Ambulance",
      "Paediatrician",
      "Genera practitioner"
    ]);
    const selected_provinces = ref();
    const provinces = ref([
      "Harare",
      "Mashonaland West",
      "Midlands",
      "Matabeleland North",
      "Bulawayo",
      "Matebeleland North",
      "Masvingo",
      "Mashonaland",
      "Manicaland",
      "Matabeleland South",
      "Mashonaland East",
      "Mashonaland Central"
    ]);
    const selected_towns = ref();
    const towns = ref([
      "Harare",
      "Bulawayo",
      "Kwekwe",
      "Gweru",
      "Mutare",
      "Masvingo",
      "Chitungwiza",
      "Norton",
      "Murombedzi",
      "Mhondoro",
      "Chegutu",
      "Kadoma",
      "Sanyati",
      "Gokwe",
      "Nkayi",
      "Dete",
      "Maphisa",
      "Shurugwi",
      "Mberengwa",
      "Zvishavane",
      "Mvuma",
      "Esigodini",
      "Plumtree",
      "Tsholotsho",
      "Filabusi",
      "Gwanda",
      "Victoria falls",
      "Binga",
      "Lupane",
      "Hwange",
      "Chiredzi",
      "Chivu",
      "Murambinda",
      "Gutu",
      "Ngundu",
      "Jerera",
      "Chivi",
      "Nyika",
      "Rutenga",
      "Beitbridge",
      "Nyabira",
      "Banket",
      "Chinhoyi",
      "Karoi",
      "Kariba",
      "Ruwa",
      "Goromonzi",
      "Wedza",
      "Marondera",
      "Macheke",
      "Rusape",
      "Nyanga",
      "Nyazura",
      "Honde",
      "Watsomba",
      "Nyanyadzi",
      "Birchenough bridge",
      "Chipinge",
      "Chimanimani",
      "Checheche",
      "Murewa",
      "Mutawatawa",
      "Mutoko",
      "Domboshava",
      "Guruve",
      "Bindura",
      "Shamva",
      "Mt Darwin",
      "Concession",
      "Mvurwi",
      "Glendale"
    ]);
    const searchType = async () => {
      if (selected_provider_type.value.length > 0) {
        let data = {
          my_params: selected_provider_type.value,
          first: first.value,
          last: items_per_page.value
        };
        await formStore.searchType(data).then((result) => {
          var _a, _b;
          providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
          number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
        });
      } else {
        let data = {
          first: 0,
          last: items_per_page.value
        };
        formStore.allProviders(data).then((result) => {
          var _a, _b;
          console.log("providers", result);
          providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
          number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
        });
      }
    };
    const searchProvince = async () => {
      if (selected_provinces.value.length > 0) {
        let data = {
          my_params: selected_provinces.value,
          first: first.value,
          last: items_per_page.value
        };
        await formStore.searchProvince(data).then((result) => {
          var _a, _b;
          providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
          number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
        });
      } else {
        let data = {
          first: 0,
          last: items_per_page.value
        };
        formStore.allProviders(data).then((result) => {
          var _a, _b;
          console.log("providers", result);
          providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
          number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
        });
      }
    };
    const searchText = async () => {
      if (text_to_search.value != null) {
        let data = {
          my_params: text_to_search.value,
          first: first.value,
          last: items_per_page.value
        };
        await formStore.searchName(data).then((result) => {
          var _a, _b;
          providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
          number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
        });
      } else {
        let data = {
          first: 0,
          last: items_per_page.value
        };
        formStore.allProviders(data).then((result) => {
          var _a, _b;
          console.log("providers", result);
          providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
          number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
        });
      }
    };
    const searchTown = async () => {
      if (selected_towns.value.length > 0) {
        let data = {
          my_params: selected_towns.value,
          first: first.value,
          last: items_per_page.value
        };
        await formStore.searchTown(data).then((result) => {
          var _a, _b;
          providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
          number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
        });
      } else {
        let data = {
          first: 0,
          last: items_per_page.value
        };
        formStore.allProviders(data).then((result) => {
          var _a, _b;
          console.log("providers", result);
          providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
          number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
        });
      }
    };
    const changeArray = async () => {
      let data = {
        first: first.value,
        last: items_per_page.value
      };
      formStore.allProviders(data).then((result) => {
        var _a, _b;
        providers2.value = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.profile;
        number_of_records.value = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.total;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonMenubar = __nuxt_component_0;
      const _component_MultiSelect = resolveComponent("MultiSelect");
      const _component_InputText = resolveComponent("InputText");
      const _component_Paginator = resolveComponent("Paginator");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonMenubar, null, null, _parent));
      _push(`<div class="surface-section px-4 py-8 md:px-6 lg:px-8"><div class="flex justify-content-between flex-wrap"><div class="flex align-items-center mb-4 md:mb-0"><div class="text-900 font-bold text-3xl">Service Providers</div><span class="p-badge p-component ml-3 bg-gray-200 text-gray-900 p-0 border-circle" data-pc-name="badge" data-pc-section="root">${ssrInterpolate(unref(number_of_records) ? unref(number_of_records) : 0)}</span></div><div></div></div><p class="text-600 text-xl">You can search through the service providers, and filters through using Name of provider, Province or Town/City.</p><div class="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator" aria-orientation="horizontal" data-pc-name="divider" data-pc-section="root" styleclass="w-full border-gray-200" style="${ssrRenderStyle({ "justify-content": "center" })}"></div><div class="grid grid-nogutter align-items-center">`);
      _push(ssrRenderComponent(_component_MultiSelect, {
        onChange: ($event) => searchType(),
        modelValue: unref(selected_provider_type),
        "onUpdate:modelValue": ($event) => isRef(selected_provider_type) ? selected_provider_type.value = $event : null,
        options: unref(provider_types),
        placeholder: "Select Provider Type",
        maxSelectedLabels: 3,
        class: "w-full md:w-20rem mr-2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_InputText, {
        onKeyup: ($event) => searchText(),
        modelValue: unref(text_to_search),
        "onUpdate:modelValue": ($event) => isRef(text_to_search) ? text_to_search.value = $event : null,
        class: "w-full md:w-20rem mr-2",
        placeholder: "Search with Provider Name"
      }, null, _parent));
      _push(ssrRenderComponent(_component_MultiSelect, {
        onChange: ($event) => searchProvince(),
        modelValue: unref(selected_provinces),
        "onUpdate:modelValue": ($event) => isRef(selected_provinces) ? selected_provinces.value = $event : null,
        options: unref(provinces),
        placeholder: "Select Province",
        maxSelectedLabels: 3,
        class: "w-full md:w-20rem mr-2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_MultiSelect, {
        onChange: ($event) => searchTown(),
        modelValue: unref(selected_towns),
        "onUpdate:modelValue": ($event) => isRef(selected_towns) ? selected_towns.value = $event : null,
        options: unref(towns),
        placeholder: "Select Town",
        maxSelectedLabels: 3,
        class: "w-full md:w-20rem mr-2"
      }, null, _parent));
      _push(`<div class="col-12 mt-3"><div class="grid -mt-3 -ml-3 -mr-3 align-items-center justify-content-center lg:justify-content-start"><!--[-->`);
      ssrRenderList(unref(providers2), (provider) => {
        _push(`<div class="xs:col-12 sm:col-6 lg:col-3 p-0"><div class="surface-card m-3 border-round shadow-2"><div class="flex flex-column w-full p-4"><span class="text-900 font-medium text-xl border-200 pb-2" style="${ssrRenderStyle({ "border-bottom": "1px solid" })}">${ssrInterpolate(provider == null ? void 0 : provider.name)}</span><span class="text-600 border-200 pb-2 pt-2" style="${ssrRenderStyle({ "border-bottom": "1px solid" })}"><i class="pi pi-fw pi-briefcase mr-2 text-2xl"></i>${ssrInterpolate(provider == null ? void 0 : provider.type)}</span><span class="text-600 border-200 pb-2 pt-2" style="${ssrRenderStyle({ "border-bottom": "1px solid" })}"><i class="pi pi-fw pi-home mr-2 text-2xl"></i>${ssrInterpolate(provider == null ? void 0 : provider.address)}</span><span class="text-600 border-200 pb-2 pt-2" style="${ssrRenderStyle({ "border-bottom": "1px solid" })}"><i class="pi pi-fw pi-phone mr-2 text-2xl"></i>${ssrInterpolate(provider == null ? void 0 : provider.contact)}</span><span class="text-600 border-200 pb-2 pt-2" style="${ssrRenderStyle({ "border-bottom": "1px solid" })}"><i class="pi pi-fw pi-building mr-2 text-2xl"></i>${ssrInterpolate(provider == null ? void 0 : provider.town)}</span><span class="text-600 border-200 pb-2 pt-2" style="${ssrRenderStyle({ "border-bottom": "1px solid" })}"><i class="pi pi-fw pi-map-marker mr-2 text-2xl"></i>${ssrInterpolate(provider == null ? void 0 : provider.province)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
      if (unref(number_of_records) >= 861) {
        _push(ssrRenderComponent(_component_Paginator, {
          onPage: ($event) => changeArray(),
          first: unref(first),
          "onUpdate:first": ($event) => isRef(first) ? first.value = $event : null,
          v: "",
          rows: unref(items_per_page),
          totalRecords: unref(number_of_records) ? unref(number_of_records) : 0
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/providers.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0$1;
  const _component_FormsProviders = _sfc_main$1;
  _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_FormsProviders, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_FormsProviders)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/providers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const providers = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { providers as default };
//# sourceMappingURL=providers-AJo3vTsQ.mjs.map
