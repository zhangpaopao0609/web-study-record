import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthServive } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authServive: AuthServive) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authServive.signup(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    return this.authServive.signin(authDto);
  }
}
