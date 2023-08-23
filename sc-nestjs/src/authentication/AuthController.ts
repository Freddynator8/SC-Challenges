import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './LocalAuthGuard';
import { AuthService } from './AuthService';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }


}
