import type { Server } from "socket.io";

interface Options {
    io: Server;
}

export class Sockets {
  private io: Server;

  constructor({ io }: Options) {
    this.io = io;
    this.socketsEvents();
  }

  public socketsEvents() {
    this.io.on("connection", (socket) => {
      
      


    });
  }
}
