import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Post()
  async create(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, book);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.bookService.remove(id);
  }
}
