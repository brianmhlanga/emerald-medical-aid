import{a2 as a,a3 as n,q as r}from"./entry.jXEUbPG3.js";import{u}from"./cookie.-CkHEcQo.js";const _=a(async(c,f)=>{let o,t;const i=u("token").value||"",{data:e,success:s}=([o,t]=n(()=>$fetch("/auth/verify-token",{method:"POST",body:JSON.stringify({token:i})})),o=await o,t(),o);if(console.log(s,e==null?void 0:e.is_valid),!s||(e==null?void 0:e.is_valid)===!1)return r("/login")});export{_ as default};
