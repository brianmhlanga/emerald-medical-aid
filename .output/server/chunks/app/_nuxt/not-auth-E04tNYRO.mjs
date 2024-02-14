import { k as defineNuxtRouteMiddleware, l as executeAsync, b as navigateTo } from '../server.mjs';
import { u as useCookie } from './cookie-mXglfnjH.mjs';
import 'vue';
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

const notAuth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  console.log("inside not auth");
  const token = useCookie("token").value || "";
  console.log("tokkkkkkkkkkken", token);
  const { data, success } = ([__temp, __restore] = executeAsync(() => $fetch("/auth/verify-token", {
    method: "POST",
    body: JSON.stringify({
      token
    })
  })), __temp = await __temp, __restore(), __temp);
  console.log(data, success, "ndiro result");
  if (success && (data == null ? void 0 : data.is_valid) === true)
    return navigateTo("/");
});

export { notAuth as default };
//# sourceMappingURL=not-auth-E04tNYRO.mjs.map
