import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {id} = await readBody(event);
    try {
        const pending = await prisma.requisition.findUnique({
            where: {
                id
            },
            include: {
                lines: {
                    include:{
                        general_ledger: true,
                        commodity_code: true,
                    }
                },
                comments: {
                    include: {
                        user: true
                    }
                },
                history: true,
                originator: {
                    include: {
                        normal_profile: {
                            include :{
                                 cost_center: {
                                    include: {
                                        budget: true
                                    }
                                 }
                            }
                        }
                    }
                },
                routing: {
                    include: {
                        type: true
                    }
                },
            }
        });
  
        response['pending'] = pending
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});