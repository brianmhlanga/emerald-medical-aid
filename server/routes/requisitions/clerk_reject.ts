import { prisma } from "~~/prisma/db";
import { sendToPastApprovers, rejectedNotification } from "~/helpers/emails";


export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event)
    
    
    try {
        const pending = await prisma.requisition.update({
            where: {
                id: id
            },
            data: {
                is_checked: false,
                status: "REJECTED"
            },
            include: {
                approver_tracking: true,
                originator: true
            }
        })
        sendToPastApprovers(pending.requisition_number,pending.approver_tracking)
        rejectedNotification(pending.originator.email,pending.requisition_number,pending.total,pending.originator.name,pending.originator.surname)
        response['pending'] = pending
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});