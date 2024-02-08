import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const single = defineEventHandler(async (event) => {
  const response = {};
  const { id } = await readBody(event);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    response["user"] = user;
    response["success"] = true;
  } catch (error) {
    response["success"] = false;
    response["message"] = error.toString();
  }
  return response;
});

export { single as default };
//# sourceMappingURL=single.mjs.map
