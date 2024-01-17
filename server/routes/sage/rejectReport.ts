import { prisma } from "~~/prisma/db";
import {rejectedNotification} from "~/helpers/emails";
export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
      
            let approvals = await prisma.requisition.update({
              where: {
               id: id
              },
              include: {
                originator: true,
                current_approver:true
              },
              data: {
                  status: "REJECTED",
              }
            })
            response['approvals'] = approvals
            response['success'] = true
            rejectedNotification(approvals.originator.email,approvals.requisition_number,approvals.cheque_amount,approvals.current_approver.name,approvals.current_approver.surname)
          
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});