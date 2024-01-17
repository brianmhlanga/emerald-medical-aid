import { prisma } from "~~/prisma/db";
export default defineEventHandler(async (event) => {
  const response = {};
  const { originator_id } = await readBody(event);
  try {
    console.log("Originator ID:", originator_id);

    let approvedRequisitions = await prisma.requisition.count({
      where: {
        originator_id: originator_id,
        status:"APPROVED"
      },
    });


    response["approvedRequisitions"] = approvedRequisitions;
    response["success"] = true;
  } catch (error) {
    response["success"] = false;
    response['message'] = error.toString();
  }
  return response;
});
