import Jwt from "jsonwebtoken";

export async function userAuthCheck(req, res, next) {
  try {
    console.log(req.cookies.userAuthCheck,'authcheck');
    if (req.cookies.userAuthCheck) {
      const verify = await Jwt.verify(
        req.cookies.userAuthCheck,
        process.env.JWT_SIGNATURE
      );
      console.log(verify, "jkhjkhkj");
      if (verify) {
        res.next();
      } else {
        res.redirect("http://localhost:4200/login");
      }
    } else {
      res.redirect("http://localhost:4200/login");
    }
  } catch (error) {
    console.log('Error',error);
    res.redirect("http://localhost:4200/login");
  }
}
 