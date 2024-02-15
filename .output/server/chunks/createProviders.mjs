import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const createProviders = defineEventHandler(async (event) => {
  const { data: { providers } } = await readBody(event);
  let response = {};
  try {
    const createManyProviders = await prisma.providers.createMany({
      data: [
        ...providers
      ]
    });
    response["profile"] = createManyProviders;
    response["success"] = true;
  } catch (error) {
    console.log(error);
    response["success"] = false;
    response["message"] = error.toString();
  }
  return response;
});

export { createProviders as default };
//# sourceMappingURL=createProviders.mjs.map
