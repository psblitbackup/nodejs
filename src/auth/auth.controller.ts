import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // 👈 This makes your base route /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // 👈 This makes the full path /auth/login
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateEmployee(dto.code, dto.password);
    return this.authService.login(user);
  }
}
