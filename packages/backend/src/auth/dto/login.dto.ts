import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '用户名', example: 'john_doe' })
  username: string;

  @ApiProperty({ description: '用户密码', example: 'securePassword123' })
  password: string;
}