import { checkJwtToken, createJwtToken } from "../../../jwt";
export default defineEventHandler(async (event)=>{
    const { token } = await readBody(event);
    console.log('Node ' + process.env.NODE_ENV);
    const isValid = await checkJwtToken(token).then((data: any)=>{
        const cookie = getCookie(event, 'applicant') || "{}";
        const applicant = JSON.parse(cookie);
        const res = {
            user: applicant,
            success: data.success
        }
             
        return res;
    });
    if(!isValid.success){
        //Refresh JWT token
        const token = await createJwtToken();

        setCookie(event, "token", token);
    }

    
    return isValid;
});