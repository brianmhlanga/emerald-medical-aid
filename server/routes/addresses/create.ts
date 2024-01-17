import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{code,description,address_number}} = await readBody(event);
    try {
        const address = await prisma.address.create({
            data: {
                code,
                description,
                address_number
            }
        });
  
        response['route'] = address
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});