import { Injectable } from '@nestjs/common';
import { Post } from '../graphqlSchema/post';
import * as posts from './post';
import * as _ from 'lodash';
import { UpvotePostInput } from '../dto/post.args';

@Injectable()
export class PostsService {
  // 根据作者id查询所有文章
  findAll(id): Post[] {
    return _.filter(posts.default, item => item.id === id);
  }

  // 根据id修改该文章的投票数
  upvoteById(upvotePostInput: UpvotePostInput): Post {
    const post = _.find(posts.default, item => item.id === upvotePostInput.id);
    post.votes = upvotePostInput.votes;
    return post;
  }
}
