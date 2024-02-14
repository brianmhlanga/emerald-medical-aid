import { defineComponent, useCssVars, getCurrentInstance, computed, openBlock, createElementBlock, unref, normalizeClass, normalizeStyle, createElementVNode, mergeProps, createVNode, renderSlot } from 'vue';
import { $ as $e, m as Pe } from '../server.mjs';
import h from './check-_5Up9njX-mWVUaQSO.mjs';
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

const _ = ["for", "aria-checked"], q = ["id", "checked", "disabled", "name"], D = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "MazCheckbox",
  props: {
    style: {
      type: [String, Array, Object],
      default: void 0
    },
    class: {
      type: [String, Array, Object],
      default: void 0
    },
    modelValue: {
      type: [Boolean, Array],
      default: void 0
    },
    id: { type: String, default: void 0 },
    color: {
      type: String,
      default: "primary"
    },
    value: { type: [String, Number, Boolean], default: void 0 },
    name: { type: String, default: "m-checkbox" },
    size: { type: String, default: "md" },
    disabled: { type: Boolean, default: false }
  },
  emits: [
    /* emitted when value change */
    "update:model-value",
    /* emited when value change */
    "change"
  ],
  setup(o, { emit: p }) {
    useCssVars((a) => ({
      "3a21591b": x.value,
      "4953c77d": h$1.value,
      d5250ce8: k.value,
      "105d84cf": z.value
    }));
    const b = getCurrentInstance(), e = o, n = p, s = Pe({
      componentName: "MazCheckbox",
      instance: b,
      providedId: e.id
    }), d = computed(
      () => typeof e.value != "boolean" && Array.isArray(e.modelValue) ? e.modelValue.includes(e.value) : typeof e.modelValue == "boolean" ? e.modelValue : false
    ), h$1 = computed(() => {
      switch (e.size) {
        case "xl":
          return "2.25rem";
        case "lg":
          return "2rem";
        default:
          return "1.625rem";
        case "sm":
          return "1.425rem";
        case "xs":
          return "1.325rem";
        case "mini":
          return "1.2rem";
      }
    }), y = computed(() => {
      switch (e.size) {
        case "xl":
          return "maz-text-2xl";
        case "lg":
          return "maz-text-xl";
        default:
          return "maz-text-lg";
        case "sm":
          return "maz-text-base";
        case "xs":
          return "maz-text-sm";
        case "mini":
          return "maz-text-xs";
      }
    }), x = computed(() => `var(--maz-color-${e.color}-contrast)`), k = computed(() => `var(--maz-color-${e.color})`), z = computed(
      () => ["black", "transparent"].includes(e.color) ? "var(--maz-color-muted)" : `var(--maz-color-${e.color}-alpha)`
    );
    function V(a) {
      var _a;
      ["Space"].includes(a.code) && (a.preventDefault(), u((_a = e.value) != null ? _a : !e.modelValue));
    }
    function v(a) {
      return typeof a == "boolean" && (typeof e.modelValue == "boolean" || e.modelValue === void 0 || e.modelValue === null) ? !e.modelValue : Array.isArray(e.modelValue) && typeof a != "boolean" ? e.modelValue.includes(a) ? e.modelValue.filter((t) => t !== a) : [...e.modelValue, a] : [a];
    }
    function u(a) {
      const t = v(a);
      n("update:model-value", t), n("change", t);
    }
    return (a, t) => (openBlock(), createElementBlock("label", {
      for: unref(s),
      class: normalizeClass(["m-checkbox", [{ "--disabled": o.disabled }, e.class]]),
      tabindex: "0",
      style: normalizeStyle(o.style),
      role: "checkbox",
      "aria-checked": d.value,
      onKeydown: V
    }, [
      createElementVNode("input", mergeProps({
        id: unref(s),
        checked: d.value
      }, a.$attrs, {
        tabindex: "-1",
        disabled: o.disabled,
        name: o.name,
        type: "checkbox",
        onChange: t[0] || (t[0] = (r) => {
          var _a;
          var i;
          return u((_a = o.value) != null ? _a : (i = r == null ? void 0 : r.target) == null ? void 0 : i.checked);
        })
      }), null, 16, q),
      createElementVNode("span", null, [
        createVNode(unref(h), {
          class: normalizeClass(["check-icon", y.value])
        }, null, 8, ["class"])
      ]),
      renderSlot(a.$slots, "default", {}, void 0, true)
    ], 46, _));
  }
}), $ = /* @__PURE__ */ $e(D, [["__scopeId", "data-v-05f6558f"]]);

export { $ as default };
//# sourceMappingURL=MazCheckbox-7Ap-thkT-31aCrFGg.mjs.map
