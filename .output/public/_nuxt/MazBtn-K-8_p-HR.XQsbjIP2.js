import{ar as A,d as L,as as x,at as M,ag as R,c as a,t as n,E as l,A as w,P as s,K as t,G as d,au as u,a4 as c,v as r,av as g,aw as h}from"./entry.0bv1-YRj.js";const D=L({__name:"MazBtn",props:{variant:{default:"button"},size:{default:"md"},color:{default:"primary"},type:{default:"button"},rounded:{type:Boolean},noRounded:{type:Boolean},outline:{type:Boolean},pastel:{type:Boolean},block:{type:Boolean},noUnderline:{type:Boolean},noLeading:{type:Boolean},loading:{type:Boolean},disabled:{type:Boolean},fab:{type:Boolean},icon:{default:void 0},leftIcon:{default:void 0},rightIcon:{default:void 0},noPadding:{type:Boolean},noElevation:{type:Boolean},contentClass:{default:void 0}},setup(_){const k=g(()=>h(()=>import("./MazSpinner-Wnqtt3dQ.aD_RLHew.js"),__vite__mapDeps([0,1,2,3]),import.meta.url)),f=g(()=>h(()=>import("./MazIcon-C329_2BT.5U9jrT1L.js"),__vite__mapDeps([4,1,2]),import.meta.url)),{href:B,to:I}=x(),v=M(),o=_;R(()=>{o.icon&&!o.fab&&console.error('[maz-ui](MazBtn) the prop "icon" must be used only with "fab" props')});const p=a(()=>B?"a":I?"router-link":"button"),z=a(()=>o.pastel?`--${o.color}-pastel`:o.outline?`--${o.color}-outline`:`--${o.color}`),m=a(()=>(o.loading||o.disabled)&&p.value==="button"),$=a(()=>m.value?"--cursor-default":"--cursor-pointer"),C=a(()=>`--is-${o.variant}`),i=a(()=>o.loading&&o.variant==="button"),y=a(()=>!!v["left-icon"]||o.leftIcon),b=a(()=>!!v["right-icon"]||o.rightIcon),E=a(()=>y.value||b.value),P=a(()=>o.fab&&(o.icon||!!v.icon)),T=a(()=>p.value==="button"?o.type:void 0);return(e,U)=>(n(),l(u(p.value),{disabled:m.value,class:s(["m-btn",[`--${e.size}`,z.value,$.value,C.value,{"--block":e.block,"--no-underline":e.noUnderline,"--no-leading":e.noLeading,"--fab":e.fab,"--loading":e.loading,"--disabled":m.value,"--icon":E.value,"--rounded":e.rounded,"--no-rounded":e.noRounded,"--no-padding":e.noPadding,"--no-elevation":e.noElevation}]]),type:T.value},{default:w(()=>[y.value?(n(),r("div",{key:0,class:s(["m-btn__icon-left maz-flex maz-flex-center",{"maz-invisible":i.value}])},[t(`
        @slot left-icon - The icon to display on the left of the button
      `),c(e.$slots,"left-icon",{},()=>[typeof e.leftIcon=="string"?(n(),l(d(f),{key:0,name:e.leftIcon},null,8,["name"])):e.leftIcon?(n(),l(u(e.leftIcon),{key:1})):t("v-if",!0)],!0)],2)):t("v-if",!0),P.value?(n(),r("div",{key:1,class:s(["m-btn__icon",{"maz-invisible":i.value}])},[t(`
        @slot icon - The icon to display on the fab button
      `),c(e.$slots,"icon",{},()=>[typeof e.icon=="string"?(n(),l(d(f),{key:0,name:e.icon},null,8,["name"])):e.icon?(n(),l(u(e.icon),{key:1})):t("v-if",!0)],!0)],2)):t("v-if",!0),e.$slots.default?(n(),r("span",{key:2,class:s([{"maz-invisible":i.value},e.contentClass])},[t(`
        @slot default - The content of the button
      `),c(e.$slots,"default",{},void 0,!0)],2)):t("v-if",!0),b.value?(n(),r("div",{key:3,class:s(["m-btn__icon-right",{"maz-invisible":i.value}])},[t(`
        @slot right-icon - The icon to display on the right of the button
      `),c(e.$slots,"right-icon",{},()=>[typeof e.rightIcon=="string"?(n(),l(d(f),{key:0,name:e.rightIcon},null,8,["name"])):e.rightIcon?(n(),l(u(e.rightIcon),{key:1})):t("v-if",!0)],!0)],2)):t("v-if",!0),i.value?(n(),l(d(k),{key:4,class:"m-btn-loader",size:"2em",color:e.color},null,8,["color"])):t("v-if",!0)]),_:3},8,["disabled","class","type"]))}}),O=A(D,[["__scopeId","data-v-0caaaef5"]]);export{O as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./MazSpinner-Wnqtt3dQ.aD_RLHew.js","./entry.0bv1-YRj.js","./entry.JHRACF5x.css","./MazSpinner-Wnqtt3dQ.G7IVoZYa.css","./MazIcon-C329_2BT.5U9jrT1L.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
