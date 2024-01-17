import { prisma } from "~~/prisma/db";
import { sendMovementEmail, sendToApproverEmail } from "~~/helpers/emails";

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
   let updated_requisition = await prisma.requisition.update({
      data: {
        address_id,
        over_budget,
        attachments,
        total,
        due_date,
      },
      where: {
        id: id,
      },
    });

    // Update or create requisition lines
    for (const updatedObject of requisition_lines) {
      const updateData = { ...updatedObject };
      delete updateData.commodity_code;
      delete updateData.general_ledger;

      if (updateData.id != null) {
        await prisma.requisitionLine.update({
          where: { id: updateData.id },
          data: updateData,
        });
      } else {
        await prisma.requisitionLine.create({
          data: updateData,
        });
      }
    }

    // Fetch all lines for the response
    const all_lines = await prisma.requisitionLine.findMany({
      where: {
        requisition_id: id,
      },
    });

    response['updated_requisition'] = updated_requisition;
    response['updated_lines'] = all_lines
    response['success'] = true;
  } catch (error) {
    response['success'] = false;
    response['message'] = error.toString();
  }

  return response;
});
