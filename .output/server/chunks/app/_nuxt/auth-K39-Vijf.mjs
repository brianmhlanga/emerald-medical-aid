import { k as defineNuxtRouteMiddleware, l as executeAsync, b as navigateTo } from '../server.mjs';
import { u as useCookie } from './cookie-eUdDdNIn.mjs';
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

const auth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const token = useCookie("token").value || "";
  const { data, success } = ([__temp, __restore] = executeAsync(() => $fetch("/auth/verify-token", {
    method: "POST",
    body: JSON.stringify({
      token
    })
  })), __temp = await __temp, __restore(), __temp);
  console.log(success, data == null ? void 0 : data.is_valid);
  if (!success || (data == null ? void 0 : data.is_valid) === false)
    return navigateTo("/login");
});

export { auth as default };
//# sourceMappingURL=auth-K39-Vijf.mjs.map
