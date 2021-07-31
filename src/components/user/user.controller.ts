import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserJwtAuthGuard } from '@shared/guard/jwt-auth.guard';

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
}
