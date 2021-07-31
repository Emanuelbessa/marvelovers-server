import { Module, Global } from '@nestjs/common';
import Knex from 'knex';
import { Model } from 'objection';

import { EnvService } from '../env/env.service';
import { EnvModule } from '../env/env.module';
import { User } from 'src/components/user/entities/user.entity';

const models = [User];

const modelProviders = models.map((model) => ({
  provide: model.name,
  useValue: model,
}));

@Global()
@Module({
  imports: [EnvModule],
  providers: [
    ...modelProviders,
    {
      provide: 'KnexConnection',
      inject: [EnvService],
      useFactory: async (config: EnvService) => {
        const knex = Knex({
          client: 'mysql2',
          connection: {
            host: config.dbHost,
            database: config.dbName,
            port: config.dbPort,
            user: config.dbUser,
            password: config.dbPass,
            connectTimeout: 60000,
          },
          debug: config.env !== 'prod',
          pool: { min: 2, max: 10 },
        });

        Model.knex(knex);
        return knex;
      },
    },
  ],
  exports: [...modelProviders],
})
export class DbModule {}
