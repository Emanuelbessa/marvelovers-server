import { EnvService } from '@config/env/env.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { lastValueFrom } from 'rxjs';
import { Md5 } from 'ts-md5';
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
}
