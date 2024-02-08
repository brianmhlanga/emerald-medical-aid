import { d as defineEventHandler, r as readBody, g as getCookie, s as setCookie } from './nitro/node-server.mjs';
import { a as checkJwtToken, c as createJwtToken } from './index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'jsonwebtoken';
import 'dotenv';

const clientMe_post = defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  console.log("Node production");
  const isValid = await checkJwtToken(token).then((data) => {
    const cookie = getCookie(event, "applicant") || "{}";
    const applicant = JSON.parse(cookie);
    const res = {
      user: applicant,
      success: data.success
    };
    return res;
  });
  if (!isValid.success) {
    const token2 = await createJwtToken();
    setCookie(event, "token", token2);
  }
  return isValid;
});

export { clientMe_post as default };
//# sourceMappingURL=client-me.post.mjs.map
