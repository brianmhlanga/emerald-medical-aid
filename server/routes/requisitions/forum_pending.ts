import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    let {id} = await readBody(event)
    try {
        const pending = await prisma.requisition.findMany({
            where: {
                status: "FORUM"
            },
            include: {
                lines: true,
                forum_approvers: true,
                originator: true,
                routing: {
                    include: {
                        approvers: {
                            where: {
                                approver_id: id
                            }
                        }
                    }
                }
            }
        });
  
        response['pending'] = pending
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});