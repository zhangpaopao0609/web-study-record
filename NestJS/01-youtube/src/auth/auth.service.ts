import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthServive {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(authDto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(
      authDto.password,
    );
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: authDto.email,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Crendatial taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(authDto: AuthDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: authDto.email,
        },
      });
    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }

    const pwMathes = await argon.verify(
      user.hash,
      authDto.password,
    );
    if (!pwMathes) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const data = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(data, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15m',
    });

    return {
      access_token: token,
    };
  }
}
