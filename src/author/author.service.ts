//service，实际的业务操作
import { Injectable } from '@nestjs/common';
import { Author } from '../graphqlSchema/author';
import * as authors from './author';
import * as _ from 'lodash';
import { AuthorArgs } from '../dto/author.args';

@Injectable()
export class AuthorsService {
  // 查询作者列表,简单的从已经预先创建好的数据进行分块，每块10条数据
  authorList(authorArgs: AuthorArgs): Author[] {
    const chunk = _.chunk(authors.default, 10);
    return chunk[authorArgs.pageIndex];
  }

  // 根据id查询作者
  findOne(id: number): Author {
    return _.find(authors.default, item => item.id === id);
  }
}
