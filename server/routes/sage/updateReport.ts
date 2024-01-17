import { prisma } from "~~/prisma/db";
import { sendMovementEmail, sendToApproverEmail } from "~/helpers/emails";
export default defineEventHandler(async (event)=>{
    const response = {};
    const {id,attachment,co} = await readBody(event);
    try {
        console.log("inside th update endpoint")
        const requisition = await prisma.requisition.update({
            where:{
                id
            },
            data:{
                attachments: attachment
            }
        });
  
        response['requisition'] = requisition
        response['success'] = true
        } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});