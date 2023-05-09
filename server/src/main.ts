import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ["transform"] },
    }),
  );

  app.enableCors({
    origin: "https://projeto-fullstack-kohl.vercel.app"
  })

  await app.listen(3001);
}
bootstrap();
