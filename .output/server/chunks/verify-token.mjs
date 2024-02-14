import { d as defineEventHandler, r as readBody, a as setResponseStatus } from './nitro/node-server.mjs';
import { a as checkAppJwtToken } from './jwt.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'jose';

const verifyToken = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { token } = body;
    const { NUXT_PUBLIC_JWT_APP_TOKEN_SECRET } = process.env;
    console.log("token", token);
    console.log("secret", NUXT_PUBLIC_JWT_APP_TOKEN_SECRET);
    const is_valid = await checkAppJwtToken(token, NUXT_PUBLIC_JWT_APP_TOKEN_SECRET).then(({ success }) => success);
    console.log("is_valid", is_valid);
    return {
      data: { is_valid },
      message: "",
      success: true
    };
  } catch (error) {
    console.error(error);
    setResponseStatus(event, 500);
    return {
      data: {},
      message: "A server error has occurred",
      success: false
    };
  }
});

export { verifyToken as default };
//# sourceMappingURL=verify-token.mjs.map
