import Razorpay from "razorpay";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import hiringModel from "../Models/hiringModel.js";
import jobsModel from "../Models/jobsModel.js";
import categoryModel from "../Models/categoryModel.js";
import walletModel from "../Models/walletModel.js";
import withdrawModel from "../Models/withdrawModel.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const Payment = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const options = {
      amount: parseInt(totalAmount) * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    razorpayInstance.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        res.json({ success: false, message: "server error" });
      } else {
        res.json({ success: true, order });
      }
    });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "server error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const client_id = await jwt.verify(
      req.cookies.userAuthToken,
      process.env.JWT_SIGNATURE
    )?._id;
    const data = req.body;
    const { _id } = await categoryModel.findOne({ name: req.body.category });

    if (!req.body.job_id) {
      const job = await jobsModel.create({
        ...data,
        client_id,
        category: _id,
        requiredCount: 1,
        experience: 0,
        postedJob: false,
      });
      req.body.job_id = job._id;
    }

    const razorpayPayment_id =
      data.razorpay_order_id + "|" + data.razorpay_payment_id;

    // verifying payment using crypto hamac

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayPayment_id.toString())
      .digest("hex");

    if (expectedSignature === data.razorpay_signature) {
      const hiringDate = new Date();

      data.razorPay_id = data.razorpay_payment_id;
      //deleting unwanted from body
      delete data.razorpay_order_id,
        delete data.razorpay_payment_id,
        delete data.razorpay_signature;
      (data.client_id = client_id), (data.hiringDate = hiringDate);

      // change date format
      const startDate = new Date(data.startDate);
      startDate.setHours(startDate.getHours() + 5, startDate.getMinutes() + 30);
      data.startDate = startDate.toISOString();

      const endDate = new Date(data.endDate);
      endDate.setHours(endDate.getHours() + 5, endDate.getMinutes() + 30);
      data.endDate = endDate.toISOString();

      //uploading to db
      await hiringModel.create({ ...data });

      return res.json({ success: true, message: "Hired labour successfully" });
    } else {
      return res.json({
        success: false,
        message: "payment verification failed",
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const updatePayment = async (req, res) => {
  try {
    let status, message;
    const { hire_id, payment, user_id, amount } = req.body;
    if (payment) {
      status = "approved";
      message = "Amount transffered to labour wallet successfully";
      await walletModel.create({
        hire_id: hire_id,
        user_id: user_id,
        amount: amount / 1.01,
        transaction: "credit",
        action: "wage Transfer",
      });
    } else {
      status = "rejected";
      message = "Payment rejected successfully";
    }
    await hiringModel.updateOne(
      { _id: hire_id },
      { $set: { payment: status } }
    );

    res.json({ success: true, message: message });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const adminPaymentVerifying = async (req, res) => {
  try {
    const data = req.body;
    const razorpayPayment_id =
      data.razorpay_order_id + "|" + data.razorpay_payment_id;

    // verifying payment using crypto hamac

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayPayment_id.toString())
      .digest("hex");

    if (expectedSignature === data.razorpay_signature) {
      const updatedDocument = await withdrawModel.findOneAndUpdate(
        { _id: data._id },
        { status: "approved" },
        { new: true }
      );
      if (updatedDocument) {
        updatedDocument.status = "approved";
        updatedDocument.save();
      }
      return res.json({
        success: true,
        message: "Payment to labour successfully done",
      });
    } else {
      return res.json({
        success: false,
        message: "payment verification failed",
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const rejectWithdraw = async (req, res) => {
  try {
    const { _id } = req.body;
    await withdrawModel.updateOne(
      { _id: _id },
      { $set: { status: "rejected" } }
    );
    res.json({
      success: true,
      message: "Withdraw request rejected successfully",
    });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const adminPayment = async (req, res) => {
  try {
    const { amount, request_id } = req.body;
    const {
      user_id: { wallet },
    } = await withdrawModel.findOne({ _id: request_id }).populate("user_id");

    if (amount <= wallet) {
      const options = {
        amount: parseInt(amount) * 100, // amount in the smallest currency unit
        currency: "INR",
      };
      razorpayInstance.orders.create(options, function (err, order) {
        if (err) {
          console.log(err);
          res.json({ success: false, message: "server error" });
        } else {
          res.json({ success: true, order });
        }
      });
    } else {
      res.json({
        success: false,
        message: "Invalid amount cant proceed payment",
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "server error" });
  }
};

export const adminRefund = async (req, res) => {
  try {
    const { amount, razorPay_id } = req.body;
    const refund = await razorpayInstance.payments.refund(razorPay_id, {
      amount: parseInt(amount),
    });
    if (refund.status == "processed") {
      await hiringModel.updateOne(
        { razorPay_id: razorPay_id },
        { $set: { payment: "refunded" } }
      );
      res.json({ success: true, message: "Refund Successfully Processed" });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "server error" });
  }
};

export const rejectWithdrawRequest = async (req, res) => {
  try {
    const { request_id } = req.body;

    await withdrawModel.updateOne(
      { _id: request_id },
      { $set: { status: "rejected" } }
    );
    res.json({
      success: true,
      message: "Withdrawal Request Rejected Successfully",
    });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "server error" });
  }
};

export const getRevenueDatas = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const aggregationDatas = await hiringModel.aggregate([
      {
        $facet: {
          revenueDatas: [
            {
              $match: {
                payment: "approved",
                $expr: {
                  $eq: [{ $year: "$endDate" }, currentYear],
                },
              },
            },
            {
              $group: {
                _id: {
                  year: { $year: "$endDate" },
                  month: { $month: "$endDate" },
                },
                sum: {
                  $sum: {
                    $subtract: ["$totalAmount", { $divide: ["$totalAmount", 1.01] }],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                label: "$_id.month",
                y: { $divide: ["$sum", 1000] },
              },
            },
            {
              $sort: {
                label: 1,
              },
            },
          ],
          totalHiringCount: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
          categoryHiringCount: [
            {
              $group: {
                _id: "$category",
                y: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                name: "$_id",
                y: 1,
              },
            },
            {
              $sort: {
                category: 1,
              },
            },
          ],
          hiringDatas:[
            {$match:{
              $expr:{$eq:[{$year:'$endDate'},currentYear]}
            }},
            {$group:{
              _id:{
               year:{$year:'$hiringDate'},
                month:{$month:'$hiringDate'},
                count:{$sum:1}
              },
            }},
            {$project:{
              _id:0,
              label:'$_id.month',
              y:'$_id.count'
            }}
          ]
        },
      },
      {$unwind:{path:'$totalHiringCount'}}
    ]);

    const revenueDatas=aggregationDatas[0]?.revenueDatas
    const hiringDatas=aggregationDatas[0]?.hiringDatas
    const categoryHiringCount=aggregationDatas[0]?.categoryHiringCount
    
    // for giving month name in tha aggregated data
    const monthMapping = [
      null,
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyRevenue = [
      { label: "Jan", y: 0 },
      { label: "Feb", y: 0 },
      { label: "Mar", y: 0 },
      { label: "Apr", y: 0 },
      { label: "May", y: 0 },
      { label: "Jun", y: 0 },
      { label: "Jul", y: 0 },
      { label: "Aug", y: 0 },
      { label: "Sep", y: 0 },
      { label: "Oct", y: 0 },
      { label: "Nov", y: 0 },
      { label: "Dec", y: 0 },
    ];

    const monthlyHiring = [
      { label: "Jan", y: 0 },
      { label: "Feb", y: 0 },
      { label: "Mar", y: 0 },
      { label: "Apr", y: 0 },
      { label: "May", y: 0 },
      { label: "Jun", y: 0 },
      { label: "Jul", y: 0 },
      { label: "Aug", y: 0 },
      { label: "Sep", y: 0 },
      { label: "Oct", y: 0 },
      { label: "Nov", y: 0 },
      { label: "Dec", y: 0 },
    ];

    revenueDatas.forEach((data) => {
      data.label = monthMapping[data.label];
      const monthIndex = monthMapping.indexOf(data.label);
      if (monthIndex != -1) {
        monthlyRevenue[monthIndex].y = data.y;
      }
    });

    hiringDatas.forEach((data) => {
      data.label = monthMapping[data.label];
      const monthIndex = monthMapping.indexOf(data.label);
      if (monthIndex != -1) {
        monthlyHiring[monthIndex].y = data.y;
      }
    });

    res.json({monthlyRevenue,monthlyHiring,categoryHiringCount});
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "server error" });
  }
};
