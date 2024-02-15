import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    const { data: {first,last}} = await readBody(event);
    let response = {}
    try {
    const count_providers = await prisma.providers.count()
 
    const createManyProviders = await prisma.providers.findMany({
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