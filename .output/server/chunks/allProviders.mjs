import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const allProviders = defineEventHandler(async (event) => {
  const { data: { first, last } } = await readBody(event);
  let response = {};
  try {
    const count_providers = await prisma.providers.count();
    const createManyProviders = await prisma.providers.findMany({
      skip: first,
      take: 12
    });
    response["profile"] = createManyProviders;
    response["total"] = count_providers;
    response["success"] = true;
  } catch (error) {
    console.log(error);
    response["success"] = false;
    response["message"] = error.toString();
  }
  return response;
});

export { allProviders as default };
//# sourceMappingURL=allProviders.mjs.map
