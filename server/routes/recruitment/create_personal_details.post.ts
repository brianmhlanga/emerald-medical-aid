import { prisma } from "~~/prisma/db";
import bcrypt from "bcrypt";
import { date } from "maz-ui";



export default defineEventHandler(async (event)=>{
    const response = {};
    
    
    try {
        // firstname: firstname.value,
        //     lastname: lastname.value,
        //     password: password.value,
        //     address: address.value,
        //     email: email.value,
        //     phone: phone.value,
        //     personal_strength: personal_strength.value,
        //     technical_skills: technical_skills.value,
        //     selected_employment_status: selected_employment_status.value,
        //     selected_conviction: selected_conviction.value,
        //     selected_availability: selected_availability.value,
        //     selected_disability: selected_disability.value,
        //     province: province.value,
        //     date_of_birth: date_of_birth.value,
        //     selectedCountry: selectedCountry.value,
        //     selected_ethnicity: selected_ethnicity.value,
        //     city: city.value,
        //     id_number: id_number.value,
        //     expected_salary: expected_salary.value,
        //     selected_gender: selected_gender.value
       
        const {data:{ firstname,lastname,personal_strength,technical_skills,selected_employment_status,selected_conviction,selected_availability,selected_disability,selectedCountry,selected_ethnicity,selected_gender,portal_id,email,gender,nationality,id_number,current_logged_in_at,date_of_birth,phone_number,ethnic_background,province,city,availability,expected_salary,disability,employment_status,convictions,address,personal,technical,password} } = await readBody(event);
        console.log("mbilimbi",password)
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const createPersonalDetails = await prisma.applicant.create({
            data: {
                first_name: firstname,
                last_name: lastname,
                email: email,
                gender: selected_gender,      
                id_number: id_number,         
                phone: phone_number,             
                enthnicity: selected_ethnicity,         
                province: province,    
                city: city,            
                nationality: selectedCountry,     
                availability: selected_availability,        
                expected_salary: Number(expected_salary),   
                disability: selected_disability,           
                employment_status: selected_employment_status,   
                previous_convictions: selected_conviction, 
                date_of_birth: date_of_birth,  
                personal_strength: personal_strength,    
                technical_skills: technical_skills,   
                address: address,
                password: hash,
                salt: salt,
                current_logged_in_at: new Date(),
                last_logged_in_at: new Date()
                
            },
        })

        response['post'] = createPersonalDetails
        response['success'] = true
    } catch (error) {
        response['success'] = false
        response['message'] = error.toString()
    }

    return response;
})
    