import { bcryptAdapter } from "../config";
import { CustomError } from "../config/custom.error";
import { JwtAdapter } from "../config/jwt.adapter";
import { UserModel } from "../data/mongo/models/user.model";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UserEntity } from "./entities/user.entity";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);

      // Encriptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      const token = await JwtAdapter.generateToken({ id: user._id });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      const userEntity = UserEntity.fromObject(user);

      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest("Email not exist");

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );
    if (!isMatching) throw CustomError.badRequest("Password is not valid");

    const token = await JwtAdapter.generateToken({ id: user._id });
    if (!token) throw CustomError.internalServer("Error while creating JWT");

    const userEntity = UserEntity.fromObject(user);

    return {
      user: userEntity,
      token: token,
    };
  }

  public async renewToken(token: string) {    
    const decoded = await JwtAdapter.validateToken<{ id: string }>(token);
    if (!decoded) throw CustomError.unauthorized("Invalid token");

    const { id } = decoded;

    const user = await UserModel.findById(id);
    if (!user) throw CustomError.unauthorized("Invalid token - user");

    const newToken = await JwtAdapter.generateToken({ id: user._id });
    if (!newToken) throw CustomError.internalServer("Error while creating JWT");

    const userEntity = UserEntity.fromObject(user);

    return {
      user: userEntity,
      token: newToken,
    };
  }
}
