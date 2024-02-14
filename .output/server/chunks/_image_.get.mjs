import { d as defineEventHandler, c as getRouterParams } from './nitro/node-server.mjs';
import { readFileSync } from 'fs';
import path from 'path';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';

const _image__get = defineEventHandler(async (event) => {
  const { image } = getRouterParams(event);
  const url = `${path.join("uploads", image)}`;
  return readFileSync(url);
});

export { _image__get as default };
//# sourceMappingURL=_image_.get.mjs.map
