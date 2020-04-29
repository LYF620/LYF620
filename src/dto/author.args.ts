import { Min, IsNotEmpty } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
//定义接口的入参，既然是入参，还要判断入参的类型等等是否符合规范，用了class-validator来判断
@ArgsType()
export class AuthorArgs {
  @Field(type => Int)
  @IsNotEmpty()
  @Min(0)
  // pageIndex: number = 0;
  pageIndex;
}
