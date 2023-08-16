import { io } from "socket.io-client";
const socket = io("http://10.40.18.143:5000/");
export default socket;
