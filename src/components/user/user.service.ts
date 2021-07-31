import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('User') private modelClass: ModelClass<User>) {}

  async create(data: CreateUserDto) {
    return this.modelClass
      .query()
      .insert({
        des_name_usr: data.des_name_usr,
        des_email_usr: data.des_email_usr,
        des_password_usr: data.des_password_usr,
        dat_created_usr: new Date(),
      })
      .first();
  }
}