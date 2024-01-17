import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    const response = {};
    let {originator_id, approver_id} = await readBody(event)
    try {
        const requisitions = await prisma.requisition.findMany({
            where: {
              originator_id : originator_id
            },
            include: {
                lines: true,
                approver: true
               }
        });
  
        response['requisitions'] = requisitions
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});