import { Request, Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
