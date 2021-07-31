import { Model, ModelOptions, QueryContext } from 'objection';
import * as bcrypt from 'bcryptjs';

export class User extends Model {
  static tableName = 'tb_marv_user';

  cod_user_usr: string;
  des_name_usr: string;
  des_email_usr: string;
  des_nickname_usr: string;
  des_password_usr: string;
  dat_created_usr: Date;

  static get idColumn(): string {
    return 'cod_user_usr';
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.des_password_usr);
  }

  async $beforeInsert(ctx: QueryContext): Promise<void> {
    await super.$beforeInsert(ctx);
    this.des_password_usr = await bcrypt.hash(this.des_password_usr, 12);
  }

  async $beforeUpdate(opt: ModelOptions, ctx: QueryContext): Promise<void> {
    await super.$beforeUpdate(opt, ctx);
    if (this.des_password_usr) {
      this.des_password_usr = await bcrypt.hash(this.des_password_usr, 12);
    }
  }
}
