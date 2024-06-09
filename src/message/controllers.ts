import { Request, Response } from "express";
import { MessageService } from "./service";
import { CustomError } from "../config/custom.error";
import { UserEntity } from "../auth/entities/user.entity";

export class MessageControllers {
  constructor(private readonly messageService: MessageService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  public findUserToUserConversation = async (req: Request, res: Response) => {
    const user = req.body.user as UserEntity;
    const from = req.params.from;

    this.messageService
      .findUserToUserConversation(from, user.id)
      .then((messages) => res.json(messages))
      .catch((error) => this.handleError(error, res));
  };
}
