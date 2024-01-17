import { prisma } from "~~/prisma/db";
import bcrypt from "bcrypt";
import argon2 from "argon2";

export default defineEventHandler(async (event)=>{
    const response:any = {};
    const { data: {first_name,last_name,date_of_birth,country,school,grade,email,phone,password}} = await readBody(event);
     
    const isAlreadyRegistered = await prisma.student.findUnique({
        where: {
            email: email
        }
    });

    if(isAlreadyRegistered){
        return {
            message: `Student with ${email} already exists.`,
            success: false
        }
    }
   

    
    try {
        
        let password2 = await argon2.hash(password);

        if(argon2.needsRehash(password2)) password2 = await argon2.hash(password2);
        const createStudent = await prisma.student.create({
            data: {
                first_name,
                last_name,
                date_of_birth,
                school,
                grade,
                email,
                nationality: country,
                phone,
                profile: "STUDENT",
                password: password2,
            }
        });

        response['registred'] = createStudent
        response['success'] = true


  
      } catch (error:any) {

        response['success'] = false
        response['message'] = error.toString()
      };
    
   
    return response;
});