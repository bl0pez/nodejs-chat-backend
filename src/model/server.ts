import express, { Router } from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { Sockets } from "./sockets";
import cors from "cors";

interface Options {
  port: number;
  routes: Router;
}

export class MainServer {
  private app = express();
  private io: Server;
  private server: http.Server;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
  }

  private socketsConfig() {
    new Sockets({
      io: this.io,
    });
  }

  public async start() {
    //Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //Socket config
    this.socketsConfig();

    //Routes
    this.app.use(this.routes);

    //Start server
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
