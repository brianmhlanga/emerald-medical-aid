import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { p as prisma } from './db.mjs';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@prisma/client';

const registerMailer_post = defineEventHandler(async (event) => {
  const response = {};
  const { first_name, last_name, role, phone, email, date_joined, is_active, employee_code, business_number, date_of_birth, gender, id_number, maiden_name, passport_number, spouse_name, status, password } = await readBody(event);
  const isAlreadyRegistered = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (isAlreadyRegistered) {
    return {
      message: `User with ${email} already exists.`,
      success: false
    };
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  try {
    const createUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        phone,
        email,
        role,
        date_joined,
        is_active,
        employee_code,
        business_number,
        date_of_birth,
        gender,
        id_number,
        password: hash,
        salt,
        current_logged_in_at: /* @__PURE__ */ new Date(),
        last_logged_in_at: /* @__PURE__ */ new Date()
      }
    });
    response["registred"] = createUser;
    response["success"] = true;
  } catch (error) {
    response["success"] = false;
    response["message"] = error.toString();
  }
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "apps@oacey.com",
        pass: "@lkm$][=-2022"
      }
    });
    let info = await transporter.sendMail({
      from: "<apps@oacey.com>",
      // sender address
      to: email,
      // list of receivers
      subject: `Registration Process Complete`,
      // Subject line
      text: `OACEY HCM Registration`,
      // plain text body
      html: `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
 
            <!--HEADER -->
             
                    <tbody><tr>
                        <td align="center">
                            <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                    <td align="center" valign="top" background="https://petalmafrica.com/assets/images/location/hoo.jpg" bgcolor="#66809b" style="background-size:cover; background-position:top;height=" 400""="">
                                        <table class="col-600" width="600" height="400" border="0" align="center" cellpadding="0" cellspacing="0">
             
                                            <tbody><tr>
                                                <td height="40"></td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 5px;">
                                                    OACEY<span style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 5px;">HCMS</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="font-family: 'Lato', sans-serif; font-size:15px; color:#ffffff; line-height:24px; font-weight: 300;">
                                                    The number one human resources solution.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="50"></td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
            <!-- END HEADERR -->
            <!-- START SHOWCASE -->
                    <tr>
                        <td align="center">
                            <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                                <tbody><tr>
                                    <td height="35"></td>
                                </tr>
             
                                <tr>
                                    <td align="center" style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#333;">Registration Process Complete</td>
                                </tr>
             
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td align="left" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                                    Dear ${first_name} ${last_name}<br><br>Your Oacey HCM Registration is complete, please await approval from the systems adminstrator<br><br>From<br><br>Oacey Systems
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; ">
                                <tbody><tr>
                                    <td height="10"></td>
                                </tr>
                                            <tr>
                                                <td height="30"></td>
                                            </tr>
                                        </tbody></table>
            `
      // html body
    });
    response["notification"] = info;
    response["success"] = true;
  } catch (error) {
    response["success"] = false;
    response["message"] = error.toString();
  }
  return response;
});

export { registerMailer_post as default };
//# sourceMappingURL=registerMailer.post.mjs.map
