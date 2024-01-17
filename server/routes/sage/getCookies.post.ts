import axios from "axios";
import { stringify } from "qs";
import { PrismaClient, SageAPITokens } from "@prisma/client";
import { SAGE_API_ID, SAGE_PASS, SAGE_URL, SAGE_USERNAME } from "~~/services/global.variables";

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    //Check to see if there is a Cookie that still hasn't expired

   //console.log("hitting get cookies")
    let cookieArray
    // cookieArray = await prisma.sageAPITokens.findFirst({
    //     where: {
    //         expiryDate: {
    //             gte: new Date()
    //         }
    //     }
    // });

    if(cookieArray){
        const cookie = cookieArray;

        return {
            PeopleEssUser: cookie.PeopleEssUser,
            XSRFTOKEN: cookie.XSRFTOKEN,
            expiryDate: cookie.expiryDate,
            success: true
        }
    }else{
      //  console.log("Getting new cookies");
        
        return getNewCookies();
    }
});

export const getNewCookies = async () => {
    var data = stringify({
        'grant_type': 'password',
        'username': SAGE_USERNAME,
        'password': SAGE_PASS,
        'scope': `apiKey=${SAGE_API_ID}` 
    }); 

    var config = {
        method: 'get',
        url: `${SAGE_URL}/token`,   
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

    return await axios(config).then(async function (response) {
        const [PeopleEssUser, XSRFTOKEN] = response.headers["set-cookie"];

        //Store cookies into the db
        let cookie: { expiryDate: any; id?: number; PeopleEssUser?: string; XSRFTOKEN?: string; createdAt?: Date; };
        if(PeopleEssUser && XSRFTOKEN){
            const expiryDate = PeopleEssUser.split(/expires=|; secure;|; HttpOnly;/g)[1];
            let cookieDeletion = await  prisma.sageAPITokens.deleteMany();
            cookie = await prisma.sageAPITokens.create({
                data: {
                    PeopleEssUser: PeopleEssUser,
                    XSRFTOKEN: XSRFTOKEN,
                    expiryDate: new Date(expiryDate)
                }
                
               });
        }

        return {
            PeopleEssUser: PeopleEssUser,
            XSRFTOKEN: XSRFTOKEN,
            expiryDate: cookie.expiryDate,
            success: true
        }
    }).catch((error)=>{
        console.log(error); 
        
        return {
            message: "API error",
            detail: error,
            success: false
        }
    });
}