import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(3000);
}
bootstrap();
