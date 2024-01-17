import { createAppJwtToken } from "~/vendors/jwt";
import { prisma } from "~~/prisma/db";
import argon2 from "argon2";

export default defineEventHandler(async (event)=>{
   const {data: {email, password}} = await readBody(event);
   const JWT_APP_TOKEN_SECRET = process.env.NUXT_PUBLIC_JWT_APP_TOKEN_SECRET;
//test comment
   //Check if the user exists
   if (!email) {
      return {
        message: "Email must be provided",
        success: false
      };
    }
   const  user = await prisma.student.findFirst({
      where: {
         
           email: email,
         //   AND: {
         //    account_status: 'ACTIVE'
         //   }
         
       }
   });

   const response = {};

   if(user){
      //Check if the password hash matched
      const match = await argon2.verify(user.password, password);
      
      if(match){
         //Successfully login
         //Create a JWT token
         const token = await createAppJwtToken(JWT_APP_TOKEN_SECRET);
         setCookie(event, "token", token);

         //Store his last Login IP Address and time
         
         const updateUser = await prisma.student.update({
            where: {
               email
            }, 
            data: {
               email: email
            }
         }); 

         // const company_access = userData.company_access.at(0).access_list;

         // @ts-ignore
         // data ? data.map(item => item.name) : [],

         response['user'] = updateUser
         response['success'] = true
         //Store encrpted user daa in cookie
         delete updateUser.password;
         
         //Store user data in cookie
         setCookie(event, "user", JSON.stringify(updateUser));
         return response
      }else{
         response['message'] = `The user with email ${email} does not exist, is inactive or the password does not match`
         response['success'] = false
         return response
      }
   }else{
      //Disconnect Prisma
    
         response['message'] = `The user with email ${email} does not exist, is inactive or the password does not match`
         response['success'] = false
         return response
   }

});