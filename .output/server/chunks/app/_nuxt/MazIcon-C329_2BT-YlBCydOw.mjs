import { defineComponent, ref, computed, onMounted, watchEffect, openBlock, createElementBlock, Fragment, createCommentVNode, mergeProps, nextTick, inject } from 'vue';

function H(l, u) {
  const s = inject(l, u);
  if (!s)
    throw new TypeError(`[maz-ui](injectStrict) Could not resolve ${l}`);
  return s;
}
const I = ["innerHTML"], G = /* @__PURE__ */ defineComponent({
  __name: "MazIcon",
  props: {
    /** The source path of the SVG file - e.g: `/icons/home.svg` */
    src: { type: String, default: void 0 },
    /** The path of the folder where the SVG files are stored - e.g: `/icons` */
    path: { type: String, default: void 0 },
    /** The name of the SVG file - e.g: `home` */
    name: { type: String, default: void 0 },
    /** The size of the SVG file - e.g: `1em` */
    size: { type: String, default: void 0 },
    /** The title of the SVG file - e.g: `Home` */
    title: { type: String, default: void 0 },
    /** The function to transform the source of the SVG file - e.g: `(svg) => svg` */
    transformSource: {
      type: Function,
      default: (l) => l
    }
  },
  emits: ["loaded", "unloaded", "error"],
  setup(l, { emit: u }) {
    const s = {}, i = ref(), v = ref(), w = () => {
      try {
        return H("mazIconPath");
      } catch {
        return;
      }
    }, o = l, d = u, f = computed(() => {
      var _a;
      return (_a = o.path) != null ? _a : w();
    }), E = computed(() => o.src ? o.src : f.value ? `${f.value}/${o.name}.svg` : `/${o.name}.svg`);
    onMounted(() => {
      !o.name && !o.src && console.error('[maz-ui](MazIcon) you should provide "name" or "src" as prop');
    });
    const y = (e, n) => {
      const t = e.querySelectorAll("title");
      if (t.length > 0)
        t[0].textContent = n;
      else {
        const r = (void 0).createElementNS("http://www.w3.org/2000/svg", "title");
        r.textContent = n, e.append(r);
      }
    }, z = (e) => Object.keys(e).reduce((n, t) => (e[t] !== false && e[t] !== null && e[t] !== void 0 && (n[t] = e[t]), n), {}), M = (e) => {
      const n = {}, t = e.attributes;
      if (!t)
        return n;
      for (let r = t.length - 1; r >= 0; r--)
        n[t[r].name] = t[r].value;
      return n;
    }, T = (e) => {
      let n = e.cloneNode(true);
      return n = o.transformSource(e), o.title && y(n, o.title), e.innerHTML;
    }, x = async (e) => {
      s[e] || (s[e] = L(e));
      try {
        i.value = await s[e], await nextTick(), d("loaded", v.value);
      } catch (n) {
        i.value && (i.value = void 0, d("unloaded")), delete s[e], d("error", n);
      }
    }, L = (e) => new Promise((n, t) => {
      const r = new (void 0)();
      r.open("GET", e, true), r.addEventListener("load", () => {
        if (r.status >= 200 && r.status < 400)
          try {
            let c = new DOMParser().parseFromString(r.responseText, "text/xml").querySelectorAll("svg")[0];
            c ? (c = o.transformSource(c), n(c)) : t(new Error('Loaded file is not valid SVG"'));
          } catch (m) {
            t(m);
          }
        else
          t(new Error("Error loading SVG"));
      }), r.addEventListener("error", () => t()), r.send();
    });
    return watchEffect(() => x(E.value)), (e, n) => (openBlock(), createElementBlock(
      Fragment,
      null,
      [
        createCommentVNode(" eslint-disable vue/no-v-html "),
        createCommentVNode(" eslint-disable vue/html-self-closing "),
        i.value ? (openBlock(), createElementBlock("svg", mergeProps({
          key: 0,
          ref_key: "svgElem",
          ref: v,
          width: "1em",
          height: "1em"
        }, {
          ...M(i.value),
          ...z(e.$attrs)
        }, {
          style: `font-size: ${l.size}`,
          innerHTML: T(i.value)
        }), null, 16, I)) : createCommentVNode("v-if", true),
        createCommentVNode(" eslint-enable vue/no-v-html "),
        createCommentVNode(" eslint-enable vue/html-self-closing ")
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    ));
  }
});

export { G as default };
//# sourceMappingURL=MazIcon-C329_2BT-YlBCydOw.mjs.map
