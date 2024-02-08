import { openBlock, createElementBlock, createElementVNode } from 'vue';

const n = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "1em",
  height: "1em",
  fill: "none",
  viewBox: "0 0 24 24"
}, r = /* @__PURE__ */ createElementVNode(
  "path",
  {
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1.5",
    d: "M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
  },
  null,
  -1
  /* HOISTED */
), s = [
  r
];
function c(l, i) {
  return openBlock(), createElementBlock("svg", n, [...s]);
}
const h = { render: c };

export { h as default, c as render };
//# sourceMappingURL=no-symbol-JnXtUaU--qOcw8l54.mjs.map
