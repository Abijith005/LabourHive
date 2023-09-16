import Jwt from "jsonwebtoken";
import messageModel from "../Models/messageModel.js";
import chatRoomModel from "../Models/chatRoomModel.js";

export const createNewChatRoom = async (req, res) => {
  try {
    const sender_id = await Jwt.verify(
      req.cookies.userAuthToken,
      process.env.JWT_SIGNATURE
    )?._id;
    const { receiver_id } = req.body;
    await chatRoomModel.updateOne(
      {
        $or: [
          { sender_id: sender_id, receiver_id: receiver_id },
          { sender_id: receiver_id, receiver_id: sender_id },
        ],
      },
      {
        $setOnInsert: { sender_id: sender_id, receiver_id: receiver_id },
      },
      {
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const storeMessages = async (req, res) => {
  try {
    const { receiver_id, message, sender_id } = req.body;
    const { _id } = await chatRoomModel.findOne({
      $or: [
        { sender_id: sender_id, receiver_id: receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id },
      ],
    });

    await messageModel.create({
      chatRoom_id: _id,
      user_id: sender_id,
      message: message,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};

export const getAllMessageReceivers = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const data = await chatRoomModel
      .find({ $or: [{ sender_id: user_id }, { receiver_id: user_id }] })
      .populate("receiver_id sender_id")
      .lean();

    const receiversData =data.map((item) => {
      if (user_id === item.sender_id._id.toString()) {
        return {
          room_id: item._id,
          receiver: item.receiver_id.name,
        };
      } else {
        return {
          room_id: item._id,
          receiver: item.sender_id.name,
        };
      }
    });
    res.json(receiversData);
  } catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};       

export const getChatMessages = async (req, res) => {
  try {
    const user_id = await Jwt.verify(
      req.cookies.userAuthToken,
      process.env.JWT_SIGNATURE
    )?._id;
    const room_id = req.params.room_id;
    const data = await messageModel
      .find({ chatRoom_id: room_id })
      .sort({ timestamps: 1 });
    const messages = data.map((item) => {
      if (item.user_id.toString() === user_id) {
        return {
          user: "sender",
          message: item.message,
        };
      } else {
        return {
          user: "receiver",
          message: item.message,
        };
      }
    });

    res.json(messages);
  } catch (error) {
    console.log("Eror", error);
    res.json({ success: false, message: "Unknown error occured" });
  }
};
