import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { AuthResponseDto, VerifyResponseDto } from '@pawhaven/shared/types';
import { HttpReqHeader } from '@pawhaven/backend-core/types';
import { httpBusinessMappingCodes } from '@pawhaven/backend-core/constants';
import { PublicAPI } from '@pawhaven/backend-core/decorators';

import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/verify')
  async verify(
    @Headers(HttpReqHeader.accessToken) token?: string,
  ): Promise<VerifyResponseDto> {
    if (!token) {
      throw new BadRequestException(httpBusinessMappingCodes.invalidToken);
    }
    const payload = await this.authService.verify(token);
    return {
      isValid: true,
      payload,
    };
  }

  @PublicAPI()
  @Post('/login')
  async login(@Body() loginDto: LoginDTO): Promise<AuthResponseDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @PublicAPI()
  @Post('/register')
  async register(@Body() registerDto: RegisterDTO): Promise<AuthResponseDto> {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto?.username,
    );
  }
}
