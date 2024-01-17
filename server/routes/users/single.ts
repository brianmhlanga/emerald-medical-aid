import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
  
        response['user'] = user
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});