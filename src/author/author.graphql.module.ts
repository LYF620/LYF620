// author.graphql.module.ts
import { Module } from '@nestjs/common';
import { PostsModule } from '../post/posts.graphql.module';
import { AuthorsService } from './author.service';
import { AuthorResolver } from './author.resolvers';

@Module({
  imports: [PostsModule], // 因为AuthorResolver中用到了postService，所以要导入该模块
  providers: [AuthorsService, AuthorResolver],
})
export class AuthorsModule {}
