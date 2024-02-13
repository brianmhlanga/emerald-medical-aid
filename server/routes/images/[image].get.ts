import { readFileSync } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const { image } = getRouterParams(event);

    const url = `${ path.join("uploads", image) }`;
    return readFileSync(url);
});