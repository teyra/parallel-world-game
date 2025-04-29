import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
