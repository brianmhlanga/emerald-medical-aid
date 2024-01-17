import { prisma } from "~~/prisma/db";
export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
          
          let approvals = await prisma.requisition.findMany({
            where: {
              current_approver_id: id,
              status: {
                in: ["MOVING", "APPROVED_PENDING_PAYMENT"]
              }
            },
            include: {
                originator: true
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