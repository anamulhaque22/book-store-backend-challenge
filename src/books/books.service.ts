import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorService } from 'src/author/author.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private readonly authorService: AuthorService,
  ) {}

  async create(payload: CreateBookDto): Promise<Book> {
    const author = await this.authorService.findById(payload.authorId);

    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.booksRepository.save(
      this.booksRepository.create({ ...payload, author: author }),
    );
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: ['author'],
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, updateData: UpdateBookDto): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id: Number(id) },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return this.booksRepository.save({
      ...book,
      ...updateData,
    });
  }

  async remove(id: number): Promise<void> {
    const book = await this.booksRepository.findOne({
      where: { id: Number(id) },
    });
    this.booksRepository.remove(book);
  }
}
