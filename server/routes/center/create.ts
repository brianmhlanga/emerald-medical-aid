import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{center_code,description}} = await readBody(event);
    try {
       

        const center = await prisma.costCenter.create({
            data: {
                center_code,
                description
            }
        });
  
        response['route'] = center
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});