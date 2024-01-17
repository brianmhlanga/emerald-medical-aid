import { prisma } from "~~/prisma/db";
export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
         console.log("ttttttttttttttttttttttttttttttttttttt",id)
          let single = await prisma.requisition.findUnique({
            where: {
              id: id
            },
            include: {
                originator: true,
                comments : {
                  include : {
                    user: true
                  }
                }
            },
            
          })
          
  
        response['single'] = single
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});