import type { Server } from "socket.io";
import { JwtAdapter } from "../config";
import { JWTPayload } from "../interfaces";
import { UserService } from "../user/service";

interface Options {
  io: Server;
}

export class Sockets {
  private io: Server;
  private readonly userService: UserService;

  constructor({ io }: Options) {
    this.io = io;
    this.userService = new UserService();
    this.socketsEvents();
  }

  public socketsEvents() {
    this.io.on("connect", async (socket) => {
      const reqToken = socket.handshake.query["x-token"] as string;

      const token = await JwtAdapter.validateToken<JWTPayload>(reqToken);

      if (!token) {
        console.log("Socket no identificado");
        return socket.disconnect();
      }

      await this.userService.updateConnectionStatus(token.id, true);

      //Emitir todos los usuarios conectados
      this.io.emit("list-users", await this.userService.findOtherUsers(token.id));

      socket.on("disconnect", async () => {
        await this.userService.updateConnectionStatus(token.id, false);
        this.io.emit("list-users", await this.userService.findOtherUsers(token.id));
      });
    });
  }
}
