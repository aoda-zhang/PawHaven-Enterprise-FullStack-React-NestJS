import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import {
  httpBusinessMappingCodes,
  HttpReqHeader,
} from '@pawhaven/backend-core';
import { AuthResponseDto, VerifyResponseDto } from '@pawhaven/shared/types';

import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Verify JWT token from Authorization header
   */
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

  /**
   * Login endpoint - authenticates user and returns JWT token
   * Body: { "email": "user@example.com", "password": "password123" }
   */
  @Post('/login')
  async login(@Body() loginDto: LoginDTO): Promise<AuthResponseDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  /**
   * Register endpoint - creates new user and returns JWT token
   * Body: { "email": "user@example.com", "password": "password123", "username": "john_doe" }
   */
  @Post('/register')
  async register(@Body() registerDto: RegisterDTO): Promise<AuthResponseDto> {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto?.username,
    );
  }
}
