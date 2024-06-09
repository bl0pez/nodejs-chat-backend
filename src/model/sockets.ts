import type { Server } from "socket.io";
import { JwtAdapter } from "../config";
import { JWTPayload } from "../interfaces";
import { UserService } from "../user/service";
import { MessageService } from "../message/service";
import { CreateMessageDto } from "../message/dto/create-message.dto";

interface Options {
  io: Server;
}

export class Sockets {
  private io: Server;
  private readonly userService: UserService;
  private readonly messageService: MessageService;

  constructor({ io }: Options) {
    this.io = io;
    this.userService = new UserService();
    this.messageService = new MessageService();
    this.socketsEvents();
  }

  public socketsEvents() {
    this.io.on("connect", async (socket) => {
      const reqToken = socket.handshake.query["x-token"] as string;

      const token = await JwtAdapter.validateToken<JWTPayload>(reqToken);

      if (!token) {
        return socket.disconnect();
      }

      await this.userService.updateConnectionStatus(token.id, true);

      //Crear una sala por cada usuario
      socket.join(token.id);

      //Emitir todos los usuarios conectados
      this.io.emit("list-users", await this.userService.findAllChatUsers());

      //Escuchar cuando un usuario envía un mensaje
      socket.on("private-message", async (payload: CreateMessageDto) => {
        const message = await this.messageService.saveMessage(payload);
        this.io.to(payload.from).emit("private-message", message);
        this.io.to(payload.to).emit("private-message", message);
      });

      socket.on("disconnect", async () => {
        await this.userService.updateConnectionStatus(token.id, false);
        this.io.emit("list-users", await this.userService.findAllChatUsers());
      });
    });
  }
}
