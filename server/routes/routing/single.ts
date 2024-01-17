import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{id}} = await readBody(event);
    try {

        const single = await prisma.routing.findMany({
          where: {
             owner_id: id,
          },
          include: {
            routing_owner: true,
            members: {
              include:{
                approver: true
              }
            }
            
          }
        });
        response['single'] = single
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});