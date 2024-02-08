import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import bcrypt from 'bcrypt';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const passwordChange_post = defineEventHandler(async (event) => {
  const { old_password, password, id } = await readBody(event);
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });
  const response = {};
  if (user) {
    const match = await bcrypt.compare(old_password, user.password);
    if (match) {
      const [userData, employeeData] = await prisma.$transaction([
        prisma.user.update({
          where: {
            id
          },
          data: {
            password: hash,
            salt
          }
        }),
        prisma.user.findUnique({
          where: {
            id
          }
        })
      ]);
      response["user"] = userData;
      response["employee"] = employeeData;
      response["success"] = true;
      console.log("this is mu user data");
      console.log({ userData });
      return response;
    } else {
      response["message"] = `The old password provided does not match`;
      response["success"] = false;
      return response;
    }
  } else {
    response["message"] = `The user does not exist, please log out and try again`;
    response["success"] = false;
    return response;
  }
});

export { passwordChange_post as default };
//# sourceMappingURL=passwordChange.post.mjs.map
