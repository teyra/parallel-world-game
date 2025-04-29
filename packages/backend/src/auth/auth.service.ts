import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    console.log("🚀 ~ AuthService ~ validateUser ~ user:", user)
    if (user && password === user.password) {
      return user;
    }
    return null;
  }
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username }).select('+password');
    if (!user) {
      const newUser = await this.userModel.create({ username, password });
      const payload = { sub: newUser._id };
      const token = this.jwtService.sign(payload);
      return {
        token,
      };
    } else {
      let valid = compareSync(password, user.password);
      if (!valid) {
        throw new UnauthorizedException('密码不正确');
      }
      const payload = { sub: user._id };
      const token = this.jwtService.sign(payload);
      return {
        access_token:token,
      };
    }
  }
}
