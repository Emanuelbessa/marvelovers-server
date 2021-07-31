import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [HttpModule, User],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
