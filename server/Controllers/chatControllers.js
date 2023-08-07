import Jwt from "jsonwebtoken";
import chatMembersModel from "../Models/chatMembersModel.js";

export const createNewChatRoom = async (req, res) => {

    try {

        const sender_id = await Jwt.verify(req.cookies.userAuthToken, process.env.JWT_SIGNATURE)?._id
        const { receiver_id } = req.body
        await chatMembersModel.updateOne({ user_id: sender_id }, { $addToSet: { members: receiver_id } }, { upsert: true })


    } catch (error) {
        console.log('Error', error);
    }

}