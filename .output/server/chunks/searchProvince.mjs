import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const searchProvince = defineEventHandler(async (event) => {
  const { data: { my_params, first, last } } = await readBody(event);
  let response = {};
  try {
    const count_providers = await prisma.providers.count({
      where: {
        province: {
          in: my_params
        }
      }
    });
    const createManyProviders = await prisma.providers.findMany({
      where: {
        province: {
          in: my_params
        }
      },
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

export { searchProvince as default };
//# sourceMappingURL=searchProvince.mjs.map
