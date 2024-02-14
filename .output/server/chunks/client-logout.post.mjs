import { d as defineEventHandler, s as setCookie } from './nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const clientLogout_post = defineEventHandler(async (event) => {
  setCookie(event, "applicant", JSON.stringify({
    success: false
  }));
  setCookie(event, "system_user", JSON.stringify({
    success: false
  }));
  setCookie(event, "permissions", JSON.stringify({
    success: false
  }));
  setCookie(event, "token", JSON.stringify({
    success: false
  }));
  return {
    success: true
  };
});

export { clientLogout_post as default };
//# sourceMappingURL=client-logout.post.mjs.map
