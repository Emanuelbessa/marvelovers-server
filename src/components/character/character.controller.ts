import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserJwtAuthGuard } from '@shared/guard/jwt-auth.guard';
import { CharacterService } from './character.service';
import { Result } from './dto/character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(UserJwtAuthGuard)
  @Get()
  findAll(
    @Query('nameStartsWith') nameStartsWith: string,
  ): Promise<Partial<Result[]>> {
    return this.characterService.findAll(nameStartsWith);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':marvelid')
  findOneById(@Param('marvelid') marvelid: number) {
    return this.characterService.findOneById(marvelid);
  }
}
