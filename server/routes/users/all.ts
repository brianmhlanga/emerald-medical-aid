import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};

    try {

        const users = await prisma.user.findMany({
          
        });
  
        response['users'] = users
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});