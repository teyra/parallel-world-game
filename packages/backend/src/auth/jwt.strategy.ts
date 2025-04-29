import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // 替换为你的密钥
    });
  }

  async validate(payload: any) {
    const user = await this.userModel.findById(payload.sub);
    return user;
  }
}
