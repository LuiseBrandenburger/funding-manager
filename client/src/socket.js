import { io } from "socket.io-client";
// FIXME: setup for sockets prepared, but not in use yet


export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        // socket.on("chatMessages", (messages) => {
        //     store.dispatch(chatMessagesReceived(messages));
        // });
    }
};
