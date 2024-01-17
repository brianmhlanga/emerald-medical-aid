import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{buyer_id,classs,cost_center_id,code,description,family}} = await readBody(event);
    try {
        const commodity = await prisma.commodityCodes.findMany({
          include:{
            cost_center: true
          }
        });
  
        response['commodities'] = commodity
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});