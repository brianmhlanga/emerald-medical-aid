import { d as defineEventHandler } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const all_approvers = defineEventHandler(async (event) => {
  const response = {};
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: [
          { profile: "HR_OFFICER" },
          { profile: "ADMIN" }
        ]
      }
    });
    response["users"] = users;
    response["success"] = true;
  } catch (error) {
    response["success"] = false;
    response["message"] = error.toString();
  }
  console.log("unu shkhk", response);
  return response;
});

export { all_approvers as default };
//# sourceMappingURL=all_approvers.mjs.map
