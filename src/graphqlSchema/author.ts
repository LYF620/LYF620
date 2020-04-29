import { Field, Int, ObjectType } from 'type-graphql';
import { Post } from './post';
//这里使用type-graphql，类似于原来nest.js中的DTO，不用在写GraphQL Schema Type DSL 和数据 Modal ，直接在这里一次完成
@ObjectType()
export class Author {
  @Field(type => Int)
  id: number; // 作者id

  @Field({ nullable: true })
  firstName?: string; // 姓

  @Field({ nullable: true })
  lastName?: string; // 名

  @Field(type => [Post])
  posts: Post[]; // 文章列表
}
