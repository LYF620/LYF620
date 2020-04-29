// posts.graphql.module.ts
import { Module } from '@nestjs/common';
import { PostsService } from './post.service';

@Module({
  providers: [PostsService],
  exports: [PostsService], // 因为有别的模块需要使用，所以要导出该模块
})
export class PostsModule {}
