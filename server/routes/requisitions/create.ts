import { prisma } from "~~/prisma/db";
import {sendMovementEmail} from "~~/helpers/emails"
import { sendToApproverEmail } from "~~/helpers/emails";

export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{originator_id,approver_id,over_budget,budget_id,address_id,comments,routing_id,total,due_date,supplier_id,attachments,requisition_lines}} = await readBody(event);
    try {

        const generateUniqueString = async () =>  {
            const prefix = "REQ";
            const uniqueTimestamp = Date.now().toString().substr(-6);
            const uniqueString:string = prefix + uniqueTimestamp;
            return uniqueString;
          }
        const required_forum_approvers = await prisma.user.count({
            where: {
                forum_profile: {
                    type: "FORUM"
                }
            }
        })

        const originator = await prisma.user.findUnique({
            where: {
                id: originator_id
            }
        })

        const approver = await prisma.user.findUnique({
            where: {
                id: approver_id
            }
        })
        
        let requisition_number = await generateUniqueString()

        const requisition = await prisma.requisition.create({
            data: {
                originator_id,
                address_id,
                over_budget,
                requisition_number: requisition_number,
                attachments,
                approver_id,
                routing_id,
                current_forum_approvers: 0,
                required_forum_approvers,
                total,
                due_date,
                
                comments: {
                    create: {
                        user_id: originator_id,
                        comment: comments ? comments : "Requesting Approval"
                    }
                },
                lines: {
                    createMany: {

                        data: [
                            ...requisition_lines
                        ]
                    }
                }
            }
        });
        
        const decreaseTotal = await prisma.budget.update({
            where: {
                id: budget_id
            },
            data: {
                remainingBudget: {
                    decrement: total
                }
             }
        })
        
        sendMovementEmail(originator.email,requisition_number,total,approver.name, approver.surname)
        sendToApproverEmail(approver.email,requisition_number,total,originator.name,originator.surname)

        response['route'] = requisition
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});