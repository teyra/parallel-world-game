import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // 替换为你的密钥
      signOptions: { expiresIn: '1h' }, // Token 有效期
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,UserService],
})
export class AuthModule {}
