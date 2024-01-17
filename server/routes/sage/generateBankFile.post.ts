import axios from "axios";
import { getNewCookies } from "./getCookies.post";
import { SAGE_URL } from "~~/services/global.variables";


export default defineEventHandler(async (event)=>{
    const { PeopleEssUser, XSRFTOKEN, companyID, paymentDate } = await readBody(event);
    const filteredPeopleEssUser = PeopleEssUser.split(/;/g)[0];
    const filteredXSRFTOKEN = XSRFTOKEN.split(/;/g)[0];
    console.log("paymentDate: ", paymentDate)
    const padNumberWithZeros = (number)=> {
        // Convert the number to a string
        let numString = number.toString();
      
        // Calculate the number of zeros to pad
        const zerosToPad = 3 - numString.length;
      
        // Check if padding is necessary
        if (zerosToPad > 0) {
          // Use String.prototype.repeat to add leading zeros
          numString = "0".repeat(zerosToPad) + numString;
        }
      
        return numString;
      }
      function convertDateToNewDate(inputDate) {
        // Create a Date object from the input string
        const originalDate = new Date(inputDate);
        console.log("originaaaaa",originalDate)
        // Add one day to the original date
        originalDate.setDate(originalDate.getDate());
      
        // Get the year, month, and day from the modified date
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(originalDate.getDate()).padStart(2, '0');
      
        // Construct the new date string in the format "YYYY-MM-DD"
        const newDate = `${year}-${month}-${day}`;
        console.log(newDate);
        return newDate;
      }
      
    let data = JSON.stringify({
        "QueryParameterList": [
            {

                "QueryParameterString": "@PaymentDate",
    
                "ParameterValue": `${await convertDateToNewDate(paymentDate)}`
    
            },
    
            {
    
                "QueryParameterString": "@CompCode",
    
                "ParameterValue": `${await padNumberWithZeros(companyID)}`
    
            },
    
            {
    
                "QueryParameterString": "@Payrun@",
    
                "ParameterValue": "MAIN - Main Payrun"
    
            },
    
            {
    
                "QueryParameterString": "@PayMethod",
    
                "ParameterValue": "Automated Bank Payment"
    
            }
        ]
    });
    var config = {
        method: 'post',
        url: `${SAGE_URL}/api/apibase/GenericGet/PAY_RUN`,
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
 