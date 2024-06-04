import { Request, Response } from "express";
import { MessageService } from "./service";

export class MessageControllers {
  constructor(private readonly messageService: MessageService) {}

  public findMessages = async (req: Request, res: Response) => {
    const user = req.body.user;
    const from = req.params.from;

    return res.json({ from, user })

  }
}
