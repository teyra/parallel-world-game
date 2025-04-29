import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'john_doe' })
  username: string;

  @ApiProperty({ description: '用户邮箱', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: '用户密码', example: 'securePassword123' })
  password: string;
}
