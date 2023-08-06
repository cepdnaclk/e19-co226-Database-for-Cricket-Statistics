import { io } from "socket.io-client";
const socket = io("https://criclive-backend.onrender.com");
export default socket;
