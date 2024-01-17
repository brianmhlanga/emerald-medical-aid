import { prisma } from "~~/prisma/db";
import { sendMovementEmail, sendToApproverEmail ,sendToPastApprovers} from "~~/helpers/emails";

export default defineEventHandler(async (event) => {
  const response = {};

  try {
    const {
      data: {
        id,
        originator_id,
        approver_id,
        over_budget,
        budget_id,
        address_id,
        comments,
        routing_id,
        total,
        due_date,
        supplier_id,
        attachments,
        requisition_lines,
      },
    } = await readBody(event);

    // Generate a unique requisition number
    const generateUniqueString = async () => {
      const prefix = "REQ";
      const uniqueTimestamp = Date.now().toString().substr(-6);
      const uniqueString = prefix + uniqueTimestamp;
      return uniqueString;
    };

    // Count the number of forum approvers
    const required_forum_approvers = await prisma.user.count({
      where: {
        forum_profile: {
          type: "FORUM",
        },
      },
    });

    // Update requisition details
   let old_requisition = await prisma.requisition.findUnique({
    where: {
        id: id
    },
    include: {
        originator: true,
        lines: true
    }
   })
   console.log("requisition linessssssssssssss",requisition_lines)
   let new_requisition = await prisma.requisition.create({
     data: {
        originator_id: old_requisition.originator_id,
        approver_id: old_requisition.approver_id,
        requisition_number: await generateUniqueString(),
        routing_id: old_requisition.routing_id,
        status: "DRAFT",
        history_id: old_requisition.id,
        address_id: old_requisition.address_id,
        over_budget,
        current_forum_approvers: 0,
        required_forum_approvers,
        lines: {
            createMany: {

                data: [
                    ...requisition_lines.map(({ id,non_conformance,requisition_id,general_ledger,commodity_code, ...rest }) => rest),
                ]
            }
        },
        attachments,
        total,
        due_date,
     }
   }).then(async()=>{

    let archived_requisition = await prisma.requisition.update({
        where:{
            id: id
        },
        data: {
            status: "HISTORY"
        },
        include: {
          approver_tracking: true
        }
    })
    sendToPastApprovers(archived_requisition.requisition_number,archived_requisition.approver_tracking)
    response['archived'] = archived_requisition

   }) 



    response['created'] = new_requisition;
    response['success'] = true;
  } catch (error) {
    response['success'] = false;
    response['message'] = error.toString();
  }

  return response;
});
