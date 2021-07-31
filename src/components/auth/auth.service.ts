import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await user.comparePassword(pass))) {
      const { cod_user_usr, des_name_usr, des_email_usr } = user;
      return {
        cod_user_usr,
        des_name_usr,
        des_email_usr,
      };
    }
    return null;
  }

  async login(user: Partial<User>): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(cred: CreateUserDto): Promise<User> {
    return this.userService.create(cred);
  }
}
