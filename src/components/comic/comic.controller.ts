import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserJwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import { ComicService } from './comic.service';
import { Params, Result } from './dto/comic.dto';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @UseGuards(UserJwtAuthGuard)
  @Get()
  findAll(@Query() params: Params): Promise<Partial<Result[]>> {
    return this.comicService.findAll(params);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':marvelid')
  findOneById(@Param('marvelid') marvelid: number) {
    return this.comicService.findOneById(marvelid);
  }
}
