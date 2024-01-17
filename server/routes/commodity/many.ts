import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
        const commodity = await prisma.commodityCodes.findMany({
          where: {
            cost_center_id: id
          },
          include: {
            cost_center: {
                include: {
                    cost_center: true
                }
            }
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