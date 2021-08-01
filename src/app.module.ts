import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import { DbModule } from '@config/db/db.module';
import { AuthModule } from './components/auth/auth.module';
import { CharacterModule } from './components/character/character.module';
import { ComicModule } from './components/comic/comic.module';

@Module({
  imports: [DbModule, UserModule, AuthModule, CharacterModule, ComicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
