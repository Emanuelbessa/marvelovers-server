import { EnvService } from '@config/env/env.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CharacterDto, Params } from './dto/character.dto';
import { Character } from './models/character.model';
import { Md5 } from 'ts-md5';
import { lastValueFrom } from 'rxjs';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class CharacterService {
  constructor(
    @Inject('Character') private modelClass: ModelClass<Character>,
    private http: HttpService,
    private config: EnvService,
  ) {}

  async findAll(params: Params) {
    const observable = this.http.get<CharacterDto>(
      `${this.config.marvelUrl}/characters`,
      {
        params: {
          ...params,
          ...this.hashApiKey(),
        },
      },
    );

    try {
      const response = await lastValueFrom(observable);
      return response.data.data.results;
    } catch (error) {
      throw new HttpException(error.response.data.message, 401);
    }
  }

  async findOneById(marvelid: number) {
    const observable = this.http.get<CharacterDto>(
      `${this.config.marvelUrl}/characters/${marvelid}`,
      {
        params: {
          ...this.hashApiKey(),
        },
      },
    );

    try {
      const response = await lastValueFrom(observable);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data.message, 401);
    }
  }

  private hashApiKey() {
    const ts = Date.now();
    const hash = Md5.hashStr(
      `${ts}${this.config.privateApiKey}${this.config.publicApiKey}`,
    );
    return { ts: ts, apikey: this.config.publicApiKey, hash: hash };
  }

  async findCharacterByCodUserMarvelId(cod_user_usr: string, marvelid: number) {
    return this.modelClass
      .query()
      .where({ cod_user_usr: cod_user_usr, cod_marvelid_cha: marvelid })
      .limit(1)
      .first();
  }

  async favoriteCharacter(data: Character, user: UpdateUserDto) {
    return this.modelClass
      .query()
      .insert({
        cod_user_usr: user.cod_user_usr,
        cod_marvelid_cha: data.cod_marvelid_cha,
        des_name_cha: data.des_name_cha,
        des_thumbnail_cha: data.des_thumbnail_cha,
        des_description_cha: data.des_description_cha,
        dat_created_cha: new Date(),
      })
      .first();
  }

  async deleteFavoritedCharacter(cod_user_usr: string, marvelid: number) {
    return this.modelClass
      .query()
      .delete()
      .where({ cod_user_usr: cod_user_usr, cod_marvelid_cha: marvelid })
      .first();
  }

  async findAllFavorited(cod_user_usr: string) {
    return this.modelClass
      .query()
      .select()
      .where({ cod_user_usr: cod_user_usr });
  }
}
