import { type } from "os";
import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};

    try {

        const buyers = await prisma.buyer.findMany({
            include: {
                user: true
            }
        });
  
        response['buyers'] = buyers
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});