/* eslint-disable @typescript-eslint/indent */
import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserJwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import { UpdatePassDto, UpdateUserDto } from './dto/update-user.dto';
import User from '@shared/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(UserJwtAuthGuard)
  @Patch()
  update(@User() user: UpdateUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.cod_user_usr, updateUserDto);
  }

  @UseGuards(UserJwtAuthGuard)
  @Patch('/updatepass')
  async updatePassProfile(
    @User() user: UpdateUserDto,
    @Body() data: UpdatePassDto,
  ): Promise<void> {
    const dbUser = await this.userService.findOneByEmail(user.des_email_usr);
    if (!(await dbUser.comparePassword(data.des_old_pass_usr))) {
      throw new BadRequestException('Unable to update password!');
    }
    await this.userService.updatePassword(user.cod_user_usr, data);
  }
}
