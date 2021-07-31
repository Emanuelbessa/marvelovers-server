import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get dbName(): string {
    return this.configService.get<string>('app.dbName');
  }

  get dbHost(): string {
    return this.configService.get<string>('app.dbHost');
  }

  get dbPort(): number {
    return this.configService.get<number>('app.dbPort');
  }

  get dbUser(): string {
    return this.configService.get<string>('app.dbUser');
  }

  get dbPass(): string {
    return this.configService.get<string>('app.dbPass');
  }

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get otsPort(): number {
    return this.configService.get<number>('app.otsPort');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('app.jwtSecret');
  }

  get jwtExp(): string {
    return this.configService.get<string>('app.jwtExp');
  }

  get angularUrl(): string {
    return this.configService.get<string>('app.angularUrl');
  }

  get marvelUrl(): string {
    return this.configService.get<string>('app.marvelUrl');
  }

  get publicApiKey(): string {
    return this.configService.get<string>('app.publicApiKey');
  }

  get privateApiKey(): string {
    return this.configService.get<string>('app.privateApiKey');
  }
}
