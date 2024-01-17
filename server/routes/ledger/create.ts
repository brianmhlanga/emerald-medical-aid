import { prisma } from "~~/prisma/db";



export default defineEventHandler(async (event)=>{
    const response = {};
    const {data:{ledger_code,description,cost_center_id,balance,group,type,control,on_hold,index_1,index_2}} = await readBody(event);
    try {
       

        const center = await prisma.generalLedgerCode.create({
            data: {
                ledger_code,
                description,
                cost_center_id,
                balance,
                group,
                type,
                control,
                on_hold,
                index_1,
                index_2
            }
        });
  
        response['route'] = center
        response['success'] = true
  
      } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
      };
   
    return response;
});