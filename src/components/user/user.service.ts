import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePassDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('User') private modelClass: ModelClass<User>) {}

  async create(data: CreateUserDto) {
    return this.modelClass
      .query()
      .insert({
        des_name_usr: data.des_name_usr,
        des_nickname_usr: data.des_nickname_usr,
        des_email_usr: data.des_email_usr,
        des_password_usr: data.des_password_usr,
        dat_created_usr: new Date(),
      })
      .first();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.modelClass
      .query()
      .patch({
        des_name_usr: updateUserDto.des_name_usr,
        des_nickname_usr: updateUserDto.des_nickname_usr,
        des_email_usr: updateUserDto.des_email_usr,
      })
      .where({ cod_user_usr: id })
      .first();
  }

  async updatePassword(id: string, updateUserDto: UpdatePassDto) {
    return this.modelClass
      .query()
      .patch({ des_password_usr: updateUserDto.des_password_usr })
      .where({ cod_user_usr: id })
      .first();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.modelClass
      .query()
      .where('des_email_usr', email)
      .limit(1)
      .first();
  }

  async findOneById(cod_user_usr: string) {
    return this.modelClass.query().where({ cod_user_usr }).limit(1).first();
  }
}
