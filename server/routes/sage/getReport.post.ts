import axios from "axios";
import { getNewCookies } from "./getCookies.post";
import { SAGE_URL } from "~~/services/global.variables";


export default defineEventHandler(async (event)=>{
    const { PeopleEssUser, XSRFTOKEN, companyID, periodNumber } = await readBody(event);
    const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
    const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];
    
    let data = JSON.stringify({
        "QueryParameterList": [
            {

                "QueryParameterString": "@WhichCompany",
    
                "ParameterValue": `${companyID}`
    
            },
            {
    
                "QueryParameterString": "@DDLType",
    
                "ParameterValue": "2"
    
            },
            {
    
                "QueryParameterString": "@CCLType",
    
                "ParameterValue": "3"
    
            },
            {
    
                "QueryParameterString": "@WhichPeriod",
    
                "ParameterValue": `${periodNumber}`
    
            }
        ]
    });
    var config = {
        method: 'post',
        url: `${SAGE_URL}/api/apibase/GenericGet/COMP_RUL_TOT`,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${filteredPeopleEssUser}; ${filteredXSRFTOKEN}`
        },
        data: data
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
 