import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './AuthService';
import { User } from './User';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(name: string, password: string): Promise<User> {
    console.log('Local Strategy validation Reached');
    const user = await this.authService.validateUser(name, password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return user;
  }
}
