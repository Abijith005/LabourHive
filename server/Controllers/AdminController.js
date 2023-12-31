import adminModel from "../Models/adminModel.js";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email: email });

    if (admin && password == admin.password) {
      const token = jwt.sign({ _id: admin._id }, process.env.JWT_SIGNATURE);

      res
        .cookie("adminToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 1000,
          sameSite: "none",
          withCredential: true,
        })
        .json({ success: true, message: "Login successful!!" });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
}
           
export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find().populate("jobProfileDatas").lean();
    
    res.json({users:users,success:false});
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
}

export async function blockOrUnblockUser(req, res) {
  try {
    const { _id, blockStatus } = req.body;
    const user = await userModel.updateOne(
      { _id: _id },
      { $set: { blockStatus: blockStatus } }
    );
    if (user) {
      res.json({ success: true, message: "Action success" });
    } else {
      res.json({ success: false, message: "Action failed unknown error" });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
}
