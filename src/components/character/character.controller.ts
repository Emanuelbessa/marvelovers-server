/* eslint-disable @typescript-eslint/indent */
import { Body, Post } from '@nestjs/common';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserJwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import User from '@shared/user.decorator';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { CharacterService } from './character.service';
import { Data, Params } from './dto/character.dto';
import { Character } from './models/character.model';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(UserJwtAuthGuard)
  @Get()
  findAll(@Query() params: Params): Promise<Data> {
    return this.characterService.findAll(params);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('favorites')
  getAllFavorited(@User() user: UpdateUserDto): Promise<Character[]> {
    return this.characterService.findAllFavorited(user.cod_user_usr);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':marvelid')
  findOneById(@Param('marvelid') marvelid: number) {
    return this.characterService.findOneById(marvelid);
  }

  @UseGuards(UserJwtAuthGuard)
  @Post('favorite')
  async favoriteCharacter(
    @User() user: UpdateUserDto,
    @Body() data: Character,
  ) {
    const character =
      await this.characterService.findCharacterByCodUserMarvelId(
        user.cod_user_usr,
        data.cod_marvelid_cha,
      );
    if (character) {
      return this.characterService.deleteFavoritedCharacter(
        user.cod_user_usr,
        data.cod_marvelid_cha,
      );
    } else {
      return this.characterService.favoriteCharacter(data, user);
    }
  }
}
