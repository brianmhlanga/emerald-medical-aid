import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{tax_code,description,current_rate,previous_rate,basis,effective_date,sales_ledger_code,ap_ledger_code}} = await readBody(event);
    try {
       

        const taxes = await prisma.taxCode.create({
            data: {
                tax_code,
                description,
                current_rate,
                previous_rate,
                basis,
                effective_date,
                sales_ledger_code,
                ap_ledger_code
            }
        });
  
        response['route'] = taxes
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});