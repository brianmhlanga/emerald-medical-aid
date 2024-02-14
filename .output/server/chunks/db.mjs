import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient({
  log: ["error"]
});

export { prisma as p };
//# sourceMappingURL=db.mjs.map
