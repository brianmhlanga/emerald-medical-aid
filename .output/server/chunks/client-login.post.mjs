import { d as defineEventHandler, r as readBody, s as setCookie } from './nitro/node-server.mjs';
import { c as createJwtToken } from './index.mjs';
import { p as prisma } from './db.mjs';
import bcrypt from 'bcrypt';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'jsonwebtoken';
import 'dotenv';
import '@prisma/client';

const clientLogin_post = defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  console.log("email and password", email, password);
  if (!email) {
    return {
      message: "Email must be provided",
      success: false
    };
  }
  const applicant = await prisma.applicant.findFirst({
    where: {
      email
      //   AND: {
      //    account_status: 'ACTIVE'
      //   }
    }
  });
  const response = {};
  if (applicant) {
    console.log("applicant password", applicant);
    const match = await bcrypt.compare(password, applicant.password);
    if (match) {
      const token = await createJwtToken();
      setCookie(event, "token", token);
      const [applicantData, employeeData] = await prisma.$transaction([
        prisma.applicant.update({
          where: {
            email
          },
          data: {
            current_logged_in_at: /* @__PURE__ */ new Date()
          }
        }),
        prisma.applicant.findUnique({
          where: {
            email
          }
        })
      ]);
      console.log({ applicant });
      response["applicant"] = applicantData;
      response["success"] = true;
      console.log("this is my user data and permissions", { applicant });
      let filteredApplicantData = {
        id: applicantData.id,
        first_name: applicantData.first_name,
        last_name: applicantData.last_name,
        email: applicantData.email,
        profile: applicantData.profile
      };
      setCookie(event, "user", JSON.stringify(filteredApplicantData));
      return response;
    } else {
      response["message"] = `The applicant with email ${email} does not exist, is inactive or the password does not match`;
      response["success"] = false;
      return response;
    }
  } else {
    response["message"] = `The applicant with email ${email} does not exist, is inactive or the password does not match`;
    response["success"] = false;
    return response;
  }
});

export { clientLogin_post as default };
//# sourceMappingURL=client-login.post.mjs.map
