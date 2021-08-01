import { EnvService } from '@config/env/env.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CharacterDto } from './dto/character.dto';
import { Character } from './models/character.model';
import { Md5 } from 'ts-md5';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CharacterService {
  constructor(
    @Inject('Character') private modelClass: ModelClass<Character>,
    private http: HttpService,
    private config: EnvService,
  ) {}

  async findAll(nameStartsWith: string) {
    const observable = this.http.get<CharacterDto>(
      `${this.config.marvelUrl}/characters`,
      {
        params: {
          nameStartsWith: nameStartsWith,
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
}
