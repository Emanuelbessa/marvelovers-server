import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvService } from 'src/config/env/env.service';
import { UserService } from 'src/components/user/user.service';
import { User } from 'src/components/user/entities/user.entity';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    private envService: EnvService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.jwtSecret,
    });
  }

  async validate(payload: Partial<User>, done): Promise<any> {
    const user = await this.userService.findOneByEmail(payload.des_email_usr);
    if (!user) {
      return done(new UnauthorizedException('Invalid Credentials'), false);
    }
    const { cod_user_usr, des_name_usr, des_email_usr }: User = user;
    return done(null, {
      cod_user_usr,
      des_name_usr,
      des_email_usr,
    });
  }
}
