import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      
      // Transform dtos types
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  await app.listen(process.env.PORT);
  console.log(`App running on port ${process.env.PORT}`)
}
bootstrap();