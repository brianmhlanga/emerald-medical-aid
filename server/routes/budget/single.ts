import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
        const budget = await prisma.budget.findUnique({
          where: {
            cost_id: id
          }
        });
        response['budget'] = budget
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});