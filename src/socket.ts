import { io } from "socket.io-client";

const socket = io('192.168.3.22:3000');
// const socket = io('https://visio-backend-0355e9bc0d18.herokuapp.com/');

export default socket;
