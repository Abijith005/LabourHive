import jwt from "jsonwebtoken";

export async function verifyToken(token) {
  try {
    return  jwt.verify(token,process.env.JWT_SIGNATURE)
  } catch (error) {
    console.error();
  }
}
