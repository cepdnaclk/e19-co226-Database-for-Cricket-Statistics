import { io } from "socket.io-client";
const socket = io("http://10.30.7.70:5000");
export default socket;
