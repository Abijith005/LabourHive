import { verifyToken } from "../Helpers/jwtVerify.js";
import walletModel from "../Models/walletModel.js";
import withdrawModel from "../Models/withdrawModel.js";

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
      })
      .populate({ path: "user_id", select: "wallet" })
      .lean();
      console.log(wallet);
    res.json(wallet);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getWithdrawDatas = async (req, res) => {
  try {
    const query = {};
    const datas =await withdrawModel.find(query).populate({path:'user_id',select:'name wallet'}).lean();
    res.json(datas);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
