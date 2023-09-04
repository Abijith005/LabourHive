import { verifyToken } from "../Helpers/jwtVerify.js";
import walletModel from "../Models/walletModel.js";

export const getWalletDetails = async (req, res) => {
  try {
    const user_id = (
      await verifyToken(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)
    )._id;
    const wallet = await walletModel
      .find({ user_id: user_id })
      .populate({
        path: "hire_id",
        select: "client_id",
        populate: { path: "client_id", select: "name" },
      }).populate({path:'user_id',select:'wallet'})
      .lean();
    res.json(wallet);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
