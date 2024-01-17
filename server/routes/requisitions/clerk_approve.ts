import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event)
    
    
    try {
        const pending = await prisma.requisition.update({
            where: {
                id: id
            },
            data: {
                is_checked: true,
                status: "MOVING"
            }
        })
  
        response['pending'] = pending
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});