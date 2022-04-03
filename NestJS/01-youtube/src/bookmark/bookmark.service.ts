import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  createBookmark(
    userId: number,
    createBookmarkDto: CreateBookmarkDto,
  ) {
    return this.prisma.bookmark.create({
      data: {
        userId,
        ...createBookmarkDto,
      },
    });
  }

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarksById(
    userId: number,
    bookmarkId: number,
  ) {
    return this.prisma.bookmark.findFirst({
      where: {
        userId,
        id: bookmarkId,
      },
    });
  }

  async editBookmarksById(
    userId: number,
    bookmarkId: number,
    editBookmarkDto: EditBookmarkDto,
  ) {
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource denied',
      );
    }
    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: {
        ...editBookmarkDto,
      },
    });
  }

  async deleteBookmarksById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource denied',
      );
    }
    return this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
