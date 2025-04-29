import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class CreateScoreDto {
  @ApiProperty({ description: '用户的唯一标识符', example: 'user123' })
  @Prop({ ref: 'User' })
  user: User;

  @ApiProperty({ description: '用户的得分', example: 100 })
  score: number;
}
