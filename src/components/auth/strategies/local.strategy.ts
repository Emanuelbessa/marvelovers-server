import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'user-local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'des_email_usr',
      passwordField: 'des_password_usr',
    });
  }

  async validate(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(email, pass);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.authService.login(user);
  }
}
