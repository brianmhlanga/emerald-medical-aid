import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
        const suppliers = await prisma.supplier.findMany({
          where: {
            commodity_codes: {
                some: {
                    id
                }
            }
          }
        });
        response['suppliers'] = suppliers
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});