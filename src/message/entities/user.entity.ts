import { CustomError } from "../../config";

export class MessageEntity {
  public constructor(
    public id: string,
    public from: string,
    public to: string,
    public message: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public static fromObject(object: Record<string, any>) {
    const { id, _id, from, to, message, createdAt, updatedAt  } = object;

    if (!id && !_id) {
      throw CustomError.badRequest("Mensaje id es requerido");
    }

    
    if (!from) throw CustomError.badRequest("Usuario emisor es requerido");
    if (!to) throw CustomError.badRequest("Usuario receptor es requerido");
    if (!message) throw CustomError.badRequest("Mensaje es requerido");
    if (!createdAt) throw CustomError.badRequest("Mensaje createdAt es requerido");
    if (!updatedAt) throw CustomError.badRequest("Mensaje updatedAt es requerido");


    return new MessageEntity(id || _id, from, to, message, createdAt, updatedAt);
  }
}
