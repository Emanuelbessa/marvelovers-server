import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { GeneralErrorsFilter } from '@shared/error-handling.filter';
import { UserJwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import { HttpExceptionFilter } from '@shared/http-exception.filter';
import User from '@shared/user.decorator';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { ComicService } from './comic.service';
import { Data, Params, Result } from './dto/comic.dto';
import { Comic } from './models/comic.model';
@UseFilters(GeneralErrorsFilter, HttpExceptionFilter)
@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @UseGuards(UserJwtAuthGuard)
  @Get()
  findAll(@Query() params: Params): Promise<Data> {
    return this.comicService.findAll(params);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('favorites')
  getAllFavorited(@User() user: UpdateUserDto): Promise<Comic[]> {
    return this.comicService.findAllFavorited(user.cod_user_usr);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':marvelid')
  findOneById(@Param('marvelid') marvelid: number): Promise<Result[]> {
    return this.comicService.findOneById(marvelid);
  }

  @UseGuards(UserJwtAuthGuard)
  @Post('favorite')
  async favoriteCharacter(@User() user: UpdateUserDto, @Body() data: Comic) {
    const character = await this.comicService.findComicByCodUserMarvelId(
      user.cod_user_usr,
      data.cod_marvelid_com,
    );
    if (character) {
      return this.comicService.deleteFavoritedComic(
        user.cod_user_usr,
        data.cod_marvelid_com,
      );
    } else {
      return this.comicService.favoriteComic(data, user);
    }
  }
}
