import Razorpay from "razorpay";

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

export const verifyPayment=async(req,res)=>{
    try {

        const {response}=req.body
        
        const razorpayPayment_id = response.razorpay_order_id + "|" + response.razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpayPayment_id.toString())
            .digest('hex');

        if (expectedSignature === response.razorpay_signature){
            const booking= await BookingModel.create({
                date, timeSlot, time, payment:response, doctorId, hospitalId,fees,
                userId:req.user._id, patientName:name, age,
                token: Math.ceil(Math.random()*100000)
            })
            return res.json({
                err:false, booking
            })
        }else{
            return res.json({
                err:true, message:"payment verification failed"
            })
        }






        
    } catch (error) {
        
        console.log('Error',error);
    }
}

      
