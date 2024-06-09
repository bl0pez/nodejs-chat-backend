import { MessageModel } from "../data/mongo/models/message.model";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageEntity } from "./entities/user.entity";

export class MessageService {
  constructor() {}

  public async saveMessage(message: CreateMessageDto) {
    try {
      
      const mensaje = new MessageModel(message);
      await mensaje.save();

      return MessageEntity.fromObject(mensaje);

    } catch (error) {
      return false;
    }
  }

  public async findUserToUserConversation(userId: string, to: string) {
    const last30 = await MessageModel.find({
      $or: [
        { from: userId, to: to },
        { from: to, to: userId}
      ]
    }).sort({ createdAt: "asc" }).limit(30);

    return last30.map((message) => MessageEntity.fromObject(message));
  }

}