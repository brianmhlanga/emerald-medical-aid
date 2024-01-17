import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{company_name,address,bank_name,account_number}} = await readBody(event);
    try {
       
        
        const supplier = await prisma.companies.create({
            data: {
                company_name,
                address,
                bank_name,
                account_number,
            }
        });
  
        response['route'] = supplier
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});