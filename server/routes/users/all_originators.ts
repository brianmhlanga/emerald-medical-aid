import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};

    try {

        const users = await prisma.user.findMany({
            where: {
                profile: "HR_OFFICER"
            }
        });
  
        response['users'] = users
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
    console.log("resposne",response)
    return response;
});