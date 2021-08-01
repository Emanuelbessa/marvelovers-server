import { Model } from 'objection';

export class Comic extends Model {
  static tableName = 'tb_marv_comic';

  cod_user_usr: string;
  cod_marvelid_com: number;
  des_name_com: string;
  des_thumbnail_com: string;
  des_description_com: string;
  dat_created_com: Date;
}
