import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    const { data: {my_params,first,last}} = await readBody(event);
    let response = {}
    try {
    const count_providers = await prisma.providers.count({
        where: {
            name: {
             contains: my_params
            }
         },
    })
 
    const createManyProviders = await prisma.providers.findMany({
        where: {
           name: {
            contains: my_params
           }
        },
        skip: first,
        take: 12
    })

    response['profile'] = createManyProviders
    response['total'] = count_providers
     response['success'] = true
    } catch(error) {
 
       console.log(error)
       response['success'] = false
       response['message'] = error.toString()
 
   }
 
    return response
 
   
 });  
