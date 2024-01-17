import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    const response = {};
    
    const {data:{owner_id,approvers}} = await readBody(event);
    try {
        console.log("my vars",approvers)
        const convertArrayToObject =(arr) => {
          var result = [];
          
          for (var i = 0; i < arr.length; i++) {
            var obj = {
              user_id: arr[i],
              position: i + 1
            };
            result.push(obj);
          }
          
          return result;
        }
        const route = await prisma.routing.create({
            data: {
                owner_id: owner_id,
                members: {
                  createMany: {
                    data: await convertArrayToObject(approvers)
                  }
                }
            }
        });

        response['route'] = route
        response['success'] = true  
      } catch (error) {
        console.log(error)
        response['success'] = false
        response['message'] = error.toString()
      };
    return response;
});