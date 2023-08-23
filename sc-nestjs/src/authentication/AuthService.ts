import { Injectable } from '@nestjs/common';
import { User } from './User';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = new Map<string, User>([
    [
      'admin',
      {
        id: '1',
        name: 'admin',
        password: 'password',
      },
    ],
  ]);
  constructor(private jwtService: JwtService) {}
  private readonly JWT_SECRET = 'this-should-not-be-in-git';

  async validateUser(name: string, password: string): Promise<User | null> {
    const user = this.users.get(name);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  generateToken(user: User) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
