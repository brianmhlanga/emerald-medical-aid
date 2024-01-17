import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{supplier_code,supplier_name,short_name,postal_code,selectedCommodities}} = await readBody(event);
    try {
       
        console.log("cccccccccccccccccccccccccccccccccc",selectedCommodities)
        const supplier = await prisma.supplier.create({
            data: {
                supplier_code,
                short_name,
                supplier_name,
                postal_code,
                commodity_codes: {
                  connect: [
                    ...selectedCommodities.map((id) => {
                      return {
                        id
                      }
                    })
                  ]
                }
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