import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id,commodity_access} = await readBody(event);
    try {
        const commodity = await prisma.generalLedgerCode.findUnique({
          where: {
            id: id
          },
          include: {
            cost_center: {
                include: {
                    cost_center: {
                      where: {
                        code: {
                            in: commodity_access
                        }
                    }
                    }
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