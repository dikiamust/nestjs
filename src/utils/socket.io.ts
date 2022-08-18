import { Server } from "socket.io";

export const socketInit = ( server ) => {

  const corsConfig = { cors: { 
    origin: '*',
    credentials: true,
   }
  }

  const io = new Server(server, corsConfig);

  global.onlineUsers = {};
  io.on('connection', (socket) => {
    global.chatSocket = socket;

    socket.on('add-user', (userId) => {
      global.onlineUsers[userId] = socket.id;
      io.emit('receive-online-users', Object.keys(global.onlineUsers));
    });

    socket.on('send-msg', (data) => {
      const receiver = global.onlineUsers[data.to];
      if (receiver) {
        socket
          .to(receiver)
          .emit('msg-receive', { from: data.from, msg: data.msg });
      }
    });

    socket.on('logout', (userId) => {
      delete global.onlineUsers[userId];
      io.emit('receive-online-users', Object.keys(global.onlineUsers));
    });

    socket.on('remove-user', (userId) => {
      delete global.onlineUsers[userId];
    });
  });
};

