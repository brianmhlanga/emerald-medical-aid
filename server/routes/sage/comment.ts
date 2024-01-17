import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{user_id,comment,requisition_id}} = await readBody(event);
    try {
        const type = await prisma.comments.create({
            data: {
                user: {
                    connect: { id: user_id }
                  },
              comment,
              request: {
                connect: { id: requisition_id }
              }
            }
        });
  
        response['type'] = type
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});