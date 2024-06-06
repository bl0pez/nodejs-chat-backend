import { UserEntity } from "../auth/entities/user.entity";
import { UserModel } from "../data/mongo/models/user.model";

export class UserService {

    public constructor() {}

    public async findUserById(id: string): Promise<UserEntity | null> {
        const user = await UserModel.findById(id);

        if (!user) return null;

        return UserEntity.fromObject(user);
    }

    public async updateConnectionStatus(id: string, status: boolean) {
        const user = await UserModel.findByIdAndUpdate(id, {
            online: status,
        });

        if (!user) return null;

        return UserEntity.fromObject(user);
    }

    public async getUsers() {
        const users = await UserModel.find().sort("-online");

        return users.map((user) => UserEntity.fromObject(user));
    }

    public async findOtherUsers(id: string) {
        const users = await UserModel.find({ _id: { $ne: id } });

        return users.map((user) => UserEntity.fromObject(user));
    }

}