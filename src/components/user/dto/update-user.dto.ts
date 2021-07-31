export class UpdateUserDto {
  cod_user_usr: string;
  des_name_usr: string;
  des_nickname_usr: string;
  des_email_usr: string;
  des_password_usr: string;
}

export interface UpdatePassDto extends UpdateUserDto {
  des_old_pass_usr: string;
}
