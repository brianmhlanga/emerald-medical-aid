import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
   const response = {};
   const {data:{originator_id,over_budget, status,budget_id,address_id,comments,routing_id,total,due_date,supplier_id,attachments,requisition_lines}} = await readBody(event);
   try {

       const generateUniqueString = async () =>  {
           const prefix = "REQ";
           const uniqueTimestamp = Date.now().toString().substr(-6);
           const uniqueString:string = prefix + uniqueTimestamp;
           return uniqueString;
         }

       const originator = await prisma.user.findUnique({
           where: {
               id: originator_id
           }
       })    
       let requisition_number = await generateUniqueString()

       const requisition = await prisma.requisition.create({
           data: {
               originator_id,
               address_id,
               over_budget,
               requisition_number: requisition_number,
               attachments,
               routing_id,
               status: "DRAFT",
               total,
               due_date,
               comments: {
                   create: {
                       user_id: originator_id,
                       comment: comments ? comments : "Requesting Approval"
                   }
               },
               lines: {
                   createMany: {
                       data: [
                           ...requisition_lines
                       ]
                   }
               }
           }
       });

       response['route'] = requisition
       response['success'] = true
 
     } catch (error) {
       response['success'] = false
       response['message'] = error.toString()
     };
  
   return response;
});