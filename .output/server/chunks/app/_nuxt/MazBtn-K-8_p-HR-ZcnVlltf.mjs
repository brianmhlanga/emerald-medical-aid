import { defineComponent, defineAsyncComponent, useAttrs, useSlots, onBeforeMount, computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, createElementBlock, createCommentVNode, renderSlot, unref } from 'vue';
import { $ as $e } from '../server.mjs';
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

const P = /* @__PURE__ */ defineComponent({
  __name: "MazBtn",
  props: {
    variant: { default: "button" },
    size: { default: "md" },
    color: { default: "primary" },
    type: { default: "button" },
    rounded: { type: Boolean },
    noRounded: { type: Boolean },
    outline: { type: Boolean },
    pastel: { type: Boolean },
    block: { type: Boolean },
    noUnderline: { type: Boolean },
    noLeading: { type: Boolean },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    fab: { type: Boolean },
    icon: { default: void 0 },
    leftIcon: { default: void 0 },
    rightIcon: { default: void 0 },
    noPadding: { type: Boolean },
    noElevation: { type: Boolean },
    contentClass: { default: void 0 }
  },
  setup(g) {
    const B = defineAsyncComponent(() => import('./MazSpinner-Wnqtt3dQ-rBRBrJoR.mjs')), f = defineAsyncComponent(() => import('./MazIcon-C329_2BT-YlBCydOw.mjs')), { href: k, to: I } = useAttrs(), p = useSlots(), e = g;
    onBeforeMount(() => {
      e.icon && !e.fab && console.error('[maz-ui](MazBtn) the prop "icon" must be used only with "fab" props');
    });
    const v = computed(() => k ? "a" : I ? "router-link" : "button"), z = computed(
      () => e.pastel ? `--${e.color}-pastel` : e.outline ? `--${e.color}-outline` : `--${e.color}`
    ), m = computed(
      () => (e.loading || e.disabled) && v.value === "button"
    ), C = computed(() => m.value ? "--cursor-default" : "--cursor-pointer"), $ = computed(() => `--is-${e.variant}`), i = computed(() => e.loading && e.variant === "button"), b = computed(() => !!p["left-icon"] || e.leftIcon), y = computed(() => !!p["right-icon"] || e.rightIcon), M = computed(() => b.value || y.value), T = computed(() => e.fab && (e.icon || !!p.icon)), L = computed(() => v.value === "button" ? e.type : void 0);
    return (o, U) => (openBlock(), createBlock(resolveDynamicComponent(v.value), {
      disabled: m.value,
      class: normalizeClass(["m-btn", [
        `--${o.size}`,
        z.value,
        C.value,
        $.value,
        {
          "--block": o.block,
          "--no-underline": o.noUnderline,
          "--no-leading": o.noLeading,
          "--fab": o.fab,
          "--loading": o.loading,
          "--disabled": m.value,
          "--icon": M.value,
          "--rounded": o.rounded,
          "--no-rounded": o.noRounded,
          "--no-padding": o.noPadding,
          "--no-elevation": o.noElevation
        }
      ]]),
      type: L.value
    }, {
      default: withCtx(() => [
        b.value ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: normalizeClass(["m-btn__icon-left maz-flex maz-flex-center", { "maz-invisible": i.value }])
          },
          [
            createCommentVNode(`
        @slot left-icon - The icon to display on the left of the button
      `),
            renderSlot(o.$slots, "left-icon", {}, () => [
              typeof o.leftIcon == "string" ? (openBlock(), createBlock(unref(f), {
                key: 0,
                name: o.leftIcon
              }, null, 8, ["name"])) : o.leftIcon ? (openBlock(), createBlock(resolveDynamicComponent(o.leftIcon), { key: 1 })) : createCommentVNode("v-if", true)
            ], true)
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        T.value ? (openBlock(), createElementBlock(
          "div",
          {
            key: 1,
            class: normalizeClass(["m-btn__icon", { "maz-invisible": i.value }])
          },
          [
            createCommentVNode(`
        @slot icon - The icon to display on the fab button
      `),
            renderSlot(o.$slots, "icon", {}, () => [
              typeof o.icon == "string" ? (openBlock(), createBlock(unref(f), {
                key: 0,
                name: o.icon
              }, null, 8, ["name"])) : o.icon ? (openBlock(), createBlock(resolveDynamicComponent(o.icon), { key: 1 })) : createCommentVNode("v-if", true)
            ], true)
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        o.$slots.default ? (openBlock(), createElementBlock(
          "span",
          {
            key: 2,
            class: normalizeClass([{ "maz-invisible": i.value }, o.contentClass])
          },
          [
            createCommentVNode(`
        @slot default - The content of the button
      `),
            renderSlot(o.$slots, "default", {}, void 0, true)
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        y.value ? (openBlock(), createElementBlock(
          "div",
          {
            key: 3,
            class: normalizeClass(["m-btn__icon-right", { "maz-invisible": i.value }])
          },
          [
            createCommentVNode(`
        @slot right-icon - The icon to display on the right of the button
      `),
            renderSlot(o.$slots, "right-icon", {}, () => [
              typeof o.rightIcon == "string" ? (openBlock(), createBlock(unref(f), {
                key: 0,
                name: o.rightIcon
              }, null, 8, ["name"])) : o.rightIcon ? (openBlock(), createBlock(resolveDynamicComponent(o.rightIcon), { key: 1 })) : createCommentVNode("v-if", true)
            ], true)
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        i.value ? (openBlock(), createBlock(unref(B), {
          key: 4,
          class: "m-btn-loader",
          size: "2em",
          color: o.color
        }, null, 8, ["color"])) : createCommentVNode("v-if", true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["disabled", "class", "type"]));
  }
}), j = /* @__PURE__ */ $e(P, [["__scopeId", "data-v-0caaaef5"]]);

export { j as default };
//# sourceMappingURL=MazBtn-K-8_p-HR-ZcnVlltf.mjs.map
