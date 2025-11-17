import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { MSClientNames } from '@pawhaven/backend-core/constants/constant';
import AuthMessagePattern from '@pawhaven/backend-core/constants/MSMessagePatterns/auth.messagePattern';
import type CreateUserDTO from '@pawhaven/backend-core/DTO/Auth/create-user.dto';
import type { Schema } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MSClientNames.MS_AUTH)
    private readonly authClient: ClientProxy,
  ) { }

  register = async (userInfo: CreateUserDTO) => {
    try {
      return await this.authClient.send(AuthMessagePattern.REGISTER, userInfo);
    } catch (error) {
      throw new BadRequestException(`register failed :${error}`);
    }
  };

  login = async (userName: string, password: string) => {
    try {
      return {
        userName: 'aoda',
      };
    } catch (error) {
      throw new BadRequestException(`Login failed:${error}`);
    }
  };

  refresh = async (refreshToken: {
    userName: string;
    userID: Schema.Types.ObjectId;
  }) => {
    try {
      return await this.authClient.send(AuthMessagePattern.LOGIN, refreshToken);
    } catch (error) {
      throw new BadRequestException(`generate refresh token failed :${error}`);
    }
  };
}
