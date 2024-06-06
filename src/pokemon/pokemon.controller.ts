import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { IPokemon } from './interfaces/pokemon.interface';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService
  ) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto): Promise<IPokemon> {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(): Promise<IPokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string ): Promise<IPokemon> {
    return this.pokemonService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updatePokemonDto: UpdatePokemonDto
  ): Promise<IPokemon> {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(':id', )
  remove(@Param('id', ParseMongoIdPipe ) id: string): Promise<string> {
    return this.pokemonService.remove(id);
  }
}
