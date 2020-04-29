import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './author/author.graphql.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    AuthorsModule,
    GraphQLModule.forRoot({
      debug: false,
      playground: true, // 开启调试界面
      autoSchemaFile: './schema.gql', // 放个该名字的空文件，底层会读取Nest形式的schema然后生成graphql原始的sehema里面
      installSubscriptionHandlers: true, // 使用订阅就要开启这个参数
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
