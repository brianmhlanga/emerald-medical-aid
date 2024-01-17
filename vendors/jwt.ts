import * as jose from 'jose';
let issuer = 'iss.mufundo.com';
let audience = 'aud.mufundo.com';
export const createAppJwtToken = async (jwt_secret: string)=>{
    const secret = new TextEncoder().encode(jwt_secret);
    
    const alg = 'HS256';
      
    const token = await new jose.SignJWT({ success: true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime('2w')
        .sign(secret);
    
    return token
}

export const checkAppJwtToken = async (token: string, jwt_secret: string)=>{
    try{
        const secret = new TextEncoder().encode(jwt_secret);
      
        const { payload } = await jose.jwtVerify(token, secret, {
            issuer: issuer,
            audience: audience,
        });
        console.log("payload: " + payload);
        return payload;
    }
    catch(error){
        console.log("errrrrrrrrrrrrrrrrrrrrr",error);
        return { success: false }
    }
}


