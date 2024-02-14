import { d as defineEventHandler } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const all = defineEventHandler(async (event) => {
  const response = {};
  try {
    const users = await prisma.user.findMany({});
    response["users"] = users;
    response["success"] = true;
  } catch (error) {
    response["success"] = false;
    response["message"] = error.toString();
  }
  return response;
});

export { all as default };
//# sourceMappingURL=all.mjs.map
