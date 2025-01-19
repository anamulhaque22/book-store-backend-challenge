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
import { AuthorService } from './author.service';
import { AuthorResponseDto } from './dto/author-response.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() author: CreateAuthorDto): Promise<AuthorResponseDto> {
    return this.authorService.create(author);
  }

  @Get()
  async findAll(): Promise<AuthorResponseDto[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AuthorResponseDto> {
    return this.authorService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() author: UpdateAuthorDto,
  ): Promise<Pick<Author, 'id' | 'name' | 'bio'>> {
    return this.authorService.update(id, author);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.authorService.remove(id);
    return;
  }
}
