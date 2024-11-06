import { Controller, Post, Body, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
    async login(
        @Body("email") email: string
    ) {
        return await this.authService.login(email)
    }

    @Post('/check-otp')
    async checkotp(
        @Body('otp', ParseIntPipe) otp: number,
        @Body('userId', ParseIntPipe) userId: number,
    ) {
        return await this.authService.checkOtp(otp, userId)
    }
}
