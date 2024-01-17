import { prisma } from "~~/prisma/db";
import { sendMovementEmail, finalNotification,sendToApproverEmail } from "~/helpers/emails";
export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
      
          let current_requisition = await prisma.requisition.findUnique({
            where: {
              id: id
            },
            include: {
              originator: {
                include: {
                  my_approvals: true
                }
              }
            }
          })

          let current_routing = await prisma.routing.findUnique({
            where: {
               owner_id: current_requisition.originator_id
            },
            include: {
              members: {
                include : {
                  approver:true
                }
              },
              routing_owner: true
            }
          })
  
          if (current_routing.members[0].user_id === current_requisition.current_approver_id) {


            let approvals = await prisma.requisition.update({
              where: {
               id: id
              },
              data: {
                  status: "MOVING",
                  current_approver_id: current_routing.members[1].user_id,
              }
            })
            
    
            response['approvals'] = approvals
            response['success'] = true
            sendMovementEmail(current_routing.routing_owner.email,approvals.requisition_number,approvals.cheque_amount,current_routing.members[1].approver.name,current_routing.members[1].approver.surname)
            sendToApproverEmail(current_routing.members[1].approver.email,approvals.requisition_number,approvals.cheque_amount,current_routing.routing_owner.name,current_routing.routing_owner.surname)
                
            } else if (current_routing.members[1].user_id === current_requisition.current_approver_id){

              let approvals = await prisma.requisition.update({
                where: {
                 id: id
                },
                data: {
                    status: "APPROVED_PENDING_PAYMENT",
                    current_approver_id: current_routing.members[2].user_id,
                }
              })
              
      
              response['approvals'] = approvals
              response['success'] = true
              sendMovementEmail(current_routing.routing_owner.email,approvals.requisition_number,approvals.cheque_amount,current_routing.members[2].approver.name,current_routing.members[2].approver.surname)
            sendToApproverEmail(current_routing.members[2].approver.email,approvals.requisition_number,approvals.cheque_amount,current_routing.routing_owner.name,current_routing.routing_owner.surname)
              
            } else{

              let approvals = await prisma.requisition.update({
                where: {
                 id: id
                },
                data: {
                    status: "PAID",
                    current_approver_id: current_routing.members[2].user_id,
                }
              })
              
      
              response['approvals'] = approvals
              response['success'] = true
              finalNotification(current_routing.routing_owner.email,approvals.requisition_number,approvals.cheque_amount)
             }
          
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});