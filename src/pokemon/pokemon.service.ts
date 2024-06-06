import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IPokemon } from './interfaces/pokemon.interface';
import { CatchDatabaseErrors } from 'src/common/decorators/catch-database-errors.decorator';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}

  @CatchDatabaseErrors()
  async create({name, no}: CreatePokemonDto): Promise<IPokemon> {
    const pokemon: IPokemon = await this.pokemonModel.create({
      name: name.toLowerCase().trim(),
      no,
    })
    return pokemon;
  }

  @CatchDatabaseErrors()
  async findAll(): Promise<IPokemon[]> {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
  }

  @CatchDatabaseErrors()
  async findOne(term: string): Promise<IPokemon> {
    let pokemon: IPokemon;

    if ( !isNaN( +term ) ) {
      pokemon = await this.pokemonModel.findOne({
        no: term,
      });
    } 
    else if ( isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById(term);
    } 
    else {
      pokemon = await this.pokemonModel.findOne({
        name: new RegExp(term.trim().toLowerCase(), 'i')
      });
    }

    if (!pokemon) { throw new NotFoundException(`Pokemon ${term} not found`) }

    return pokemon;
  }

  @CatchDatabaseErrors()
  async update(
    term: string, 
    {no, name}: UpdatePokemonDto
  ): Promise<IPokemon> {
    let pokemon = await this.findOne(term);
    
    pokemon = {
      id: pokemon.id,
      name: name.toLowerCase().trim() || pokemon.name,
      no: no || pokemon.no
    };

    await this.pokemonModel.findByIdAndUpdate(
      pokemon.id,
      pokemon,
    );

    return pokemon;
  }

  @CatchDatabaseErrors()
  async remove(id: string): Promise<string> {
    const pokemon = await this.pokemonModel.findByIdAndDelete(id)
    if (!pokemon) { throw new NotFoundException(`Pokemon ${id} not found`) }
    return `Pokemon ${pokemon.name} deleted`;
  }
}
