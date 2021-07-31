import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '@config/env/env.module';
import { EnvService } from '@config/env/env.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    HttpModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'user-jwt' }),
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        secret: env.jwtSecret,
        signOptions: {
          expiresIn: env.jwtExp,
        },
      }),
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
