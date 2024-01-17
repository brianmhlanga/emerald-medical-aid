import { prisma } from "~~/prisma/db";
import { sendMovementEmail, sendToApproverEmail } from "~/helpers/emails";
export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{in_favour_of,address,cheque_number,date,cheque_amount,reason,cheque_on,info,originator_id}} = await readBody(event);
    try {
        const generateUniqueString = async () =>  {
            const prefix = "REQ";
            const uniqueTimestamp = Date.now().toString().substr(-6);
            const uniqueString:string = prefix + uniqueTimestamp;
            return uniqueString;
          }
          let approver = await prisma.routing.findUnique({
            where: {
              owner_id: originator_id
             
            },
            include: {
              members: {
                include:{
                  approver:true
                }
              },
              routing_owner:true
            }
          
          })
          console.log("simba ",approver.members[0].id)
        const requisition = await prisma.requisition.create({
            data: {
               in_favour_of,
               address,
               cheque_amount,
               cheque_number,
               reason,
               cheque_on,
               info,
               originator_id,
               current_approver_id: approver.members[0].user_id,
               requisition_number: await generateUniqueString()
            }
        });
  
        response['requisition'] = requisition
        response['success'] = true
        sendMovementEmail(approver.routing_owner.email,requisition.requisition_number,requisition.cheque_amount,approver.members[0].approver.name,approver.members[0].approver.surname)
        sendToApproverEmail(approver.members[0].approver.email,requisition.requisition_number,requisition.cheque_amount,approver.routing_owner.name,approver.routing_owner.surname)
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});