import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MOVIE')
    .setDescription('The movie app apis')
    .setVersion('1.0')
    .addTag('apis')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  const config = app.get(ConfigService)

  await app.listen(
    config.get<number>('appConfig.port'),
    config.get<string>('appConfig.host'),
    () => console.log(`Server running port on ${config.get<number>('appConfig.port')}`)
  );
}
bootstrap();
