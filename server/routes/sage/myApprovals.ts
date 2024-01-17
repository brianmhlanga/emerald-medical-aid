import { prisma } from "~~/prisma/db";
export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
          
          let approvals = await prisma.requisition.findMany({
            where: {
              originator_id: id
            },
            include: {
                current_approver: true
            }
          })
          
  
        response['approvals'] = approvals
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});