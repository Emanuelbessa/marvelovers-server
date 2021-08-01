import { Model } from 'objection';

export class Character extends Model {
  static tableName = 'tb_marv_character';

  cod_user_usr: string;
  cod_marvelid_cha: number;
  des_name_cha: string;
  des_thumbnail_cha: string;
  des_description_cha: string;
  dat_created_cha: Date;
}
