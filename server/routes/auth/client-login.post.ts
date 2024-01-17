import { createJwtToken } from "@/jwt/index";
import { prisma } from "~~/prisma/db";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event)=>{
   const {email, password} = await readBody(event);
   console.log("email and password", email, password);
//test comment
   //Check if the user exists
   if (!email) {
      return {
        message: "Email must be provided",
        success: false
      };
    }
   const  applicant = await prisma.applicant.findFirst({
      where: {
         
           email: email,
         //   AND: {
         //    account_status: 'ACTIVE'
         //   }
         
       }
   });

   const response = {};

   if(applicant){
      //Check if the password hash matched
      console.log("applicant password",applicant);
      const match = await bcrypt.compare(password, applicant.password);
      
      if(match){
         //Successfully login
         //Create a JWT token
         const token = await createJwtToken();

         setCookie(event, "token", token);

         //Store his last Login IP Address and time
         
         const [applicantData, employeeData]  = await prisma.$transaction([
            prisma.applicant.update({
               where: {
                  email: email
               },
               data: {
                  current_logged_in_at: new Date()
               }
            }),
            prisma.applicant.findUnique({
               where: {
                  email: email
               },
            })
          ])

         // const company_access = userData.company_access.at(0).access_list;
         console.log({applicant})
         // @ts-ignore
         // data ? data.map(item => item.name) : [],

         response['applicant'] = applicantData
         response['success'] = true
         console.log("this is my user data and permissions",{applicant})
         //Store encrpted user daa in cookie
         let filteredApplicantData = {
            id: applicantData.id,
            first_name: applicantData.first_name,
            last_name: applicantData.last_name,
            email: applicantData.email,
            profile: applicantData.profile,
          };
         // setCookie(event, "user", JSON.stringify(userData));
         setCookie(event, "user", JSON.stringify(filteredApplicantData));
         return response
      }else{
         response['message'] = `The applicant with email ${email} does not exist, is inactive or the password does not match`
         response['success'] = false
         return response
      }
   }else{
      //Disconnect Prisma
    
         response['message'] = `The applicant with email ${email} does not exist, is inactive or the password does not match`
         response['success'] = false
         return response
   }

});