import { EnvService } from '@config/env/env.service';
import { HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { lastValueFrom } from 'rxjs';
import { Md5 } from 'ts-md5';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { ComicDto, Params } from './dto/comic.dto';
import { Comic } from './models/comic.model';

@Injectable()
export class ComicService {
  constructor(
    @Inject('Comic') private modelClass: ModelClass<Comic>,
    private http: HttpService,
    private config: EnvService,
  ) {}

  async findAll(params: Params) {
    const observable = this.http.get<ComicDto>(
      `${this.config.marvelUrl}/comics`,
      {
        params: {
          ...params,
          ...this.hashApiKey(),
        },
      },
    );

    try {
      const response = await lastValueFrom(observable);
      return response.data.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.status,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneById(marvelid: number) {
    const observable = this.http.get<ComicDto>(
      `${this.config.marvelUrl}/comics/${marvelid}`,
      {
        params: {
          ...this.hashApiKey(),
        },
      },
    );

    try {
      const response = await lastValueFrom(observable);
      return response.data.data.results;
    } catch (error) {
      throw new HttpException(error.response.data.status, 401);
    }
  }

  private hashApiKey() {
    const ts = Date.now();
    const hash = Md5.hashStr(
      `${ts}${this.config.privateApiKey}${this.config.publicApiKey}`,
    );
    return { ts: ts, apikey: this.config.publicApiKey, hash: hash };
  }

  async findComicByCodUserMarvelId(cod_user_usr: string, marvelid: number) {
    return this.modelClass
      .query()
      .where({ cod_user_usr: cod_user_usr, cod_marvelid_com: marvelid })
      .limit(1)
      .first();
  }

  async favoriteComic(data: Comic, user: UpdateUserDto) {
    return this.modelClass
      .query()
      .insert({
        cod_user_usr: user.cod_user_usr,
        cod_marvelid_com: data.cod_marvelid_com,
        des_name_com: data.des_name_com,
        des_thumbnail_com: data.des_thumbnail_com,
        des_description_com: data.des_description_com,
        dat_created_com: new Date(),
      })
      .first();
  }

  async deleteFavoritedComic(cod_user_usr: string, marvelid: number) {
    return this.modelClass
      .query()
      .delete()
      .where({ cod_user_usr: cod_user_usr, cod_marvelid_com: marvelid })
      .first();
  }

  async findAllFavorited(cod_user_usr: string) {
    return this.modelClass
      .query()
      .select()
      .where({ cod_user_usr: cod_user_usr });
  }
}
