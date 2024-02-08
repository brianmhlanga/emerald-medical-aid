import { d as defineEventHandler } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const all_originators = defineEventHandler(async (event) => {
  const response = {};
  try {
    const users = await prisma.user.findMany({
      where: {
        profile: "HR_OFFICER"
      }
    });
    response["users"] = users;
    response["success"] = true;
  } catch (error) {
    response["success"] = false;
    response["message"] = error.toString();
  }
  console.log("resposne", response);
  return response;
});

export { all_originators as default };
//# sourceMappingURL=all_originators.mjs.map
