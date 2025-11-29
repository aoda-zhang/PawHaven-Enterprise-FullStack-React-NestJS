import { Controller } from '@nestjs/common'
import CreateUserDTO from '@modules/User/dto/create-user.dto'
import AuthService from './auth.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import AuthMessagePattern from '@shared/constants/MSMessagePatterns/auth.messagePattern'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(AuthMessagePattern.REGISTER)
    register(@Payload() userInfo: CreateUserDTO) {
        return this.authService.register(userInfo)
    }

    @MessagePattern(AuthMessagePattern.LOGIN)
    async login(@Payload() userInfo: { userName: string; password: string }) {
        return this.authService.login(userInfo?.userName, userInfo?.password)
    }

    @MessagePattern(AuthMessagePattern.REFRESH)
    async refresh(@Payload() refreshToken: string) {
        const tokenInfo = await this.authService.verifyRefreshToken(refreshToken)
        return this.authService.refresh(tokenInfo)
    }
}
