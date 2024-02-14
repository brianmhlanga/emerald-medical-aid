import { d as defineEventHandler } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const buyers = defineEventHandler(async (event) => {
  const response = {};
  try {
    const buyers = await prisma.buyer.findMany({
      include: {
        user: true
      }
    });
    response["buyers"] = buyers;
    response["success"] = true;
  } catch (error) {
    response["success"] = false;
    response["message"] = error.toString();
  }
  return response;
});

export { buyers as default };
//# sourceMappingURL=buyers.mjs.map
