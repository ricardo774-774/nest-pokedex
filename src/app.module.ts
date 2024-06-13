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
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/app.config';
import { JoiValidationSchema } from './common/config/joi.validation';

@Module({
  imports: [

    // Env Config
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema
    }),

    // Public folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    // MongoDB connection and db
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'learning-nestjs'
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
   providers: [  // Filters
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
