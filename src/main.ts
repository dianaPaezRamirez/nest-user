import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist:true, 
      forbidNonWhitelisted: true, // Devuelve error si hay propiedades desconocidas
      transform: true,
      exceptionFactory: (errors) => {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: errors.map((err) => ({
            field: err.property,
            constraints: Object.values(err.constraints || {}),
          })),
        });
      },
    }))

 

  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory); 


  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
