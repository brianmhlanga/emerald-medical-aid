import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    const response = {};
    const {name,yearlyBudget,cost_id} = await readBody(event);
    try {
       
        
        const createBudget = await prisma.budget.create({
            data: {
                name, 
                yearlyBudget : parseFloat(yearlyBudget),
                cost_id: cost_id,
                remainingBudget: parseFloat(yearlyBudget)
            }
               
        });
  
        response['budget'] = createBudget
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});