import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from './../auth/guard';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}
  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      createBookmarkDto,
    );
  }

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  getBookmarksById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarksById(
      userId,
      bookmarkId,
    );
  }

  @Patch(':id')
  editBookmarksById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() editBookmarkDto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarksById(
      userId,
      bookmarkId,
      editBookmarkDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarksById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarksById(
      userId,
      bookmarkId,
    );
  }
}
