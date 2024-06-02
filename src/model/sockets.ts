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
      // Escuchar evento: mensaje-to-server
      socket.on("mensaje-to-server", (data) => {
        console.log(data);

        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}
