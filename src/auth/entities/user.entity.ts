import { CustomError } from "../../config";

export class UserEntity {
  public constructor(
    public id: string,
    public name: string,
    public email: string,
    public online: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  public static fromObject(object: Record<string, any>) {
    const { id, _id, name, email, online, createdAt, updatedAt } = object;

    if (!id && !_id) {
      throw CustomError.badRequest("User id is required");
    }

    if (!name) throw CustomError.badRequest("User name is required");
    if (!email) throw CustomError.badRequest("User email is required");
    if (online === undefined)
      throw CustomError.badRequest("User online is required");
    if (!createdAt) throw CustomError.badRequest("User createdAt is required");
    if (!updatedAt) throw CustomError.badRequest("User updatedAt is required");

    return new UserEntity(id || _id, name, email, online, createdAt, updatedAt);
  }
}
