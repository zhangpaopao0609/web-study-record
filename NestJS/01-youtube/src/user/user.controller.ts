import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';

import { JwtGuard } from './../auth/guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser('id') userId: number) {
    return userId;
  }

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() editUserDto: EditUserDto,
  ) {
    return this.userService.editUser(
      userId,
      editUserDto,
    );
  }
}
