/* eslint-disable @typescript-eslint/indent */
import {
  Controller,
  Body,
  Patch,
  UseGuards,
  BadRequestException,
  Get,
  Param,
  Put,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserJwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import { UpdatePassDto, UpdateUserDto } from './dto/update-user.dto';
import User from '@shared/user.decorator';
import { GeneralErrorsFilter } from '@shared/error-handling.filter';
import { HttpExceptionFilter } from '@shared/http-exception.filter';

@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserJwtAuthGuard)
  @Put()
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

  @UseGuards(UserJwtAuthGuard)
  @Get(':userid')
  findOneById(@Param('userid') userid: string): Promise<UpdateUserDto> {
    return this.userService.findOneById(userid);
  }
}
