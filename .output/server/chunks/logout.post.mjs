import { d as defineEventHandler, s as setCookie } from './nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const logout_post = defineEventHandler(async (event) => {
  setCookie(event, "user", "");
  setCookie(event, "token", "");
  return {
    success: true
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
