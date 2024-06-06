import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from "@nestjs/mongoose";
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
  ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
  }),

  // MongoDB connection and db
  MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

  PokemonModule,

  CommonModule,
  ],
   providers: [
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
 })
 export class AppModule {}
