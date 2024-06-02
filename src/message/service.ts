interface Message {
    id: string;
    from: string;
}


export class MessageService {
  constructor() {}

  public async findMessages(message: Message) {
    return message;
  }

}