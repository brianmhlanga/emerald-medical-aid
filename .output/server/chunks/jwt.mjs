import * as jose from 'jose';

let issuer = "iss.mufundo.com";
let audience = "aud.mufundo.com";
const createAppJwtToken = async (jwt_secret) => {
  const secret = new TextEncoder().encode(jwt_secret);
  const alg = "HS256";
  const token = await new jose.SignJWT({ success: true }).setProtectedHeader({ alg }).setIssuedAt().setIssuer(issuer).setAudience(audience).setExpirationTime("2w").sign(secret);
  return token;
};
const checkAppJwtToken = async (token, jwt_secret) => {
  try {
    const secret = new TextEncoder().encode(jwt_secret);
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer,
      audience
    });
    console.log("payload: " + payload);
    return payload;
  } catch (error) {
    console.log("errrrrrrrrrrrrrrrrrrrrr", error);
    return { success: false };
  }
};

export { checkAppJwtToken as a, createAppJwtToken as c };
//# sourceMappingURL=jwt.mjs.map
