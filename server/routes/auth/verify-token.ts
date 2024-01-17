import { checkAppJwtToken } from "~/vendors/jwt"
export default defineEventHandler(async (event)=>{
    try {
        const body = await readBody(event)

        //Validate input
       

        //Desctruct body
        const { token } = body

        //Get RunTime variables
        const { NUXT_PUBLIC_JWT_APP_TOKEN_SECRET } = process.env
        console.log("token",token)
        console.log("secret",NUXT_PUBLIC_JWT_APP_TOKEN_SECRET)
        const is_valid = await checkAppJwtToken(token, NUXT_PUBLIC_JWT_APP_TOKEN_SECRET).then(({ success })=> success )
        console.log("is_valid",is_valid)
        return {
            data: { is_valid },
            message: "",
            success: true
        }
   } catch (error) {
        console.error(error)

        setResponseStatus(event, 500)

        return { 
            data: {},
            message: 'A server error has occurred',
            success: false
        }  
   }
})
