import { io } from "socket.io-client";

const socket = io('https://visio-backend.vercel.app', {
    transports: ['websocket']
});

export default socket;
