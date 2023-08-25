import { verifyToken } from "../Helpers/jwtVerify.js";
import hiringModel from "../Models/hiringModel.js";

export const getProfileHistory = async (req, res) => {
  try {
    const user_id = (
      await verifyToken(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)
    )._id;
    const pipeline = [{ $match: { client_id: user_id } }];

    const data = await hiringModel
      .find(
        { client_id: user_id },
        {
          labourCount: 0,
          offeredWage: 0,
          totalAmount: 0,
          coordinates: 0,
          location: 0,
          endDate: 0,
          totalDays: 0,
        }
      )
      .populate([{path:'job_id',select:'_id currentStatus'},{ path: "labour_id", select: "_id name" }])
      .lean();

      console.log(data);

      res.json({success:true,data})
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
