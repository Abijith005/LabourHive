import Razorpay from "razorpay";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import hiringModel from "../Models/hiringModel.js";

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET

})

export const hirePayment = async (req, res) => {
    try {

        const { totalAmount } = req.body;
        const options = {
            amount: parseInt(totalAmount) * 100,  // amount in the smallest currency unit
            currency: "INR",
        };
        razorpayInstance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err)
                res.json({ success: false, message: "server error" })
            } else {
                res.json({ success: true, order })
            }
        });

    } catch (error) {
        res.json({ success: false, message: "server error" })
        console.log('Error', error);
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const data = req.body

        const razorpayPayment_id = data.razorpay_order_id + "|" + data.razorpay_payment_id;

        // verifying payment using crypto hamac

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpayPayment_id.toString())
            .digest('hex');

        if (expectedSignature === data.razorpay_signature) {
            const client_id = await jwt.verify(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)?._id
            const hiringDate = new Date()

            //deleting unwanted from body
            delete data.razorpay_order_id, delete data.razorpay_payment_id, delete data.razorpay_signature
            data.client_id = client_id, data.hiringDate = hiringDate

            //uploading to db
            await hiringModel.create({ ...data })

            return res.json({success:true,message:'Hired labour successfully'})
        } else {
            return res.json({ success: false, message: "payment verification failed"
            })
        }

    } catch (error) {

        console.log('Error', error);
    }
}


