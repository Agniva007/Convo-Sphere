import { Server } from "socket.io";
import Redis from 'ioredis';

const pub = new Redis({
    host: '',
    port: 0,
    username: '',
    password: ''
});
const sub = new Redis({
    host: '',
    port: 0,
    username: '',
    password: ''
});


class SocketService  {
    private _io: Server;

    constructor(){
        console.log("Init Socket Server...");
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        });

        sub.subscribe("MESSAGES");
    }

    public initListener(){
        const io = this._io;
        console.log("Init Socket Listeners...");
        io.on('connect', socket => {
            console.log(`New Socket Connected`, socket.id);

            socket.on("event:message", async ({ message }: { message: string}) => {
                console.log("New Message Received", message);

                //publish this msg to redis
                await pub.publish('MESSAGES', JSON.stringify({ message }));
            })
        });

        sub.on('message', (channel, message) => {
            if (channel==="MESSAGES") {
                console.log("New Message Frome Redis", message);
                io.emit("message", message);
            }
        });
    }

    get io(){
        return this._io;
    }
}

export default SocketService;