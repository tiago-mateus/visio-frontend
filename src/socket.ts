import { io } from "socket.io-client";

const socket = io('https://visio-backend.vercel.app:3000');

export default socket;
