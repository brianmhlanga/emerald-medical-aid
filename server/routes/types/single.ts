import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {

        const type = await prisma.requisitionType.findUnique({
            where: {
                id
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