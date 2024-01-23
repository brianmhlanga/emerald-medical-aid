import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    
    const { data: {first_name,last_name,title,date_of_birth,id_number,gender,membership_number,cell_number,physical_address,place_of_birth,marital_status,employer_name,employer_contact_number,occupation,department,ec_number,station_number,depandancy,package_type,package_details,previous_ailments,other_information,previous_society_name,previous_package_name,from_date,to_date,ministry,department_code,station_code,selected_application_type,card_type,section,subsection,employee_code_number,cd,payee_code,amount_deducted,from_date_ty,to_date_ty,policy_medical_aid_number}} = await readBody(event);
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
        depandancy: {
            createMany: {
                data: [
                    ...depandancy
                ]
            }
        },
        tyform: {
            create: {
                first_name,
                last_name,
                id_number,
                ministry,
                department_code,
                station_code,
                selected_application_type,
                card_type,
                section,
                subsection,
                employee_code_number,
                cd,
                payee_code,
                amount_deducted,
                from_date_ty,
                to_date_ty,
                policy_medical_aid_number
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

    
 
    response['profile'] = createProfile
    response['success'] = true
 
    } catch(error) {
 
       console.log(error)
       response['success'] = false
       response['message'] = error.toString()
 
   }
 
    return response
 
   
 });