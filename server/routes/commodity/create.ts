import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{buyer_id,classs,cost_center_id,code,description,family}} = await readBody(event);
    try {
       

        const commodity = await prisma.commodityCodes.create({
            data: {
                cost_center_id,
                class: classs,
                code,
                description,
                family
            }
        });
  
        response['route'] = commodity
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});