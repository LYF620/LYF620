//resolver层,这里和Nest的Controller层大同小异，写法基本也相同
//mutation 修改内容  Subscription 订阅
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
//https://www.apollographql.com/  在GraphQL模式添加GraphQL订阅
import { Author } from '../graphqlSchema/author';
import { AuthorsService } from './author.service';
import { PostsService } from '../post/post.service';
import { AuthorArgs } from '../dto/author.args';
import { Post } from '../graphqlSchema/post';
import { UpvotePostInput } from '../dto/post.args';

const pubSub = new PubSub();

@Resolver(of => Author)
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  // 第一个查询节点，authorList
  @Query(returns => [Author])
  // 作者列表需要分页，所以穿个pageIndex，已经定义过了
  authorList(@Args() authorArgs: AuthorArgs): Author[] {
    return this.authorsService.authorList(authorArgs);
  }

  // 修改文章的投票数，graphql中修改操作是叫Mutation
  @Mutation(returns => Post)
  // 修改的节点叫做upvotePost
  upvotePost(@Args('upvotePostData') upvotePostInput: UpvotePostInput) {
    const post = this.postsService.upvoteById(upvotePostInput);
    // graphql中有个操作叫做订阅，即前端如果订阅了某个事件(这里是postupdated)，则当有此事件发布时
    // 前端会收到通知，实际上是通过websocket实现的。 这里即当投票数修改时，会发送此事件。
    ////订阅只是查询和变更的另一种 GraphQL 操作类型
    pubSub.publish('postupdated', { postupdated: post });
    return post;
  }

  // 第二个查询节点。即根据id查询作者
  @Query(returns => Author)
  // 如果参数不多，不必定义类似dto的schema，直接写也可
  author(@Args('id') id: number): Author {
    return this.authorsService.findOne(id);
  }

  // 这里就是posts这个filed单独查询数据
  @ResolveProperty()
  // 根据父元素的id去查询
  posts(@Parent() author) {
    const { id } = author;
    return this.postsService.findAll(id);
  }

  // 前端的订阅接口
  @Subscription(returns => Post)
  postupdated() {
    return pubSub.asyncIterator('postupdated');
  }
}
