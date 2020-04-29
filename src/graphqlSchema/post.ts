import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(type => Int)
  id: number; // 作者id

  @Field()
  title: string; // 文章标题

  @Field(type => Int, { nullable: true })
  votes?: number; // 投票数
}
