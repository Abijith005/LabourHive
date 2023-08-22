import { log } from "console";
import { Server } from "socket.io";

export default function socketConnect(io, activeUsers) {
  io.on("connection", (socket) => {
    socket.on("join", (newUserId) => {
      console.log('joined user',newUserId);
      if (!activeUsers[newUserId]) {
        activeUsers[newUserId] = { user_id: newUserId, socketId: socket.id };
      }
      io.emit("getActiveUsers", activeUsers);
    });

    socket.on("disconnectUser", () => {
      log('disconnect')
      Object.keys(activeUsers).forEach((key) => {
        if (activeUsers[key].socket_id === socket.user_id) {
          delete activeUsers[key];
        }
      });
      io.emit("getActiveUsers", activeUsers);
    });
    socket.on("send-message", (data) => {
      const { receiver_id } = data; 
      console.log(activeUsers,data.message,receiver_id);
      const receiver = activeUsers[receiver_id];
      if (receiver) {
        console.log('receiver present');
        const message = { user: "receiver", message: data.message };
        socket.to(receiver.socketId).emit("receive-message", message);
      }
    });
  });     
}
