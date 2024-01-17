export default defineEventHandler(async (event)=>{
    setCookie(event, "user", "");

    setCookie(event, "token", "");

    return {
        success: true
    }
});