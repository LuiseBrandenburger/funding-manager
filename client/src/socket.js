import { io } from "socket.io-client";

// import // wallMessagesReceived,
// // wallMessageReceived,
// "./redux/wall/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        // socket.on("chatMessages", (messages) => {
        //     store.dispatch(chatMessagesReceived(messages));
        // });
    }
};
