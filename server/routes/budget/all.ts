import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    const response = {};
    try {
       

        const budget = await prisma.budget.findMany({});
  
        response['centers'] = budget
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});