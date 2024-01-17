import axios from "axios";
import { getNewCookies } from "./getCookies.post";
import { SAGE_URL } from "~~/services/global.variables";


export default defineEventHandler(async (event)=>{
    const { PeopleEssUser, XSRFTOKEN } = await readBody(event);
    const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
    const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];
   // console.log("getting employees")
   
    var config = {
        method: 'post',
        url: `${SAGE_URL}/api/apibase/GenericGet/COMPANY`,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${filteredPeopleEssUser}; ${filteredXSRFTOKEN}`
        }
    };
        
    const result = await axios(config)
    .then(function (response) {
        const result = response.data;

        return {
            success: true,
            data: result
            
        };
    }) .catch(async (error)=>{
        console.log(error);
        
        if (error.response.data.message == "Authorization has been denied for this request.") {
            // Get new cookies and store the data in the database
            const cookie = await getNewCookies();
            return  cookie;
        } 
            
        return {    
            success: false
        } 
    });
    
    return result;
});
 