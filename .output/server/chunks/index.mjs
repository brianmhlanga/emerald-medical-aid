import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const env = dotenv.config({ path: ".env" });
if (env.error) {
  throw env.error;
}
const { JWT_TOKEN_SECRET } = env.parsed;
const createJwtToken = async () => {
  return jwt.sign({ success: true }, JWT_TOKEN_SECRET, { expiresIn: "30m" });
};
const checkJwtToken = async (token) => {
  return jwt.verify(token, JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      let { name, message } = err;
      return {
        name,
        message,
        success: false
      };
    }
    console.log(decoded);
    return decoded;
  });
};

export { checkJwtToken as a, createJwtToken as c };
//# sourceMappingURL=index.mjs.map
