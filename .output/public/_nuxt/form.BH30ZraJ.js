import{O as o}from"./entry.jXEUbPG3.js";import{a as r}from"./index.MpRcIrCH.js";const u=o("form",{state:()=>({}),getters:{},actions:{async submitIndividualForm(a){var e=JSON.stringify({data:a}),s={method:"post",url:"/emerald/individual",headers:{"Content-Type":"application/json"},data:e};return await r(s).then(function(t){return{data:t.data,success:!0}}).catch(function(t){return console.log(t),{success:!1}})},async submitCivilForm(a){var e=JSON.stringify({data:a}),s={method:"post",url:"/emerald/civil",headers:{"Content-Type":"application/json"},data:e};return await r(s).then(function(t){return{data:t.data,success:!0}}).catch(function(t){return console.log(t),{success:!1}})}}});export{u};