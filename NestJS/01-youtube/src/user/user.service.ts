import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto/edit-user.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  editUser(
    userId: number,
    editUserDto: EditUserDto,
  ) {
    const user = this.prisma.user.update({
      where: { id: userId },
      data: editUserDto,
    });
    return user;
  }
}
