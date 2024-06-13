import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke.response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { IPokemon } from 'src/pokemon/interfaces/pokemon.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>, // pokemon model
    private readonly http: AxiosAdapter, // axios adapter
  ){}

  // optimal but can be improved
  // async executeSeed() {
  //   // Delete all pokemon data
  //   await this.pokemonModel.deleteMany();
    
  //   // Get new data
  //   const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=40');
    
  //   // Create promises
  //   const pokemonArrPromises = [];
  //   data.results.forEach( ({name}, i) => {
  //     pokemonArrPromises.push( // Insert promises
  //       this.pokemonModel.create( {name, no: i+1} )
  //     );
  //   });
  //   // Resolve promises
  //   await Promise.all(pokemonArrPromises);

  //   return 'Seed executed =)';
  // }


  //  improved vertion
  async executeSeed() {
    // Delete all pokemon data
    await this.pokemonModel.deleteMany();
    
    // Get new data
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=40');
    
    // Create array pokemon container
    const pokemons: IPokemon[] = [];
    data.results.forEach( ({name}, i) => {
      pokemons.push( {name, no: i+1} ); // Insert pokemon in array
    });

    // Insert many
    await this.pokemonModel.insertMany(pokemons);

    return 'Seed executed =)';
  }

}
