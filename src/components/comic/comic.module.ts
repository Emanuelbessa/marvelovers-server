import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ComicController } from './comic.controller';
import { ComicService } from './comic.service';

@Module({
  imports: [HttpModule],
  controllers: [ComicController],
  providers: [ComicService],
})
export class ComicModule {}
