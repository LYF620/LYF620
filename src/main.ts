import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
//我们必须确保该包在我们使用/导入 type-graphql或者我们的resolvers之前引用reflect-metadata

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
