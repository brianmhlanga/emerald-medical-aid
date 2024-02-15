import { prisma } from "~~/prisma/db";
import bcrypt from "bcrypt";
import argon2 from "argon2";
import { sendIndividualEmail } from "~/helpers/emails";

export default defineEventHandler(async (event)=>{

    const { data: {providers}} = await readBody(event);
     
    let response = {};


    try {

 
    const createManyProviders = await prisma.providers.createMany({
     
    data: [
        ...providers
    ]
     
    })

    response['profile'] = createManyProviders
     response['success'] = true
    } catch(error) {
 
       console.log(error)
       response['success'] = false
       response['message'] = error.toString()
 
   }
 
    return response
 
   
 });