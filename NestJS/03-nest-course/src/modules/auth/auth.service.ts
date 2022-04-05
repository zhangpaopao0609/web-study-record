import {
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  signup(createAuthDto: CreateAuthDto) {
    return this.userRepository.save(createAuthDto);
  }

  async signin(createAuthDto: CreateAuthDto) {
    const userInfo = await this.findOne(createAuthDto.name);
    if (userInfo.password === createAuthDto.password) {
      return userInfo;
    }
    throw new HttpException('n', 404);
  }

  async findOne(name: string) {
    const existingUser = await this.userRepository.findOne({
      where: { name },
    });
    console.log(existingUser);
    if (!existingUser) {
      throw new NotFoundException();
    }
    return existingUser;
  }
}
