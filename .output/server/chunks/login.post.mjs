import { d as defineEventHandler, r as readBody, s as setCookie } from './nitro/node-server.mjs';
import { c as createAppJwtToken } from './jwt.mjs';
import { p as prisma } from './db.mjs';
import argon2 from 'argon2';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'jose';
import '@prisma/client';

const login_post = defineEventHandler(async (event) => {
  const { data: { email, password } } = await readBody(event);
  const JWT_APP_TOKEN_SECRET = process.env.NUXT_PUBLIC_JWT_APP_TOKEN_SECRET;
  if (!email) {
    return {
      message: "Email must be provided",
      success: false
    };
  }
  const user = await prisma.student.findFirst({
    where: {
      email
      //   AND: {
      //    account_status: 'ACTIVE'
      //   }
    }
  });
  const response = {};
  if (user) {
    const match = await argon2.verify(user.password, password);
    if (match) {
      const token = await createAppJwtToken(JWT_APP_TOKEN_SECRET);
      setCookie(event, "token", token);
      const updateUser = await prisma.student.update({
        where: {
          email
        },
        data: {
          email
        }
      });
      response["user"] = updateUser;
      response["success"] = true;
      delete updateUser.password;
      setCookie(event, "user", JSON.stringify(updateUser));
      return response;
    } else {
      response["message"] = `The user with email ${email} does not exist, is inactive or the password does not match`;
      response["success"] = false;
      return response;
    }
  } else {
    response["message"] = `The user with email ${email} does not exist, is inactive or the password does not match`;
    response["success"] = false;
    return response;
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
