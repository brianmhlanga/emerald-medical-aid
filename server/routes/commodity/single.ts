import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
        const commodity = await prisma.commodityCodes.findUnique({
          where: {
            id: id
          },
          include: {
          }
        });
        response['single'] = commodity
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});