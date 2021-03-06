import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '@shared/guard/local.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { GeneralErrorsFilter } from '@shared/error-handling.filter';
import { HttpExceptionFilter } from '@shared/http-exception.filter';
@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<Partial<User>> {
    return req.user;
  }

  @Post('register')
  async register(@Body() cred: CreateUserDto): Promise<void> {
    await this.authService.register(cred);
  }
}
