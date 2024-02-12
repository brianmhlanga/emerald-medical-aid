import { prisma } from "~~/prisma/db";
import bcrypt from "bcrypt";
import argon2 from "argon2";
import { sendIndividualEmail } from "~/helpers/emails";

export default defineEventHandler(async (event)=>{

    const { data: {first_name,last_name,title,date_of_birth,id_photos,id_number,gender,membership_number,cell_number,physical_address,place_of_birth,marital_status,employer_name,employer_contact_number,occupation,department,ec_number,station_number,depandancy,package_type,package_details,previous_ailments,other_information,previous_society_name,previous_package_name,from_date,to_date}} = await readBody(event);
     
    let response = {};


    try {

 
    const createProfile = await prisma.individual.create({
     
     data: {
        first_name,
        last_name,
        title,
        date_of_birth,
        id_number,
        gender,
        membership_number,
        cell_number,
        physical_address,
        place_of_birth,
        marital_status,
        employer_name,
        employer_contact_number,
        occupation,
        department,
        ec_number,
        station_number,
        id_photos,
        depandancy: {
            createMany: {
                data: [
                    ...depandancy
                ]
            }
        },
        package_type,
        package_details,
        previous_ailments,
        other_information,
        previous_society_name,
        previous_package_name,
        from_date,
        to_date,
        
     }
     
    })
    const createdProfile = await prisma.individual.findUnique({
        where: {
            id: createProfile.id
        },
        include: {
            depandancy: true
        }
    })
    response['profile'] = createProfile
     response['success'] = true
    await sendIndividualEmail(createdProfile)
    } catch(error) {
 
       console.log(error)
       response['success'] = false
       response['message'] = error.toString()
 
   }
 
    return response
 
   
 });