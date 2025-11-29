import type { User } from '@models/user.schema';
import type { CreateUserDTO } from '@modules/User/dto/create-user.dto';
import type { UserAccessInfo } from '@modules/User/dto/interface';
import type { UserInfoDTO } from '@modules/User/dto/userInfo.dto';
import type { UserService } from '@modules/User/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import type { Model, Schema } from 'mongoose';
import GatewayDBCollections from 'src/models/auth.DBcollection';

@Injectable()
export class AuthService {
  private tokenSecret: string;

  private tokenExpiresIn: string;

  private refreshTokenSecret: string;

  private refreshTokenExpiresIn: string;

  constructor(
    @InjectModel(GatewayDBCollections.USER) private UserModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.tokenSecret = this.configService.get('auth.secret')!;
    this.tokenExpiresIn = this.configService.get('auth.ttl')!;
    this.refreshTokenSecret = this.configService.get('auth.refreshSecret')!;
    this.refreshTokenExpiresIn = this.configService.get('auth.refreshTTL')!;
  }

  register = async (userInfo: CreateUserDTO) => {
    const salt = bcrypt.genSaltSync(
      Number(this.configService.get<number>('auth.saltRounds')),
    );

    const hashPwd = bcrypt.hashSync(userInfo?.password, salt);
    try {
      await new this.UserModel({ ...userInfo, password: hashPwd, salt }).save();
      return true;
    } catch (error) {
      throw new BadRequestException(`注册失败:${error}`);
    }
  };

  login = async (userName: string, password: string) => {
    const userInfo = await this.verifyUser(userName, password);
    // Token中需要饱含的值,可包含一切用户标示用户身份的信息，如用户角色，国家等等
    return this.generateLoginInfo(this.setTokenPayload(userInfo));
  };

  refresh = async (refreshToken: {
    userName: string;
    userID: Schema.Types.ObjectId;
  }) => {
    try {
      const userInfo = await this.UserModel.findOne({
        userName: refreshToken?.userName,
      });
      if (
        userInfo?.userName === refreshToken?.userName &&
        userInfo?._id === refreshToken?.userID
      ) {
        return await this.generateLoginInfo(this.setTokenPayload(userInfo));
      }
      throw new BadRequestException('用户信息不匹配');
    } catch (error) {
      throw new BadRequestException(`生成token错误:${error}`);
    }
  };

  verifyRefreshToken = async (token: string) => {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.refreshTokenSecret,
      });
    } catch (error) {
      throw new BadRequestException(`生成refresh-token错误:${error}`);
    }
  };

  verifyUser = async (userName: string, pwd: string) => {
    try {
      const userInfo = await this.userService.getUserInfo(userName);
      const isPasswordMatch = bcrypt.compareSync(pwd, userInfo?.password);
      if (!isPasswordMatch || !userInfo) {
        throw new UnauthorizedException('账户名与密码输入有误,请重新输入');
      }
      return this.setTokenPayload(userInfo);
    } catch (error) {
      throw new UnauthorizedException(
        `${error?.message ?? '账户名与密码输入有误,请重新输入'}`,
      );
    }
  };

  generateLoginInfo = async (userAccess: UserAccessInfo) => {
    try {
      const accessToken = this.jwtService.sign(userAccess, {
        expiresIn: this.tokenExpiresIn,
        secret: this.tokenSecret,
      });
      const refreshToken = this.jwtService.sign(userAccess, {
        expiresIn: this.refreshTokenExpiresIn,
        secret: this.refreshTokenSecret,
      });
      return {
        accessToken,
        refreshToken,
        baseUserInfo: userAccess,
      };
    } catch (error) {
      throw new BadRequestException(`Token生成出错：${error}`);
    }
  };

  getBaseUserInfo = (userInfo: UserInfoDTO) => {
    const { userName } = userInfo;
    return {
      userName,
    };
  };

  setTokenPayload = (userInfo: Record<string, any>): UserAccessInfo => {
    return {
      userName: userInfo?.userName ?? '',
      userID: userInfo?._id ?? '',
      roles: userInfo?.roles ?? [],
    };
  };
}
