import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserJwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import User from '@shared/user.decorator';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { ComicService } from './comic.service';
import { Params, Result } from './dto/comic.dto';
import { Comic } from './models/comic.model';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @UseGuards(UserJwtAuthGuard)
  @Get()
  findAll(@Query() params: Params): Promise<Partial<Result[]>> {
    return this.comicService.findAll(params);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('favorites')
  getAllFavorited(@User() user: UpdateUserDto): Promise<Comic[]> {
    return this.comicService.findAllFavorited(user.cod_user_usr);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':marvelid')
  findOneById(@Param('marvelid') marvelid: number) {
    return this.comicService.findOneById(marvelid);
  }

  @UseGuards(UserJwtAuthGuard)
  @Post('favorite')
  async favoriteCharacter(@Body() data: Comic) {
    const character = await this.comicService.findComicByCodUserMarvelId(
      data.cod_user_usr,
      data.cod_marvelid_com,
    );
    if (character) {
      return this.comicService.deleteFavoritedComic(
        data.cod_user_usr,
        data.cod_marvelid_com,
      );
    } else {
      return this.comicService.favoriteComic(data);
    }
  }
}
