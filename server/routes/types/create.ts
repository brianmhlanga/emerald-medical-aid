import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{name,description}} = await readBody(event);
    try {
        const type = await prisma.requisitionType.create({
            data: {
                name,
                description
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