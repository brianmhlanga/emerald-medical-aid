import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    
    try {
       

        const ledger = await prisma.generalLedgerCode.findMany({
            include: {
                cost_center: {
                  include: {
                    cost_center: true
                  }
                }
            }
        });
  
        response['ledgers'] = ledger
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});